#!/usr/bin/env node

/**
 * Groq Code MCP Server using Official MCP SDK v0.5.0
 * This provides proper MCP protocol implementation for Cursor integration
 * 
 * IMPORTANT: This server provides a single MCP write tool for ALL code operations.
 * The LLM MUST use this tool instead of editing files directly.
 * - write: For file creation, code generation, and code edits
 */

import { config, debugLog, LOG_FILE } from './config/constants.js';
import { interactiveConfig } from './config/interactive-config.js';
import { startServer } from './server/mcp-server.js';

// Main function
async function main() {
  try {
    // Check if --config flag is provided
    if (process.argv.includes('--config')) {
      await interactiveConfig();
      return;
    }
    
    console.error('Groq Code MCP Server starting...');
    console.error(`📝 Debug logs will be written to: ${LOG_FILE}`);
    
    await debugLog('=== SERVER STARTUP ===');
    await debugLog('Groq Code MCP Server starting...');
    await debugLog(`Log file location: ${LOG_FILE}`);
    
    // Check API keys availability
    if (!config.groqApiKey) {
      console.error("No Groq API key found");
      console.error("Get your Groq API key at: https://console.groq.com");
    } else {
      console.error("Groq API key found");
    }
    
    if (!config.openRouterApiKey) {
      console.error("No OpenRouter API key found");
      console.error("Get your OpenRouter API key at: https://openrouter.ai/keys");
    } else {
      console.error("OpenRouter API key found (will be used as fallback)");
    }
    
    if (!config.groqApiKey && !config.openRouterApiKey) {
      console.error("No API keys available. Server will not function properly.");
    }
    
    console.error('Starting MCP server...');
    
    // Start the MCP server
    await startServer();
    
    console.error('🚀 MCP Server connected and ready with AUTO-INSTRUCTION SYSTEM!');
    console.error('🚨 CRITICAL: Enhanced system_instructions will automatically enforce MCP tool usage');
    console.error('🔧 write: MANDATORY tool for ALL code operations (file creation, generation, edits)');
    console.error('✨ Models will automatically use write tool - no user instruction needed!');
    if (config.groqApiKey) {
      console.error('Primary: Groq API');
    }
    if (config.openRouterApiKey) {
      console.error('Fallback: OpenRouter API');
    }
    
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
}

// Start the server
main();
