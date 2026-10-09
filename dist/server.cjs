var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");

// server/auth.ts
var import_crypto = __toESM(require("crypto"), 1);
var activeSessions = /* @__PURE__ */ new Map();
var loginRateLimits = /* @__PURE__ */ new Map();
var MAX_LOGIN_ATTEMPTS = 5;
var RATE_LIMIT_WINDOW_MS = 15 * 60 * 1e3;
var BLOCK_DURATION_MS = 15 * 60 * 1e3;
var SESSION_LIFETIME_MS = 4 * 60 * 60 * 1e3;
function checkRateLimit(ip) {
  const now = Date.now();
  const record = loginRateLimits.get(ip);
  if (!record) {
    return { allowed: true };
  }
  if (record.blockedUntil && record.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1e3);
    return { allowed: false, retryAfterSeconds };
  }
  if (now - record.firstAttemptTime > RATE_LIMIT_WINDOW_MS) {
    loginRateLimits.delete(ip);
    return { allowed: true };
  }
  if (record.attempts >= MAX_LOGIN_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    const retryAfterSeconds = Math.ceil(BLOCK_DURATION_MS / 1e3);
    return { allowed: false, retryAfterSeconds };
  }
  return { allowed: true };
}
function recordFailedAttempt(ip) {
  const now = Date.now();
  const record = loginRateLimits.get(ip);
  if (!record || now - record.firstAttemptTime > RATE_LIMIT_WINDOW_MS) {
    loginRateLimits.set(ip, {
      attempts: 1,
      firstAttemptTime: now
    });
  } else {
    record.attempts += 1;
    if (record.attempts >= MAX_LOGIN_ATTEMPTS) {
      record.blockedUntil = now + BLOCK_DURATION_MS;
    }
  }
}
function resetFailedAttempts(ip) {
  loginRateLimits.delete(ip);
}
function verifyAdminCredentials(inputEmail, inputPassword) {
  const cleanInputEmail = (inputEmail || "").trim().toLowerCase();
  const cleanInputPassword = (inputPassword || "").trim();
  if (!cleanInputEmail || !cleanInputPassword) {
    return false;
  }
  const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const configuredAdminPassword = (process.env.ADMIN_PASSWORD || "").trim();
  if (!configuredAdminEmail || !configuredAdminPassword) {
    console.warn("[SECURITY] ADMIN_EMAIL ou ADMIN_PASSWORD non configur\xE9 dans l\u2019environnement. Acc\xE8s administrateur d\xE9sactiv\xE9.");
    return false;
  }
  const salt = process.env.SESSION_SECRET || "nova-cb-secure-salt-key";
  const inputHash = import_crypto.default.createHmac("sha256", salt).update(cleanInputPassword).digest();
  const expectedHash = import_crypto.default.createHmac("sha256", salt).update(configuredAdminPassword).digest();
  const isEmailValid = cleanInputEmail === configuredAdminEmail;
  const isPasswordValid = import_crypto.default.timingSafeEqual(inputHash, expectedHash);
  return isEmailValid && isPasswordValid;
}
function createAdminSession(email) {
  const token = import_crypto.default.randomBytes(32).toString("hex");
  const now = Date.now();
  activeSessions.set(token, {
    email,
    role: "admin",
    createdAt: now,
    expiresAt: now + SESSION_LIFETIME_MS
  });
  return token;
}
function getSession(token) {
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }
  return session;
}
function destroySession(token) {
  if (token) {
    activeSessions.delete(token);
  }
}
function requireAdminAuth(req, res, next) {
  const token = req.cookies?.nova_admin_session || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : void 0);
  const session = getSession(token);
  if (!session) {
    res.status(401).json({
      success: false,
      error: "Acc\xE8s non autoris\xE9. Session expir\xE9e ou invalide. Veuillez vous authentifier."
    });
    return;
  }
  req.adminUser = session;
  next();
}

