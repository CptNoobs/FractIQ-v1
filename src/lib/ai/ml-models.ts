// Basic implementation without ML
export const mlModels = {
  analyzeSentiment: async () => ({ sentiment: "neutral", confidence: 75 }),
  predictPattern: async () => ({ pattern: "unknown", probability: 75 }),
  predictNextMove: async () => ({ direction: "neutral", probability: 75 }),
};
