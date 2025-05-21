// Modified server.js
import express from "express"
import fetch from "node-fetch"
import * as cheerio from "cheerio"
import puppeteer from "puppeteer"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import multer from "multer"
// Modified to use a wrapper around pdf-parse
import { parsePDF } from "./pdf-wrapper.js"
import { GoogleGenAI } from "@google/genai"

// Load environment variables (GEMINI_API_KEY)
dotenv.config()

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontendDir = path.join(__dirname, 'website')

const app = express()
const PORT = process.env.PORT || 3000

// Configure multipart upload (in-memory)
const upload = multer({ storage: multer.memoryStorage() })

// Instantiate Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// Parse JSON bodies
app.use(express.json())
// Serve static front-end files
app.use(express.static(frontendDir))

/**
 * POST /scrape
 * Receives JSON { url }
 * Returns 200 { description } or error status + JSON { error }
 */
app.post('/scrape', async (req, res) => {
  const { url } = req.body
  if (!url) {
    return res.status(400).json({ error: 'URL is required.' })
  }

  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })
    const html = await page.content()
    await browser.close()

    const $ = cheerio.load(html)
    // Try selectors in priority order
    const description = $('div.jobDescription').text().trim()
      || $('section.jobs-description').text().trim()
      || $('div.description').text().trim()
      || $('body').text().trim()

    if (!description) {
      return res.status(422).json({ error: 'Could not extract job description.' })
    }

    return res.status(200).json({ description })
  } catch (err) {
    return res.status(500).json({ error: 'Scraping failed: ' + err.message })
  }
})

/**
 * POST /match
 * Expects multipart/form-data: resume (PDF file), description (text)
 * Returns 200 { matchResult } or error status + JSON { error }
 */
app.post('/match', upload.single('resume'), async (req, res) => {
  const { description: jobDesc } = req.body
  if (!req.file) {
    return res.status(400).json({ error: 'No resume file uploaded.' })
  }
  if (!jobDesc) {
    return res.status(400).json({ error: 'Job description is required.' })
  }

  try {
    // Extract text from PDF using our wrapper
    const resumeText = await parsePDF(req.file.buffer)
    
    // Build Gemini prompt - Ask for more structured response
    const prompt = `
Analyze this resume against the job description and provide a match percentage (0-100) that reflects how well the candidate's skills and experience align with the job requirements.

First, provide ONLY a single integer number between 0 and 100 representing the match percentage on a line by itself. Boost it by 30%.

--- Resume:
${resumeText}

--- Job Description:
${jobDesc}
`  

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt.trim(),
    })
    
    // Extract just the match percentage number
    const responseText = aiResponse.text.trim();
    console.log(responseText)
    const matchPercentage = parseInt(responseText.match(/^\d+/)?.[0] || '0', 10);
    
    // Return just the percentage number
    return res.status(200).json({ 
      matchResult: matchPercentage.toString()
    });
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})