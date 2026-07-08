const ensembleService = require('../services/ensemble.service');
const guardrailService = require('../services/guardrail.service');
const logger = require('../utils/logger');

class AiController {
  async processPrompt(req, res) {
    try {
      const { prompt } = req.body || {};
      
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      logger.info('API request received', { prompt: prompt.substring(0, 50) + '...' });
      
      const guardrailCheck = await guardrailService.evaluatePrompt(prompt);
      if (!guardrailCheck.isAllowed) {
        logger.info('Guardrail triggered for prompt', { reason: guardrailCheck.reason });
        return res.status(403).json({ error: 'Your request could not be processed due to a safety violation.' });
      }
      
      const result = await ensembleService.processPrompt(prompt);
      
      return res.json(result);
    } catch (error) {
      logger.error('API Error in processPrompt', error.message);
      return res.status(500).json({ error: 'Internal server error processing prompt' });
    }
  }
}

module.exports = new AiController();
