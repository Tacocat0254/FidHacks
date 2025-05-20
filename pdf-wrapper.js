// pdf-wrapper.js
import pdfParse from "pdf-parse"

/**
 * Wrapper function for pdf-parse that handles initialization issues
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @returns {Promise<string>} - Extracted text from PDF
 */
export async function parsePDF(pdfBuffer) {
  try {
    // Configure options to avoid test file lookup
    const options = {
      // Some options to make pdf-parse more robust
      version: 'default'
    };
    
    const data = await pdfParse(pdfBuffer, options);
    return data.text;
  } catch (error) {
    console.error("PDF parsing error:", error);
    // Return empty string or throw based on your error handling preference
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}