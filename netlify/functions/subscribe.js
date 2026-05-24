/* ═══════════════════════════════════════════════════
   MEDIOMA — Netlify Function : Newsletter Subscribe
   Intégration : Brevo (ex Sendinblue)
   Expert : Baptiste (Email Marketing)

   CONFIGURATION REQUISE dans Netlify :
   → Environment Variables → Ajouter :
     BREVO_API_KEY = votre_clé_api_brevo
     BREVO_LIST_ID = id_de_votre_liste (ex: 2)
═══════════════════════════════════════════════════ */

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://cabinetmedioma.com',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const CORS = {
    'Access-Control-Allow-Origin': 'https://cabinetmedioma.com',
    'Content-Type': 'application/json'
  };

  try {
    const { email, prenom, interests } = JSON.parse(event.body || '{}');

    if (!email || !email.includes('@')) {
      return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Email invalide' }) };
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '2');

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY manquante dans les variables Netlify');
      return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: 'Configuration manquante' }) };
    }

    const payload = {
      email: email.toLowerCase().trim(),
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
      attributes: {}
    };

    if (prenom) payload.attributes.PRENOM = prenom.trim();
    if (interests && Array.isArray(interests)) payload.attributes.INTERETS = interests.join(', ');

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 204) {
      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({ success: true, message: 'Inscription réussie' })
      };
    }

    const errData = await response.json().catch(() => ({}));

    // Contact déjà inscrit — pas une vraie erreur
    if (response.status === 400 && errData.code === 'duplicate_parameter') {
      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({ success: true, message: 'Déjà inscrit' })
      };
    }

    console.error('Erreur Brevo:', errData);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: "Erreur lors de l'inscription" })
    };

  } catch (err) {
    console.error('Erreur fonction subscribe:', err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: 'Erreur serveur' })
    };
  }
};