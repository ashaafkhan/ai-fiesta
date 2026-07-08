const groqProvider = require('../providers/groq.provider');
const { providers } = require('../config/models');
const { buildJudgePrompt } = require('./prompt.builder');
const logger = require('../utils/logger');

class JudgeService {
  async evaluateAndSynthesize(originalPrompt, modelResponses) {
    logger.info('Starting judge evaluation');
    
    const gptResponse = modelResponses.find(r => r.model === 'GPT OSS')?.response || 'No response';
    const geminiResponse = modelResponses.find(r => r.model === 'Gemini')?.response || 'No response';
    const llamaResponse = modelResponses.find(r => r.model === 'Llama')?.response || 'No response';

    const judgePrompt = buildJudgePrompt(originalPrompt, gptResponse, geminiResponse, llamaResponse);
    
    const judgeModel = providers.groq.models.judge;
    const result = await groqProvider.generateResponse(judgePrompt, judgeModel, 'Judge');
    
    logger.info('Judge evaluation completed', { latency: result.latency });
    
    return result.response;
  }
}

module.exports = new JudgeService();
