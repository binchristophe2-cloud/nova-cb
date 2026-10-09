<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée. Utilisez POST.']);
    exit;
}

// Récupération des données (JSON ou Form-Data)
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// Nettoyage des champs
function sanitize_field($value) {
    if (is_array($value)) {
        return htmlspecialchars(implode(', ', $value), ENT_QUOTES, 'UTF-8');
    }
    return htmlspecialchars(trim((string)$value), ENT_QUOTES, 'UTF-8');
}

$fullName   = sanitize_field($data['nom_complet'] ?? $data['fullName'] ?? $data['name'] ?? 'Non spécifié');
$phone      = sanitize_field($data['telephone'] ?? $data['phone'] ?? 'Non spécifié');
$clientEmail = filter_var(trim((string)($data['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$address    = sanitize_field($data['adresse_du_bien'] ?? $data['address'] ?? 'Non renseignée');
$postalCode = sanitize_field($data['code_postal'] ?? $data['postalCode'] ?? '');
$city       = sanitize_field($data['ville'] ?? $data['city'] ?? 'Mérignac');
$support    = sanitize_field($data['support_a_diagnostiquer'] ?? $data['support'] ?? 'À déterminer sur place');
$problems   = sanitize_field($data['problemes_constates'] ?? $data['problems'] ?? 'À identifier lors de la visite');
$consent    = sanitize_field($data['accord_recontact'] ?? 'Oui');
$photosInfo = sanitize_field($data['photos_fournies'] ?? 'Aucune photo');
$dateDemande = date('d/m/Y à H:i');

// Destinataire principal
$to = 'nova.entretien33@outlook.fr';

// Sujet de l'e-mail
$subject = "Demande de diagnostic gratuit NOVA CB - " . ($fullName ?: 'Nouveau Client');

// Corps de l'e-mail en HTML
$htmlBody = '
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; color: #1e293b; }
  .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
  .header { background: linear-gradient(135deg, #091F17 0%, #064E3B 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
  .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
  .header p { margin: 8px 0 0 0; color: #a7f3d0; font-size: 14px; }
  .content { padding: 24px; }
  .section-title { font-size: 15px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 20px; margin-bottom: 10px; border-bottom: 2px solid #ecfdf5; padding-bottom: 4px; }
  .info-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
  .info-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
  .info-table td.label { font-weight: 600; color: #64748b; width: 38%; }
  .info-table td.value { color: #0f172a; font-weight: 500; }
  .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: #dcfce7; color: #15803d; }
  .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h1>NOVA CB • Nouvelle Demande de Diagnostic</h1>
    <p>Reçu depuis le site internet nova-cb.com le ' . $dateDemande . '</p>
  </div>
  <div class="content">
    <div class="section-title">Coordonnées du client</div>
    <table class="info-table">
      <tr>
        <td class="label">Nom complet :</td>
        <td class="value"><strong>' . $fullName . '</strong></td>
      </tr>
      <tr>
        <td class="label">Téléphone :</td>
        <td class="value"><a href="tel:' . $phone . '" style="color:#047857; font-weight:bold; text-decoration:none;">' . $phone . '</a></td>
      </tr>
      <tr>
        <td class="label">E-mail :</td>
        <td class="value">' . ($clientEmail ? '<a href="mailto:' . $clientEmail . '" style="color:#047857; text-decoration:none;">' . $clientEmail . '</a>' : 'Non renseigné') . '</td>
      </tr>
      <tr>
        <td class="label">Localisation :</td>
        <td class="value">' . $address . '<br>' . $postalCode . ' ' . $city . '</td>
      </tr>
    </table>

    <div class="section-title">Détails de l\'intervention</div>
    <table class="info-table">
      <tr>
        <td class="label">Support :</td>
        <td class="value"><span class="badge">' . $support . '</span></td>
      </tr>
      <tr>
        <td class="label">Problème(s) signalé(s) :</td>
        <td class="value">' . $problems . '</td>
      </tr>
      <tr>
        <td class="label">Photos :</td>
        <td class="value">' . $photosInfo . '</td>
      </tr>
      <tr>
        <td class="label">Accord de contact :</td>
        <td class="value">' . $consent . '</td>
      </tr>
    </table>
  </div>
  <div class="footer">
    NOVA CB • Spécialiste de l\'entretien toiture, façade & terrasse à Mérignac et Gironde
  </div>
</div>
</body>
</html>
';

// En-têtes pour envoi HTML fiable
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: NOVA CB Site <noreply@nova-cb.com>';
if ($clientEmail) {
    $headers[] = 'Reply-To: ' . $fullName . ' <' . $clientEmail . '>';
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Envoi de l'email
$mailSent = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $htmlBody, implode("\r\n", $headers));

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Demande transmise avec succès à nova.entretien33@outlook.fr']);
} else {
    // Si mail() est désactivé temporairement sur l'hébergeur
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi direct par le serveur.']);
}
