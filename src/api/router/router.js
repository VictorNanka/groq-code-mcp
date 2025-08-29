import { callGroq } from '../groq.js';
import { callOpenRouter } from '../openrouter.js';
import { config } from '../../config/constants.js';

/**
 * Main API router that handles routing to different AI providers
 * 
 * Benefits:
 * - Centralized provider selection and fallback logic
 * - Easy to add new providers without changing existing code
 * - Automatic failover between providers
 * - Consistent API interface for all providers
 * - Clean separation of concerns
 */
export async function routeAPICall(prompt, context = "", outputFile = "", language = null, contextFiles = []) {
  // Determine which provider to use based on configuration and availability
  const provider = determineProvider();
  
  try {
    switch (provider) {
      case 'groq':
        return await callGroq(prompt, context, outputFile, language, contextFiles);
      
      case 'openrouter':
        return await callOpenRouter(prompt, context, outputFile, language, contextFiles);
      
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  } catch (error) {
    // If primary provider fails, try fallback
    const fallbackProvider = getFallbackProvider(provider);
    if (fallbackProvider && fallbackProvider !== provider) {
      console.log(`Primary provider ${provider} failed, trying fallback ${fallbackProvider}...`);
      
      try {
        switch (fallbackProvider) {
          case 'groq':
            return await callGroq(prompt, context, outputFile, language, contextFiles);
          
          case 'openrouter':
            return await callOpenRouter(prompt, context, outputFile, language, contextFiles);
          
          default:
            throw new Error(`Unknown fallback provider: ${fallbackProvider}`);
        }
      } catch (fallbackError) {
        throw new Error(`Both primary (${provider}) and fallback (${fallbackProvider}) providers failed: ${error.message} | ${fallbackError.message}`);
      }
    } else {
      throw error;
    }
  }
}

/**
 * Determines which provider to use based on configuration
 */
function determineProvider() {
  // Priority: Groq first (if API key available), then OpenRouter
  if (config.groqApiKey) {
    return 'groq';
  } else if (config.openRouterApiKey) {
    return 'openrouter';
  } else {
    throw new Error('No API keys configured. Please set GROQ_API_KEY or OPENROUTER_API_KEY environment variable.');
  }
}

/**
 * Gets fallback provider for a given primary provider
 */
function getFallbackProvider(primaryProvider) {
  switch (primaryProvider) {
    case 'groq':
      // Fallback to OpenRouter if Groq fails
      return config.openRouterApiKey ? 'openrouter' : null;
  }
}

/**
 * Get list of available providers (for future extensibility)
 */
export function getAvailableProviders() {
  const providers = [];
  
  if (config.groqApiKey) {
    providers.push({
      name: 'groq',
      model: config.groqModel,
      available: true
    });
  }
  
  if (config.openRouterApiKey) {
    providers.push({
      name: 'openrouter', 
      model: config.openRouterModel,
      available: true
    });
  }
  
  return providers;
}

/**
 * Future extensibility: Add new providers here
 * 
 * Steps to add a new provider:
 * 1. Create a new API module (e.g., src/api/anthropic.js)
 * 2. Implement the provider function with signature: (prompt, context, outputFile, language, contextFiles)
 * 3. Add the provider to the switch statements above
 * 4. Add configuration for the provider in src/config/constants.js
 * 5. Update determineProvider() and getFallbackProvider() functions
 * 
 * Example for adding Anthropic:
 * 
 * // In the switch statements:
 * case 'anthropic':
 *   return await callAnthropic(prompt, context, outputFile, language, contextFiles);
 * 
 * // In determineProvider():
 * if (config.anthropicApiKey) {
 *   return 'anthropic';
 * }
 * 
 * // In getFallbackProvider():
 * case 'anthropic':
 *   return config.cerebrasApiKey ? 'cerebras' : (config.openRouterApiKey ? 'openrouter' : null);
 */
