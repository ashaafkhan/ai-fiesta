const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../utils/logger');

class GeminiProvider {
  constructor() {
    this.genAI = null;
  }

  get client() {
    if (!this.genAI) {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    return this.genAI;
  }

  /**
   * Generates a response using a Gemini model
   * @param {string} prompt - The user prompt
   * @param {string} modelName - The model identifier
   * @param {string} friendlyName - Friendly name for logging/response
   * @returns {Promise<Object>}
   */
  async generateResponse(prompt, modelName, friendlyName) {
    const startTime = Date.now();
    try {
      const model = this.client.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      const latencyMs = Date.now() - startTime;
      const tokenUsage = result.response.usageMetadata?.totalTokenCount || 0;

      return {
        model: friendlyName,
        response,
        latency: `${(latencyMs / 1000).toFixed(2)} seconds`,
        latencyMs,
        tokenUsage,
        timestamp: new Date().toISOString(),
        error: null
      };
    } catch (error) {
      logger.error(`GeminiProvider Error (${friendlyName})`, error.message);
      return {
        model: friendlyName,
        response: '',
        latency: `${((Date.now() - startTime) / 1000).toFixed(2)} seconds`,
        latencyMs: Date.now() - startTime,
        tokenUsage: 0,
        timestamp: new Date().toISOString(),
        error: error.message
      };
    }
  }
}

module.exports = new GeminiProvider();
