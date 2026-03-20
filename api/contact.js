export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message too long' })
    }

    const logEntry = {
      name,
      email,
      message: message.substring(0, 5000),
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
      timestamp: new Date().toISOString(),
    }

    console.log('CONTACT_FORM:', JSON.stringify(logEntry))

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({ error: 'Internal error' })
  }
}
