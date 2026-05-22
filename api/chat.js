export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const raw = await new Promise(r => {
    try { let d = ''; req.on('data', c => d += c); req.on('end', () => r(d || req.body || '')); }
    catch { r(req.body || ''); }
  });
  let body = {};
  try { body = typeof raw === 'string' ? JSON.parse(raw || '{}') : (raw || {}); } catch {}

  try {
    const { messages = [], systemOverride = null, mode = 'chat' } = body;

    const defaultSystem = `Tu es "EduXP Assistant", un tuteur IA pédagogique, bienveillant et motivant pour lycéens et étudiants français.
Tu aides à comprendre les cours, créer des révisions, et répondre aux questions scolaires.
Sois précis, clair, concis et encourageant. Réponds toujours en français.`;

    const system = systemOverride || defaultSystem;

    const payload = {
      model: "gpt-4o-mini",
      temperature: mode === 'quiz' || mode === 'flashcards' ? 0.2 : 0.5,
      max_tokens: mode === 'summary' ? 1800 : 1200,
      messages: [{ role: "system", content: system }, ...messages]
    };

    const r2 = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!r2.ok) {
      const detail = await r2.text();
      return res.status(r2.status).json({ error: "openai_error", detail });
    }

    const data = await r2.json();
    const content = data?.choices?.[0]?.message?.content || "Désolé, pas de réponse.";
    return res.status(200).json({ content });
  } catch (e) {
    return res.status(500).json({ error: "server_error", detail: String(e) });
  }
}
