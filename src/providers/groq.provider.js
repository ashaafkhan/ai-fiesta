const Groq = require('groq-sdk');
const logger = require('../utils/logger');

class GroqProvider {
  get client() {
    if (!this.groq) {
      this.groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
      });
    }
    return this.groq;
  }

  /**
   * Generates a response using a Groq model
   * @param {string} prompt - The user prompt
   * @param {string} modelName - The model identifier
   * @param {string} friendlyName - Friendly name for logging/response
   * @returns {Promise<Object>} An object containing the response, model name, latency, etc.
   */
  async generateResponse(prompt, modelName, friendlyName) {
    const startTime = Date.now();
    try {
      const chatCompletion = await this.client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: modelName,
      });

      const latencyMs = Date.now() - startTime;
      const response = chatCompletion.choices[0]?.message?.content || '';
      const tokenUsage = chatCompletion.usage?.total_tokens || 0;

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
      logger.error(`GroqProvider Error (${friendlyName})`, error.message);
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

module.exports = new GroqProvider();
