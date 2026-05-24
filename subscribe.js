/* ═══════════════════════════════════════════════════
   MEDIOMA — Netlify Function : subscribe
   Route  : POST /.netlify/functions/subscribe
   Rôle   : Ajoute un inscrit à la liste Brevo
             "Lettre de Lumière"
   Expert : Baptiste (Brevo) + Thomas (Dev)
═══════════════════════════════════════════════════ */

exports.handler = async (event) => {

  /* ── CORS preflight ── */
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin':  'https://cabinetmedioma.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  /* ── Méthode ── */
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  /* ── Parsing ── */
  let prenom, email;
  try {
    ({ prenom, email } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'JSON invalide' }) };
  }

  if (!email || !email.includes('@')) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email invalide' }) };
  }

  /* ── Clé API Brevo (variable Netlify) ── */
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY manquante');
    return { statusCode: 500, body: JSON.stringify({ error: 'Configuration serveur manquante' }) };
  }

  /* ── Appel API Brevo ── */
  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept':       'application/json',
        'api-key':      BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes:    { PRENOM: prenom || '' },
        listIds:       [2],       // ← Remplacer par l'ID réel de ta liste Brevo
        updateEnabled: true,
      }),
    });

    const existing = res.status === 204;

    if (res.ok || existing) {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': 'https://cabinetmedioma.com' },
        body: JSON.stringify({ success: true, existing }),
      };
    }

    const err = await res.json();
    console.error('Erreur Brevo :', err);
    return {
      statusCode: 502,
      body: JSON.stringify({ error: 'Erreur service email', detail: err.message }),
    };

  } catch (e) {
    console.error('Erreur réseau :', e);
    return { statusCode: 500, body: JSON.stringify({ error: 'Erreur serveur' }) };
  }
};
