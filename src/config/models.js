module.exports = {
  providers: {
    groq: {
      name: 'Groq',
      models: {
        gptOss: 'openai/gpt-oss-20b',
        llama: 'llama-3.3-70b-versatile',
        judge: 'llama-3.3-70b-versatile',
        bouncer: 'llama3-8b-8192'
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
