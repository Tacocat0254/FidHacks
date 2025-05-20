import express from "express"
import fetch from "node-fetch"
import * as cheerio from "cheerio"
import puppeteer from "puppeteer"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontendDir = path.join(__dirname,'website')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static(frontendDir))

function detectSiteType(url) {
  if (url.includes('amazon.jobs')) return 'amazon'
  if (url.includes('fidelity.com')) return 'fidelity'
  return 'unsupported'
}

app.post('/scrape', async (req, res) => {
  const { url } = req.body
  if (!url || !url.startsWith('http')) return res.json({ error: 'Invalid URL' })

  const site = detectSiteType(url)
  if (site === 'unsupported') return res.json({ error: 'Unsupported job site.' })

  try {
    if (site === 'amazon') {
      const response = await fetch(url)
      const html = await response.text()
      const $ = cheerio.load(html)

      const title = $('h1').first().text().trim()
      const location = $('[class*="location-and-id"]').text().trim()
      const description = $('#job-detail').html() || $('.section.description').html()

      if (!description) return res.json({ error: 'Amazon job description not found.' })

      return res.json({ title, location, description })
    }

    if (site === 'fidelity') {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(url, { waitUntil: 'networkidle2' })

      const data = await page.evaluate(() => {
        return {
          title: document.querySelector('h1')?.innerText.trim(),
          location: document.querySelector('[data-ph-at-id="job-location"]')?.innerText.trim(),
          posted: document.querySelector('[data-ph-at-id="posting-date"]')?.innerText.trim(),
          description: document.querySelector('article.ph-content')?.innerHTML
        }
      })

      await browser.close()
      return res.json(data)
    }

  } catch (err) {
    res.json({ error: 'Scraping failed: ' + err.message })
  }
})



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