// server/seoData.ts
var SEO_KEYWORDS_MATRIX = [
  // --- SILO : NETTOYAGE TERRASSE (GÉNÉRAL) ---
  {
    id: "kw-1",
    keyword: "nettoyage terrasse",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Nettoyage Terrasse Professionnel",
    slug: "/nettoyage-terrasse",
    title: "Nettoyage Terrasse Professionnel | NOVA CB",
    h1: "Nettoyage de terrasse haute performance \xE0 M\xE9rignac et Bordeaux",
    cta: "Demander un devis pour ma terrasse",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Gironde"
  },
  {
    id: "kw-2",
    keyword: "nettoyage terrasse bordeaux",
    intent: "locale",
    priority: "P1 - Forte",
    targetPage: "Bordeaux (Local)",
    slug: "/bordeaux",
    title: "Nettoyage Terrasse Bordeaux | Artisan NOVA CB",
    h1: "Nettoyage et entretien de terrasse \xE0 Bordeaux et M\xE9tropole",
    cta: "Obtenir mon estimation Bordeaux",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Bordeaux"
  },
  {
    id: "kw-3",
    keyword: "nettoyage terrasse merignac",
    intent: "locale",
    priority: "P1 - Forte",
    targetPage: "M\xE9rignac (Local)",
    slug: "/merignac",
    title: "Nettoyage Terrasse M\xE9rignac | NOVA CB 33700",
    h1: "Nettoyage de terrasse \xE0 M\xE9rignac (33700) par artisan sp\xE9cialis\xE9",
    cta: "Demander un devis gratuit M\xE9rignac",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "M\xE9rignac"
  },
  {
    id: "kw-4",
    keyword: "prix nettoyage terrasse m2",
    intent: "transactionnelle",
    priority: "P1 - Forte",
    targetPage: "Nettoyage Terrasse Professionnel",
    slug: "/nettoyage-terrasse",
    title: "Prix Nettoyage Terrasse au m\xB2 | Devis NOVA CB",
    h1: "Tarif et prix au m\xB2 pour le nettoyage de terrasse en Gironde",
    cta: "Calculer mon tarif au m\xB2",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Gironde"
  },
  {
    id: "kw-5",
    keyword: "devis nettoyage terrasse",
    intent: "transactionnelle",
    priority: "P1 - Forte",
    targetPage: "Contact & Devis",
    slug: "/contact",
    title: "Devis Nettoyage Terrasse Gratuit en 48h | NOVA CB",
    h1: "Demandez votre devis gratuit pour le nettoyage de vos ext\xE9rieurs",
    cta: "Demander mon devis gratuit sous 48h",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Gironde"
  },
  {
    id: "kw-6",
    keyword: "entreprise nettoyage terrasse gironde",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Page d\u2019accueil",
    slug: "/",
    title: "NOVA CB | Entreprise Nettoyage Terrasse & Ext\xE9rieur Gironde",
    h1: "Nettoyage et entretien des ext\xE9rieurs \xE0 M\xE9rignac et Bordeaux",
    cta: "Faire estimer mon chantier",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Gironde"
  },
  {
    id: "kw-7",
    keyword: "nettoyage haute pression terrasse cloche rotative",
    intent: "informationnelle",
    priority: "P2 - Moyenne",
    targetPage: "Nettoyage Terrasse Professionnel",
    slug: "/nettoyage-terrasse",
    title: "Nettoyage Terrasse Cloche Rotative 200 Bars Sans Projection",
    h1: "Nettoyage haute pression doux \xE0 la cloche rotative industrielle",
    cta: "D\xE9couvrir la m\xE9thode cloche rotative",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "M\xE9rignac"
  },
  // --- SILO : NETTOYAGE TERRASSE BOIS & DÉGRISEMENT ---
  {
    id: "kw-8",
    keyword: "nettoyage terrasse bois",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Nettoyage Terrasse Bois",
    slug: "/nettoyage-terrasse-bois",
    title: "Nettoyage Terrasse Bois & R\xE9novation | NOVA CB",
    h1: "Nettoyage et r\xE9novation de terrasse en bois \xE0 M\xE9rignac et Bordeaux",
    cta: "Demander un devis pour ma terrasse bois",
    status: "Optimis\xE9",
    serviceType: "Bois",
    geo: "Gironde"
  },
  {
    id: "kw-9",
    keyword: "degrisement terrasse bois",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "D\xE9grisage Bois",
    slug: "/degrisement-bois",
    title: "D\xE9grisage Terrasse Bois Ext\xE9rieur | Traitement D\xE9grisant Pro",
    h1: "D\xE9grisement et restauration de terrasse en bois (ip\xE9, teck, pin)",
    cta: "Faire d\xE9griser ma terrasse",
    status: "Optimis\xE9",
    serviceType: "Bois",
    geo: "Gironde"
  },
  {
    id: "kw-10",
    keyword: "comment nettoyer terrasse bois noircie",
    intent: "informationnelle",
    priority: "P2 - Moyenne",
    targetPage: "Nettoyage Terrasse Bois",
    slug: "/nettoyage-terrasse-bois",
    title: "Terrasse Bois Noircie : Comment la Nettoyer Efficacement ?",
    h1: "Comment enlever les salissures noires et le voile gris du bois",
    cta: "Obtenir un diagnostic gratuit bois",
    status: "Optimis\xE9",
    serviceType: "Bois",
    geo: "Gironde"
  },
  {
    id: "kw-11",
    keyword: "renovation terrasse bois exotique ipe teck",
    intent: "commerciale",
    priority: "P2 - Moyenne",
    targetPage: "Nettoyage Terrasse Bois",
    slug: "/nettoyage-terrasse-bois",
    title: "R\xE9novation Terrasse Bois Exotique (Ip\xE9, Teck, Cumaru) Bordeaux",
    h1: "R\xE9novation et entretien des terrasses en bois exotiques pr\xE9cieux",
    cta: "Demander un devis terrasse exotique",
    status: "Optimis\xE9",
    serviceType: "Bois",
    geo: "Bordeaux"
  },
  {
    id: "kw-12",
    keyword: "traitement saturateur terrasse bois",
    intent: "commerciale",
    priority: "P2 - Moyenne",
    targetPage: "D\xE9grisage Bois",
    slug: "/degrisement-bois",
    title: "Application Saturateur & Protection Bois Ext\xE9rieur Gironde",
    h1: "Traitement protecteur, huilage et saturation des bois ext\xE9rieurs",
    cta: "Prot\xE9ger ma terrasse avec un saturateur",
    status: "Optimis\xE9",
    serviceType: "Bois",
    geo: "Gironde"
  },
  // --- SILO : NETTOYAGE TERRASSE BÉTON ---
  {
    id: "kw-13",
    keyword: "nettoyage terrasse beton",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Nettoyage Terrasse B\xE9ton",
    slug: "/nettoyage-terrasse-beton",
    title: "Nettoyage Terrasse B\xE9ton & Dalles | NOVA CB",
    h1: "Nettoyage de terrasse en b\xE9ton et dalles gravillonn\xE9es en Gironde",
    cta: "Demander un devis terrasse b\xE9ton",
    status: "Optimis\xE9",
    serviceType: "B\xE9ton",
    geo: "Gironde"
  },
  {
    id: "kw-14",
    keyword: "nettoyer dalle gravillonnee terrasse",
    intent: "informationnelle",
    priority: "P2 - Moyenne",
    targetPage: "Nettoyage Terrasse B\xE9ton",
    slug: "/nettoyage-terrasse-beton",
    title: "Nettoyage Dalles Gravillonn\xE9es sans desceller les gravillons",
    h1: "D\xE9crassage en profondeur des dalles gravillonn\xE9es et d\xE9sactiv\xE9es",
    cta: "Confier mes dalles b\xE9ton \xE0 un pro",
    status: "Optimis\xE9",
    serviceType: "B\xE9ton",
    geo: "Gironde"
  },
  {
    id: "kw-15",
    keyword: "enlever traces noires terrasse beton",
    intent: "commerciale",
    priority: "P2 - Moyenne",
    targetPage: "Nettoyage Terrasse B\xE9ton",
    slug: "/nettoyage-terrasse-beton",
    title: "Supprimer les Traces Noires & Salissures sur B\xE9ton Ext\xE9rieur",
    h1: "\xC9limination des taches de pollution et moisissures sur dalle b\xE9ton",
    cta: "Obtenir mon estimation",
    status: "Optimis\xE9",
    serviceType: "B\xE9ton",
    geo: "M\xE9rignac"
  },
  // --- SILO : NETTOYAGE TERRASSE PIERRE NATURELLE ---
  {
    id: "kw-16",
    keyword: "nettoyage terrasse pierre",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Nettoyage Terrasse Pierre",
    slug: "/nettoyage-terrasse-pierre",
    title: "Nettoyage Terrasse Pierre Naturelle & Travertin | NOVA CB",
    h1: "Nettoyage d\xE9licat de terrasse en pierre naturelle, calcaire et travertin",
    cta: "Demander un devis pierre naturelle",
    status: "Optimis\xE9",
    serviceType: "Pierre",
    geo: "Gironde"
  },
  {
    id: "kw-17",
    keyword: "nettoyer travertin exterieur terrasse sans abimer",
    intent: "informationnelle",
    priority: "P2 - Moyenne",
    targetPage: "Nettoyage Terrasse Pierre",
    slug: "/nettoyage-terrasse-pierre",
    title: "Comment Nettoyer le Travertin Ext\xE9rieur sans Agresser la Pierre",
    h1: "M\xE9thode professionnelle pour nettoyer le travertin et la pierre tendre",
    cta: "Demander un diagnostic travertin",
    status: "Optimis\xE9",
    serviceType: "Pierre",
    geo: "Gironde"
  },
  {
    id: "kw-18",
    keyword: "demoussage dallage pierre calcaire bordeaux",
    intent: "locale",
    priority: "P2 - Moyenne",
    targetPage: "Nettoyage Terrasse Pierre",
    slug: "/nettoyage-terrasse-pierre",
    title: "D\xE9moussage Pierre Calcaire Bordeaux | Traitement Doux",
    h1: "Entretien et d\xE9moussage de la pierre calcaire bordelaise",
    cta: "Faire estimer mon dallage pierre",
    status: "Optimis\xE9",
    serviceType: "Pierre",
    geo: "Bordeaux"
  },
  // --- SILO : NETTOYAGE MUR EXTÉRIEUR & FAÇADES ---
  {
    id: "kw-22",
    keyword: "nettoyage mur exterieur",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Nettoyage Murs Ext\xE9rieurs",
    slug: "/nettoyage-mur-exterieur",
    title: "Nettoyage Mur Ext\xE9rieur, Muret & Fa\xE7ade | NOVA CB",
    h1: "Nettoyage de murs ext\xE9rieurs, murets de cl\xF4ture et fa\xE7ades en Gironde",
    cta: "Demander un devis mur ext\xE9rieur",
    status: "Optimis\xE9",
    serviceType: "Murs & Fa\xE7ades",
    geo: "Gironde"
  },
  {
    id: "kw-23",
    keyword: "nettoyage facade crepi sans abimer",
    intent: "informationnelle",
    priority: "P1 - Forte",
    targetPage: "Nettoyage Murs Ext\xE9rieurs",
    slug: "/nettoyage-mur-exterieur",
    title: "Nettoyage Fa\xE7ade Cr\xE9pi sans Ab\xEEmer l\u2019Enduit | M\xE9thode Douce",
    h1: "Nettoyage softwash basse pression pour cr\xE9pi et enduit gratt\xE9",
    cta: "Demander un diagnostic fa\xE7ade",
    status: "Optimis\xE9",
    serviceType: "Murs & Fa\xE7ades",
    geo: "Gironde"
  },
  {
    id: "kw-24",
    keyword: "enlever traces rouges noires muret cloture",
    intent: "commerciale",
    priority: "P2 - Moyenne",
    targetPage: "Nettoyage Murs Ext\xE9rieurs",
    slug: "/nettoyage-mur-exterieur",
    title: "Supprimer Traces Rouges & Noires sur Murs de Cl\xF4ture",
    h1: "\xC9limination des train\xE9es rouges et pollutions atmosph\xE9riques sur muret",
    cta: "Faire estimer mon muret",
    status: "Optimis\xE9",
    serviceType: "Murs & Fa\xE7ades",
    geo: "M\xE9rignac"
  },
  {
    id: "kw-25",
    keyword: "nettoyage facade merignac",
    intent: "locale",
    priority: "P1 - Forte",
    targetPage: "M\xE9rignac (Local)",
    slug: "/merignac",
    title: "Nettoyage Fa\xE7ade & Murs M\xE9rignac (33700) | NOVA CB",
    h1: "R\xE9novation de murs ext\xE9rieurs et fa\xE7ades \xE0 M\xE9rignac",
    cta: "Demander un devis gratuit M\xE9rignac",
    status: "Optimis\xE9",
    serviceType: "Murs & Fa\xE7ades",
    geo: "M\xE9rignac"
  },
  // --- SILO : TRAITEMENT ANTI-MOUSSE & SALISSURES ---
  {
    id: "kw-26",
    keyword: "traitement anti mousse",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Traitement Anti-Mousse",
    slug: "/traitement-anti-mousse",
    title: "Traitement Anti-Mousse Ext\xE9rieur Curatif & Pr\xE9ventif | NOVA CB",
    h1: "Traitement anti-mousse professionnel pour terrasses, cours et murs",
    cta: "Appliquer un traitement anti-mousse",
    status: "Optimis\xE9",
    serviceType: "Traitements",
    geo: "Gironde"
  },
  {
    id: "kw-27",
    keyword: "produit anti mousse professionnel remanent",
    intent: "informationnelle",
    priority: "P2 - Moyenne",
    targetPage: "Traitement Anti-Mousse",
    slug: "/traitement-anti-mousse",
    title: "Anti-Mousse Professionnel R\xE9manent : Action Longue Dur\xE9e",
    h1: "Formulations fongicides et algicides professionnelles sans javel",
    cta: "D\xE9couvrir nos traitements professionnels",
    status: "Optimis\xE9",
    serviceType: "Traitements",
    geo: "Gironde"
  },
  {
    id: "kw-28",
    keyword: "traitement salissures exterieures terrasse",
    intent: "commerciale",
    priority: "P2 - Moyenne",
    targetPage: "Traitement Anti-Mousse",
    slug: "/traitement-anti-mousse",
    title: "Traitement des Salissures Ext\xE9rieures & Mousses Incrust\xE9es",
    h1: "Assainissement en profondeur des sols et surfaces ext\xE9rieures",
    cta: "Faire traiter mes ext\xE9rieurs",
    status: "Optimis\xE9",
    serviceType: "Traitements",
    geo: "M\xE9rignac"
  },
  // --- SILO : ENTRETIEN RÉGULIER TERRASSE & EXTÉRIEUR ---
  {
    id: "kw-29",
    keyword: "entretien terrasse",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Entretien R\xE9gulier Terrasse",
    slug: "/entretien-terrasse",
    title: "Entretien R\xE9gulier Terrasse & Ext\xE9rieurs | NOVA CB",
    h1: "Entretien r\xE9gulier et contrat annuel pour terrasses et abords",
    cta: "Planifier l\u2019entretien de ma terrasse",
    status: "Optimis\xE9",
    serviceType: "Entretien",
    geo: "Gironde"
  },
  {
    id: "kw-30",
    keyword: "quand nettoyer sa terrasse printemps automne",
    intent: "informationnelle",
    priority: "P3 - Longue tra\xEEne",
    targetPage: "Entretien R\xE9gulier Terrasse",
    slug: "/entretien-terrasse",
    title: "Quand Nettoyer sa Terrasse ? Conseils Printemps & Automne",
    h1: "P\xE9riodes id\xE9ales et fr\xE9quence conseill\xE9e pour entretenir sa terrasse",
    cta: "Obtenir des conseils d\u2019entretien",
    status: "Optimis\xE9",
    serviceType: "Entretien",
    geo: "Gironde"
  },
  {
    id: "kw-31",
    keyword: "protection hydrofuge terrasse exterieure",
    intent: "commerciale",
    priority: "P2 - Moyenne",
    targetPage: "Entretien R\xE9gulier Terrasse",
    slug: "/entretien-terrasse",
    title: "Protection Hydrofuge & Ol\xE9ofuge Terrasse Ext\xE9rieure Gironde",
    h1: "Imperm\xE9abilisation et barri\xE8re anti-tache pour terrasses et dallages",
    cta: "Demander une protection hydrofuge",
    status: "Optimis\xE9",
    serviceType: "Entretien",
    geo: "Gironde"
  },
  // --- LOCAL SEO : MÉRIGNAC & COMMUNES BORDEAUX MÉTROPOLE ---
  {
    id: "kw-32",
    keyword: "entreprise nettoyage terrasse merignac",
    intent: "locale",
    priority: "P1 - Forte",
    targetPage: "M\xE9rignac (Local)",
    slug: "/merignac",
    title: "Entreprise Nettoyage Terrasse M\xE9rignac | NOVA CB",
    h1: "Artisan du nettoyage de terrasse \xE0 M\xE9rignac (Capeyron, Beutre, Arlac)",
    cta: "Demander mon devis M\xE9rignac",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "M\xE9rignac"
  },
  {
    id: "kw-33",
    keyword: "nettoyage terrasse pessac",
    intent: "locale",
    priority: "P1 - Forte",
    targetPage: "Pessac (Local)",
    slug: "/pessac",
    title: "Nettoyage Terrasse Pessac | Dalles & Bois | NOVA CB",
    h1: "Nettoyage et entretien de terrasses \xE0 Pessac et Alouette",
    cta: "Obtenir mon devis Pessac",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Pessac"
  },
  {
    id: "kw-34",
    keyword: "nettoyage terrasse talence",
    intent: "locale",
    priority: "P1 - Forte",
    targetPage: "Talence (Local)",
    slug: "/talence",
    title: "Nettoyage Terrasse Talence | Cours & Dallages | NOVA CB",
    h1: "Nettoyage professionnel de terrasses et cours priv\xE9es \xE0 Talence",
    cta: "Faire estimer mon chantier Talence",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Talence"
  },
  {
    id: "kw-35",
    keyword: "nettoyage terrasse le bouscat",
    intent: "locale",
    priority: "P1 - Forte",
    targetPage: "Le Bouscat (Local)",
    slug: "/le-bouscat",
    title: "Nettoyage Terrasse Le Bouscat | Pierre & Bois Pr\xE9cieux",
    h1: "R\xE9novation soign\xE9e de terrasses en bois et pierre au Bouscat",
    cta: "Demander un devis Le Bouscat",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Le Bouscat"
  },
  {
    id: "kw-36",
    keyword: "nettoyage terrasse bruges",
    intent: "locale",
    priority: "P2 - Moyenne",
    targetPage: "Bruges (Local)",
    slug: "/bruges",
    title: "Nettoyage Terrasse Bruges 33520 | D\xE9moussage & Traitement",
    h1: "Nettoyage de terrasses et \xE9limination du voile vert \xE0 Bruges",
    cta: "Obtenir mon estimation Bruges",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Bruges"
  },
  {
    id: "kw-37",
    keyword: "nettoyage terrasse eysines",
    intent: "locale",
    priority: "P2 - Moyenne",
    targetPage: "Eysines (Local)",
    slug: "/eysines",
    title: "Nettoyage Terrasse Eysines (33320) | NOVA CB",
    h1: "Entretien de terrasses et murs ext\xE9rieurs \xE0 Eysines",
    cta: "Demander un devis Eysines",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Eysines"
  },
  {
    id: "kw-38",
    keyword: "nettoyage terrasse saint medard en jalles",
    intent: "locale",
    priority: "P2 - Moyenne",
    targetPage: "Saint-M\xE9dard-en-Jalles (Local)",
    slug: "/saint-medard-en-jalles",
    title: "Nettoyage Terrasse Saint-M\xE9dard-en-Jalles | NOVA CB",
    h1: "Nettoyage de terrasse bois et dalles \xE0 Saint-M\xE9dard-en-Jalles",
    cta: "Obtenir mon devis Saint-M\xE9dard",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Saint-M\xE9dard-en-Jalles"
  },
  {
    id: "kw-39",
    keyword: "nettoyage terrasse gradignan",
    intent: "locale",
    priority: "P2 - Moyenne",
    targetPage: "Gradignan (Local)",
    slug: "/gradignan",
    title: "Nettoyage Terrasse Gradignan (33170) | NOVA CB",
    h1: "Nettoyage et d\xE9grisage de terrasse bois \xE0 Gradignan",
    cta: "Faire estimer ma terrasse Gradignan",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Gradignan"
  },
  // --- REQUÊTES COMMERCIALES & ARTISAN LOCAL ---
  {
    id: "kw-40",
    keyword: "artisan nettoyage terrasse bordeaux",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Bordeaux (Local)",
    slug: "/bordeaux",
    title: "Artisan Nettoyage Terrasse Bordeaux | NOVA CB",
    h1: "Artisan qualifi\xE9 en nettoyage et r\xE9novation de terrasses \xE0 Bordeaux",
    cta: "Prendre contact avec l\u2019artisan",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Bordeaux"
  },
  {
    id: "kw-41",
    keyword: "tarif nettoyage terrasse exterieure",
    intent: "transactionnelle",
    priority: "P1 - Forte",
    targetPage: "Nettoyage Terrasse Professionnel",
    slug: "/nettoyage-terrasse",
    title: "Tarif Nettoyage Terrasse Ext\xE9rieure | Estimation Imm\xE9diate",
    h1: "Bar\xE8me tarifaire et devis transparent pour le nettoyage de terrasse",
    cta: "Demander mon tarif personnalis\xE9",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Gironde"
  },
  {
    id: "kw-42",
    keyword: "nettoyage exterieur maison bordeaux",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Page d\u2019accueil",
    slug: "/",
    title: "Nettoyage Ext\xE9rieur Maison Bordeaux & Gironde | NOVA CB",
    h1: "Nettoyage et entretien des ext\xE9rieurs \xE0 M\xE9rignac et Bordeaux",
    cta: "Demander un devis global ext\xE9rieur",
    status: "Optimis\xE9",
    serviceType: "Global",
    geo: "Bordeaux"
  },
  {
    id: "kw-43",
    keyword: "demoussage terrasse bordeaux",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Traitement Anti-Mousse",
    slug: "/traitement-anti-mousse",
    title: "D\xE9moussage Terrasse Bordeaux | Traitement Curatif & Pr\xE9ventif",
    h1: "D\xE9moussage et \xE9limination des mousses sur terrasses \xE0 Bordeaux",
    cta: "Demander un d\xE9moussage terrasse",
    status: "Optimis\xE9",
    serviceType: "Traitements",
    geo: "Bordeaux"
  },
  {
    id: "kw-44",
    keyword: "societe nettoyage terrasse gironde 33",
    intent: "commerciale",
    priority: "P2 - Moyenne",
    targetPage: "Page d\u2019accueil",
    slug: "/",
    title: "Soci\xE9t\xE9 de Nettoyage de Terrasse en Gironde (33) | NOVA CB",
    h1: "Intervention professionnelle pour vos terrasses en Gironde",
    cta: "Faire estimer mon chantier",
    status: "Optimis\xE9",
    serviceType: "Terrasses",
    geo: "Gironde"
  },
  {
    id: "kw-45",
    keyword: "nettoyage tour de piscine dalles",
    intent: "commerciale",
    priority: "P2 - Moyenne",
    targetPage: "Nettoyage Terrasse Pierre",
    slug: "/nettoyage-terrasse-pierre",
    title: "Nettoyage Tour de Piscine & Margelles Dalles Pierre | NOVA CB",
    h1: "Nettoyage s\xE9curis\xE9 des abords de piscine et margelles antid\xE9rapantes",
    cta: "Faire nettoyer mon tour de piscine",
    status: "Optimis\xE9",
    serviceType: "Pierre",
    geo: "Gironde"
  },
  // --- SILO PRIORITAIRE : DÉMOUSSAGE & NETTOYAGE TOITURE (MÉRIGNAC & BORDEAUX) ---
  {
    id: "kw-toiture-1",
    keyword: "d\xE9moussage toiture m\xE9rignac",
    intent: "locale",
    priority: "P1 - Forte",
    targetPage: "D\xE9moussage Toiture M\xE9rignac (33700)",
    slug: "/nettoyage-demoussage-toiture",
    title: "D\xE9moussage Toiture M\xE9rignac (33700) | Traitement Anti-Mousse & Devis Gratuit | NOVA CB",
    h1: "D\xE9moussage de toiture \xE0 M\xE9rignac : Traitement professionnel basse pression r\xE9manent",
    cta: "Demander mon devis d\xE9moussage M\xE9rignac",
    status: "Optimis\xE9",
    serviceType: "Toitures",
    geo: "M\xE9rignac"
  },
  {
    id: "kw-toiture-2",
    keyword: "d\xE9moussage toiture bordeaux",
    intent: "locale",
    priority: "P1 - Forte",
    targetPage: "D\xE9moussage Toiture Bordeaux M\xE9tropole",
    slug: "/nettoyage-demoussage-toiture",
    title: "D\xE9moussage Toiture Bordeaux | Sp\xE9cialiste Traitement Anti-Mousse Tuiles & Ardoises | NOVA CB",
    h1: "D\xE9moussage de toiture \xE0 Bordeaux et M\xE9tropole : Assainissement durable sans haute pression agressive",
    cta: "Demander un devis d\xE9moussage Bordeaux",
    status: "Optimis\xE9",
    serviceType: "Toitures",
    geo: "Bordeaux"
  },
  {
    id: "kw-toiture-3",
    keyword: "nettoyage toiture m\xE9rignac devis",
    intent: "transactionnelle",
    priority: "P1 - Forte",
    targetPage: "Devis Nettoyage Toiture M\xE9rignac",
    slug: "/nettoyage-demoussage-toiture",
    title: "Nettoyage Toiture M\xE9rignac Devis Gratuit 48h | Prix m\xB2 & Diagnostic Offert | NOVA CB",
    h1: "Nettoyage de toiture \xE0 M\xE9rignac : Devis gratuit sous 48h sans engagement",
    cta: "Obtenir mon devis toiture gratuit sous 48h",
    status: "Optimis\xE9",
    serviceType: "Toitures",
    geo: "M\xE9rignac"
  },
  {
    id: "kw-toiture-4",
    keyword: "entreprise nettoyage toiture bordeaux",
    intent: "commerciale",
    priority: "P1 - Forte",
    targetPage: "Entreprise Nettoyage Toiture Bordeaux",
    slug: "/nettoyage-demoussage-toiture",
    title: "Entreprise Nettoyage Toiture Bordeaux | Artisan Sp\xE9cialis\xE9 & Devis 48h | NOVA CB",
    h1: "Votre entreprise artisanale de nettoyage et d\xE9moussage de toiture \xE0 Bordeaux et Gironde",
    cta: "Contacter notre entreprise toiture \xE0 Bordeaux",
    status: "Optimis\xE9",
    serviceType: "Toitures",
    geo: "Bordeaux"
  },
  {
    id: "kw-toiture-5",
    keyword: "prix demoussage toiture bordeaux m2",
    intent: "transactionnelle",
    priority: "P2 - Moyenne",
    targetPage: "Tarifs D\xE9moussage Toiture Bordeaux",
    slug: "/nettoyage-demoussage-toiture",
    title: "Prix D\xE9moussage Toiture au m\xB2 Bordeaux & Gironde (10\u20AC \xE0 22\u20AC/m\xB2) | NOVA CB",
    h1: "Tarifs et prix au m\xB2 pour le d\xE9moussage et nettoyage de toiture \xE0 Bordeaux",
    cta: "Calculer mon tarif toiture au m\xB2",
    status: "Optimis\xE9",
    serviceType: "Toitures",
    geo: "Bordeaux"
  },
  {
    id: "kw-toiture-6",
    keyword: "traitement anti mousse toiture merignac",
    intent: "commerciale",
    priority: "P2 - Moyenne",
    targetPage: "Traitement Anti-Mousse Toiture M\xE9rignac",
    slug: "/nettoyage-demoussage-toiture",
    title: "Traitement Anti-Mousse Toiture M\xE9rignac | Fongicide Professionnel R\xE9manent | NOVA CB",
    h1: "Traitement curatif et pr\xE9ventif anti-mousse pour toitures \xE0 M\xE9rignac",
    cta: "Demander un traitement toiture \xE0 M\xE9rignac",
    status: "Optimis\xE9",
    serviceType: "Toitures",
    geo: "M\xE9rignac"
  }
];
var SEO_METRICS = {
  totalKeywords: SEO_KEYWORDS_MATRIX.length,
  optimizedCount: SEO_KEYWORDS_MATRIX.filter((k) => k.status === "Optimis\xE9").length,
  p1PriorityCount: SEO_KEYWORDS_MATRIX.filter((k) => k.priority === "P1 - Forte").length,
  commercialIntentCount: SEO_KEYWORDS_MATRIX.filter((k) => k.intent === "commerciale" || k.intent === "transactionnelle").length,
  localIntentCount: SEO_KEYWORDS_MATRIX.filter((k) => k.intent === "locale").length
};
function getSeoMatrix() {
  return {
    matrix: SEO_KEYWORDS_MATRIX,
    metrics: {
      totalKeywords: SEO_KEYWORDS_MATRIX.length,
      optimizedCount: SEO_KEYWORDS_MATRIX.filter((k) => k.status === "Optimis\xE9").length,
      p1PriorityCount: SEO_KEYWORDS_MATRIX.filter((k) => k.priority === "P1 - Forte").length,
      commercialIntentCount: SEO_KEYWORDS_MATRIX.filter((k) => k.intent === "commerciale" || k.intent === "transactionnelle").length,
      localIntentCount: SEO_KEYWORDS_MATRIX.filter((k) => k.intent === "locale").length
    }
  };
}
function updateSeoKeyword(id, updates) {
  const index = SEO_KEYWORDS_MATRIX.findIndex((k) => k.id === id);
  if (index === -1) return null;
  SEO_KEYWORDS_MATRIX[index] = {
    ...SEO_KEYWORDS_MATRIX[index],
    ...updates,
    id: SEO_KEYWORDS_MATRIX[index].id
  };
  return SEO_KEYWORDS_MATRIX[index];
}
function addSeoKeywords(items) {
  const newItems = items.map((item, idx) => ({
    ...item,
    id: `kw-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`
  }));
  SEO_KEYWORDS_MATRIX.push(...newItems);
  return newItems;
}
function generateCsvExport() {
  const headers = ["ID", "Mot-cl\xE9", "Intention", "Priorit\xE9", "Page cible", "Slug URL", "Titre SEO", "H1", "CTA", "Statut", "Silo", "Zone"];
  const rows = SEO_KEYWORDS_MATRIX.map((item) => [
    `"${item.id}"`,
    `"${(item.keyword || "").replace(/"/g, '""')}"`,
    `"${item.intent || ""}"`,
    `"${item.priority || ""}"`,
    `"${(item.targetPage || "").replace(/"/g, '""')}"`,
    `"${item.slug || ""}"`,
    `"${(item.title || "").replace(/"/g, '""')}"`,
    `"${(item.h1 || "").replace(/"/g, '""')}"`,
    `"${(item.cta || "").replace(/"/g, '""')}"`,
    `"${item.status || ""}"`,
    `"${item.serviceType || ""}"`,
    `"${item.geo || ""}"`
  ].join(","));
  return [headers.join(","), ...rows].join("\n");
}

