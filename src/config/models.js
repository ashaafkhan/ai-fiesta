module.exports = {
  providers: {
    groq: {
      name: 'Groq',
      models: {
        gptOss: 'openai/gpt-oss-20b',
        llama: 'llama-3.3-70b-versatile',
        judge: 'llama-3.3-70b-versatile'
      }
    },
    google: {
      name: 'Google',
      models: {
        geminiFlash: 'gemini-2.5-flash'
      }
    }
  }
};
