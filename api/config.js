export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  if (req.method !== 'GET') return res.status(405).end();
  res.json({
    url: process.env.PROCHAINE_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
    key: process.env.PROCHAINE_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''
  });
}
