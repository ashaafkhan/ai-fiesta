module.exports = {
  buildJudgePrompt: (originalPrompt, gptOutput, geminiOutput, llamaOutput) => `
You are an expert AI Judge and Synthesizer.

Evaluate the following responses from 3 different AI models for the given user prompt.

Original User Prompt:
"${originalPrompt}"

---
Model 1 (GPT OSS):
${gptOutput}

---
Model 2 (Gemini):
${geminiOutput}

---
Model 3 (Llama):
${llamaOutput}

---
INSTRUCTIONS:
1. Identify the intent of the user's prompt.
2. If the user is asking a CODING or TECHNICAL question:
   - Synthesize the best parts of all 3 models into a single superior implementation.
   - Focus on Clean Code, Maintainability, Security, Performance, and Best Practices.
   - Combine the best logic, remove weaknesses, and explain the optimal solution clearly.
3. If the user is asking a GENERAL question or just chatting (e.g., "hello", "how are you"):
   - Do NOT write code. Do NOT apply software engineering principles (like SOLID).
   - Simply synthesize a polite, natural, and helpful conversational response combining the best elements of the 3 models.

Return ONLY your final synthesized response formatted nicely in Markdown.
`
};
