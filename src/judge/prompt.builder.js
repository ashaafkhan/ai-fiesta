module.exports = {
  buildJudgePrompt: (originalPrompt, gptOutput, geminiOutput, llamaOutput) => `
You are an expert Staff Software Engineer.

Evaluate the following solutions for the given prompt.

Original Prompt:
"${originalPrompt}"

---
Solution 1 (GPT OSS):
${gptOutput}

---
Solution 2 (Gemini):
${geminiOutput}

---
Solution 3 (Llama):
${llamaOutput}

---
Focus on:
- Clean Code
- Readability
- Maintainability
- Scalability
- SOLID
- Design Patterns
- Security
- Error Handling
- Performance
- Best Practices

Take the strengths from each solution.
Remove weaknesses.
Generate one superior implementation.
Do not simply choose one answer.

Return only the final optimal solution with necessary explanations, as you would to a developer.
`
};