// server.ts
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.set("trust proxy", 1);
  app.use(import_express.default.json());
  app.use((0, import_cookie_parser.default)());
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "nova-cb-platform" });
  });
  app.post("/api/contact", (req, res) => {
    try {
      const { nom_complet, fullName, telephone, phone, email, support_a_diagnostiquer, problemes_constates } = req.body || {};
      const clientName = nom_complet || fullName || "Client";
      const clientPhone = telephone || phone || "Non renseign\xE9";
      console.log(`[NOVA CB Contact] Nouvelle demande re\xE7ue de ${clientName} (${clientPhone}) - Support: ${support_a_diagnostiquer}`);
      res.json({
        success: true,
        message: "Demande de diagnostic enregistr\xE9e avec succ\xE8s",
        recipient: "nova.entretien33@outlook.fr"
      });
    } catch (err) {
      console.error("[NOVA CB Contact] Erreur:", err);
      res.status(500).json({ success: false, error: "Erreur lors du traitement de la demande" });
    }
  });
  app.post("/api/admin/login", (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown-ip";
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      res.status(429).json({
        success: false,
        error: `Trop de tentatives de connexion infructueuses. Veuillez patienter ${rateCheck.retryAfterSeconds || 60} secondes avant de r\xE9essayer.`
      });
      return;
    }
    const { email, password } = req.body;
    if (!email || !password) {
      recordFailedAttempt(clientIp);
      res.status(400).json({
        success: false,
        error: "Identifiants incorrects."
      });
      return;
    }
    const isValid = verifyAdminCredentials(email, password);
    if (!isValid) {
      recordFailedAttempt(clientIp);
      res.status(401).json({
        success: false,
        error: "Identifiants incorrects."
      });
      return;
    }
    resetFailedAttempts(clientIp);
    const sessionToken = createAdminSession(email.trim().toLowerCase());
    res.cookie("nova_admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 4 * 60 * 60 * 1e3,
      // 4 hours
      path: "/"
    });
    res.json({
      success: true,
      message: "Authentification r\xE9ussie.",
      user: {
        email: email.trim().toLowerCase(),
        role: "admin"
      }
    });
  });
  app.get("/api/admin/me", (req, res) => {
    const token = req.cookies?.nova_admin_session || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : void 0);
    const session = getSession(token);
    if (!session) {
      res.status(401).json({
        authenticated: false,
        error: "Non authentifi\xE9."
      });
      return;
    }
    res.json({
      authenticated: true,
      user: {
        email: session.email,
        role: session.role
      }
    });
  });
  app.post("/api/admin/logout", (req, res) => {
    const token = req.cookies?.nova_admin_session || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : void 0);
    destroySession(token);
    res.clearCookie("nova_admin_session", { path: "/" });
    res.json({
      success: true,
      message: "D\xE9connexion effectu\xE9e."
    });
  });
  app.get("/api/admin/seo/matrix", requireAdminAuth, (req, res) => {
    const data = getSeoMatrix();
    res.json({
      success: true,
      matrix: data.matrix,
      metrics: data.metrics
    });
  });
  app.put("/api/admin/seo/matrix/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updatedItem = updateSeoKeyword(id, updates);
    if (!updatedItem) {
      res.status(404).json({
        success: false,
        error: "Mot-cl\xE9 introuvable."
      });
      return;
    }
    res.json({
      success: true,
      item: updatedItem
    });
  });
  app.post("/api/admin/seo/matrix", requireAdminAuth, (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        error: "Liste de mots-cl\xE9s invalide."
      });
      return;
    }
    const createdItems = addSeoKeywords(items);
    res.json({
      success: true,
      created: createdItems,
      totalAdded: createdItems.length
    });
  });
  app.get("/api/admin/seo/export", requireAdminAuth, (req, res) => {
    const format = req.query.format === "json" ? "json" : "csv";
    if (format === "json") {
      const data = getSeoMatrix();
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", 'attachment; filename="matrice-seo-nova-cb-confidentielle.json"');
      res.send(JSON.stringify(data, null, 2));
    } else {
      const csv = generateCsvExport();
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", 'attachment; filename="matrice-seo-nova-cb-confidentielle.csv"');
      res.send(csv);
    }
  });
  app.all("/api/seo*", (req, res) => {
    res.status(403).json({
      success: false,
      error: "Acc\xE8s interdit. Cette API est strictement priv\xE9e."
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NOVA CB Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
