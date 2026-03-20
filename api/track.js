export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  try {
    const data = req.body
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'

    const logEntry = {
      ...data,
      serverIp: ip,
      serverTimestamp: new Date().toISOString(),
    }

    // Log to Vercel's runtime logs (viewable in Vercel dashboard)
    console.log('VISITOR_TRACK:', JSON.stringify(logEntry))

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Track error:', err)
    return res.status(500).json({ error: 'Internal error' })
  }
}
