export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const raw = await new Promise(r=>{
    try{ let d=''; req.on('data',c=>d+=c); req.on('end',()=>r(d||req.body||'')); }catch{ r(req.body||''); }
  });
  let body={}; try{ body = typeof raw==='string' ? JSON.parse(raw||'{}') : (raw||{});}catch{}

  try{
    const { messages=[], userContext={} } = body;
    const system = `Tu es "Mon Coach IA" pour 15–26 ans.
Réponds en **MARKDOWN** avec : Résumé, Analyse, Plan d'action (numéroté), Exemples chiffrés, Risques/limites, Prochaines actions.
Style direct, concret, paragraphes courts.
Contexte: ${JSON.stringify(userContext)}`;

    const payload = {
      model: "gpt-4o-mini",
      temperature: 0.3,
      top_p: 0.9,
      frequency_penalty: 0.2,
      max_tokens: 1200,
      messages: [{ role:"system", content: system }, ...messages]
    };

    const r2 = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if(!r2.ok){
      const detail = await r2.text();
      res.setHeader('Access-Control-Allow-Origin','*');
      return res.status(r2.status).json({ error:"openai_error", detail });
    }

    const data = await r2.json();
    const content = data?.choices?.[0]?.message?.content || "Désolé, pas de réponse.";

    res.setHeader('Access-Control-Allow-Origin','*');
    return res.status(200).json({ content });
  }catch(e){
    res.setHeader('Access-Control-Allow-Origin','*');
    return res.status(500).json({ error:"server_error", detail:String(e) });
  }
}
