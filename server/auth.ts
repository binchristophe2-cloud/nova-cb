import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export interface AdminUserSession {
  email: string;
  role: 'admin';
  createdAt: number;
  expiresAt: number;
}

// In-memory session store (keyed by session token)
const activeSessions = new Map<string, AdminUserSession>();

// In-memory rate limiting store for login attempts (keyed by client IP)
interface RateLimitRecord {
  attempts: number;
  firstAttemptTime: number;
  blockedUntil?: number;
}
const loginRateLimits = new Map<string, RateLimitRecord>();

const MAX_LOGIN_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes block
const SESSION_LIFETIME_MS = 4 * 60 * 60 * 1000; // 4 hours

/**
 * Check if the client IP is currently rate limited
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginRateLimits.get(ip);

  if (!record) {
    return { allowed: true };
  }

  // If blocked
  if (record.blockedUntil && record.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  // If window expired, reset record
  if (now - record.firstAttemptTime > RATE_LIMIT_WINDOW_MS) {
    loginRateLimits.delete(ip);
    return { allowed: true };
  }

  // If reached limit
  if (record.attempts >= MAX_LOGIN_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    const retryAfterSeconds = Math.ceil(BLOCK_DURATION_MS / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  return { allowed: true };
}

/**
 * Record a failed login attempt
 */
export function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const record = loginRateLimits.get(ip);

  if (!record || now - record.firstAttemptTime > RATE_LIMIT_WINDOW_MS) {
    loginRateLimits.set(ip, {
      attempts: 1,
      firstAttemptTime: now,
    });
  } else {
    record.attempts += 1;
    if (record.attempts >= MAX_LOGIN_ATTEMPTS) {
      record.blockedUntil = now + BLOCK_DURATION_MS;
    }
  }
}

/**
 * Reset failed attempts upon successful login
 */
export function resetFailedAttempts(ip: string) {
  loginRateLimits.delete(ip);
}

/**
 * Verify credentials safely using environment variables and constant-time comparison
 */
export function verifyAdminCredentials(inputEmail: string, inputPassword: string): boolean {
  const cleanInputEmail = (inputEmail || '').trim().toLowerCase();
  const cleanInputPassword = (inputPassword || '').trim();

  // If empty, return false immediately
  if (!cleanInputEmail || !cleanInputPassword) {
    return false;
  }

  const configuredAdminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const configuredAdminPassword = (process.env.ADMIN_PASSWORD || '').trim();

  // Strict enforcement: both environment variables must be defined
  if (!configuredAdminEmail || !configuredAdminPassword) {
    console.warn('[SECURITY] ADMIN_EMAIL ou ADMIN_PASSWORD non configuré dans l’environnement. Accès administrateur désactivé.');
    return false;
  }

  // Salt for password hashing derived from session secret or server-generated salt
  const salt = process.env.SESSION_SECRET || 'nova-cb-secure-salt-key';
  
  const inputHash = crypto.createHmac('sha256', salt).update(cleanInputPassword).digest();
  const expectedHash = crypto.createHmac('sha256', salt).update(configuredAdminPassword).digest();

  const isEmailValid = cleanInputEmail === configuredAdminEmail;
  const isPasswordValid = crypto.timingSafeEqual(inputHash, expectedHash);

  return isEmailValid && isPasswordValid;
}

/**
 * Create a new admin session token and store it
 */
export function createAdminSession(email: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();

  activeSessions.set(token, {
    email,
    role: 'admin',
    createdAt: now,
    expiresAt: now + SESSION_LIFETIME_MS,
  });

  return token;
}

/**
 * Validate a session token
 */
export function getSession(token?: string): AdminUserSession | null {
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }

  return session;
}

/**
 * Invalidate a session token
 */
export function destroySession(token?: string) {
  if (token) {
    activeSessions.delete(token);
  }
}

/**
 * Middleware: Enforce admin authentication
 */
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  // Extract token from cookie 'nova_admin_session' or 'Authorization: Bearer <token>'
  const token = req.cookies?.nova_admin_session || 
    (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined);

  const session = getSession(token);

  if (!session) {
    res.status(401).json({
      success: false,
      error: 'Accès non autorisé. Session expirée ou invalide. Veuillez vous authentifier.',
    });
    return;
  }

  // Attach session to request object
  (req as any).adminUser = session;
  next();
}
