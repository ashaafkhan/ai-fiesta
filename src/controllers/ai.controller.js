const ensembleService = require('../services/ensemble.service');
const logger = require('../utils/logger');

class AiController {
  async processPrompt(req, res) {
    try {
      const { prompt } = req.body || {};
      
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      logger.info('API request received', { prompt: prompt.substring(0, 50) + '...' });
      
      const result = await ensembleService.processPrompt(prompt);
      
      return res.json(result);
    } catch (error) {
      logger.error('API Error in processPrompt', error.message);
      return res.status(500).json({ error: 'Internal server error processing prompt' });
    }
  }
}

module.exports = new AiController();
