import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { 
  checkRateLimit, 
  recordFailedAttempt, 
  resetFailedAttempts, 
  verifyAdminCredentials, 
  createAdminSession, 
  getSession, 
  destroySession, 
  requireAdminAuth 
} from './server/auth';
import { 
  getSeoMatrix, 
  updateSeoKeyword, 
  addSeoKeywords,
  generateCsvExport 
} from './server/seoData';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust first proxy hop (Cloud Run, reverse proxies, load balancers)
  app.set('trust proxy', 1);

  // Basic middlewares
  app.use(express.json());
  app.use(cookieParser());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'nova-cb-platform' });
  });

  // ==========================================
  // AUTHENTICATION ROUTES (ADMIN ONLY)
  // ==========================================

  // Login endpoint with rate limiting & secure HttpOnly cookie
  app.post('/api/admin/login', (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const rateCheck = checkRateLimit(clientIp);

    if (!rateCheck.allowed) {
      res.status(429).json({
        success: false,
        error: `Trop de tentatives de connexion infructueuses. Veuillez patienter ${rateCheck.retryAfterSeconds || 60} secondes avant de réessayer.`,
      });
      return;
    }

    const { email, password } = req.body;

    if (!email || !password) {
      recordFailedAttempt(clientIp);
      res.status(400).json({
        success: false,
        error: 'Identifiants incorrects.',
      });
      return;
    }

    const isValid = verifyAdminCredentials(email, password);

    if (!isValid) {
      recordFailedAttempt(clientIp);
      res.status(401).json({
        success: false,
        error: 'Identifiants incorrects.',
      });
      return;
    }

    // Success: reset attempts & establish session
    resetFailedAttempts(clientIp);
    const sessionToken = createAdminSession(email.trim().toLowerCase());

    // Set secure HttpOnly cookie
    res.cookie('nova_admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
      path: '/',
    });

    res.json({
      success: true,
      message: 'Authentification réussie.',
      user: {
        email: email.trim().toLowerCase(),
        role: 'admin',
      },
    });
  });

  // Check current session status
  app.get('/api/admin/me', (req, res) => {
    const token = req.cookies?.nova_admin_session || 
      (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined);

    const session = getSession(token);

    if (!session) {
      res.status(401).json({
        authenticated: false,
        error: 'Non authentifié.',
      });
      return;
    }

    res.json({
      authenticated: true,
      user: {
        email: session.email,
        role: session.role,
      },
    });
  });

  // Logout endpoint
  app.post('/api/admin/logout', (req, res) => {
    const token = req.cookies?.nova_admin_session || 
      (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined);

    destroySession(token);
    res.clearCookie('nova_admin_session', { path: '/' });

    res.json({
      success: true,
      message: 'Déconnexion effectuée.',
    });
  });

  // ==========================================
  // PROTECTED SEO ROUTES (CONFIDENTIAL DATA)
  // ==========================================

  // Get full SEO matrix & metrics (Strictly protected by requireAdminAuth)
  app.get('/api/admin/seo/matrix', requireAdminAuth, (req, res) => {
    const data = getSeoMatrix();
    res.json({
      success: true,
      matrix: data.matrix,
      metrics: data.metrics,
    });
  });

  // Update a keyword status/priority (Protected)
  app.put('/api/admin/seo/matrix/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updatedItem = updateSeoKeyword(id, updates);

    if (!updatedItem) {
      res.status(404).json({
        success: false,
        error: 'Mot-clé introuvable.',
      });
      return;
    }

    res.json({
      success: true,
      item: updatedItem,
    });
  });

  // Add new validated keywords to the SEO matrix (Protected)
  app.post('/api/admin/seo/matrix', requireAdminAuth, (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        error: 'Liste de mots-clés invalide.',
      });
      return;
    }

    const createdItems = addSeoKeywords(items);
    res.json({
      success: true,
      created: createdItems,
      totalAdded: createdItems.length,
    });
  });

  // Secure export of SEO matrix (CSV or JSON)
  app.get('/api/admin/seo/export', requireAdminAuth, (req, res) => {
    const format = req.query.format === 'json' ? 'json' : 'csv';

    if (format === 'json') {
      const data = getSeoMatrix();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="matrice-seo-nova-cb-confidentielle.json"');
      res.send(JSON.stringify(data, null, 2));
    } else {
      const csv = generateCsvExport();
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="matrice-seo-nova-cb-confidentielle.csv"');
      res.send(csv);
    }
  });

  // Explicitly block any unauthenticated public access to /api/seo*
  app.all('/api/seo*', (req, res) => {
    res.status(403).json({
      success: false,
      error: 'Accès interdit. Cette API est strictement privée.',
    });
  });

  // ==========================================
  // VITE FRONTEND & SPA HANDLER
  // ==========================================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NOVA CB Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
