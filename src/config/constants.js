// Configuration - API keys and settings
export const config = {
  // Groq configuration
  groqApiKey: process.env.GROQ_API_KEY,
  groqModel: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  groqFallbackModel: process.env.GROQ_FALLBACK_MODEL || "openai/gpt-oss-20b",
  maxTokens: process.env.GROQ_MAX_TOKENS ? parseInt(process.env.GROQ_MAX_TOKENS) : null,
  temperature: parseFloat(process.env.GROQ_TEMPERATURE) || 0.1,
  
  // OpenRouter configuration (fallback)
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterSiteUrl: process.env.OPENROUTER_SITE_URL || 'https://github.com/yourusername/groq-code-mcp',
  openRouterSiteName: process.env.OPENROUTER_SITE_NAME || 'Groq Code MCP',
  openRouterModel: 'qwen/qwen3-coder'
};

// Debug logging to file  
import path from 'path';
import os from 'os';
import fs from 'fs/promises';

export const LOG_FILE = path.join(os.homedir(), 'groq-mcp-debug.log');

export async function debugLog(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  // Log to stderr (console)
  console.error(message);
  
  // Also append to file
  try {
    await fs.appendFile(LOG_FILE, logMessage);
  } catch (error) {
    // Ignore file write errors
  }
}
