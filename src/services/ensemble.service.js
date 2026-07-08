const groqProvider = require('../providers/groq.provider');
const geminiProvider = require('../providers/gemini.provider');
const judgeService = require('../judge/judge.service');
const { providers } = require('../config/models');
const logger = require('../utils/logger');

class EnsembleService {
  async processPrompt(prompt) {
    logger.info('Received prompt, starting ensemble execution');
    const startTime = Date.now();
    
    const modelPromises = [
      groqProvider.generateResponse(prompt, providers.groq.models.gptOss, 'GPT OSS'),
      geminiProvider.generateResponse(prompt, providers.google.models.geminiFlash, 'Gemini'),
      groqProvider.generateResponse(prompt, providers.groq.models.llama, 'Llama')
    ];

    const modelResponses = await Promise.all(modelPromises);
    const modelsParticipating = modelResponses.map(r => r.model);
    
    const synthesizedAnswer = await judgeService.evaluateAndSynthesize(prompt, modelResponses);
    
    const totalLatencyMs = Date.now() - startTime;
    const totalLatency = `${(totalLatencyMs / 1000).toFixed(2)} seconds`;
    
    logger.info('Ensemble execution finished', { totalLatency });
    
    return {
      answer: synthesizedAnswer,
      models: modelsParticipating,
      latency: totalLatency,
      individualResponses: modelResponses
    };
  }
}

module.exports = new EnsembleService();
