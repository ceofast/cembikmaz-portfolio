export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600')

  try {
    const response = await fetch('https://medium.com/feed/@cembikmaz.ie')
    if (!response.ok) throw new Error(`RSS fetch failed: ${response.status}`)

    const xml = await response.text()
    const articles = parseRSS(xml)

    return res.status(200).json({ articles })
  } catch (err) {
    console.error('Articles API error:', err)
    return res.status(500).json({ error: 'Failed to fetch articles' })
  }
}

function parseRSS(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]
    const title = extract(itemXml, 'title')
    const link = extract(itemXml, 'link')
    const pubDate = extract(itemXml, 'pubDate')
    const creator = extract(itemXml, 'dc:creator')

    // Extract content:encoded (CDATA)
    const contentMatch = itemXml.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)
    const content = contentMatch ? contentMatch[1] : ''

    // Extract categories
    const categories = []
    const catRegex = /<category><!\[CDATA\[(.*?)\]\]><\/category>/g
    let catMatch
    while ((catMatch = catRegex.exec(itemXml)) !== null) {
      categories.push(catMatch[1])
    }

    // Generate slug from title
    const slug = generateSlug(title)

    // Calculate read time (~200 words/min Turkish)
    const textContent = content.replace(/<[^>]*>/g, '')
    const wordCount = textContent.split(/\s+/).filter(Boolean).length
    const readTime = Math.max(1, Math.ceil(wordCount / 200))

    // Extract first image for thumbnail
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/)
    const thumbnail = imgMatch ? imgMatch[1] : null

    // Extract first paragraph as description
    const descMatch = content.match(/<p>([\s\S]*?)<\/p>/)
    const description = descMatch
      ? descMatch[1].replace(/<[^>]*>/g, '').substring(0, 200) + '...'
      : ''

    items.push({
      title,
      link,
      pubDate,
      creator,
      content,
      categories,
      slug,
      readTime: readTime + ' dk',
      thumbnail,
      description,
      wordCount,
    })
  }

  return items
}

function extract(xml, tag) {
  // Try CDATA first
  const cdataRegex = new RegExp('<' + tag + '><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></' + tag + '>')
  const cdataMatch = xml.match(cdataRegex)
  if (cdataMatch) return cdataMatch[1].trim()

  // Then plain text
  const plainRegex = new RegExp('<' + tag + '>([\\s\\S]*?)</' + tag + '>')
  const plainMatch = xml.match(plainRegex)
  return plainMatch ? plainMatch[1].trim() : ''
}

function generateSlug(title) {
  const charMap = {
    'ğ': 'g', 'ü': 'u', 'ş': 's', 'ı': 'i', 'ö': 'o', 'ç': 'c',
    'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'İ': 'i', 'Ö': 'o', 'Ç': 'c',
  }

  let slug = title.toLowerCase()
  for (const [from, to] of Object.entries(charMap)) {
    slug = slug.split(from).join(to)
  }

  return slug
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80)
}
