export type Feedback = "low" | "high" | "correct" | "out_of_turns" | "";

export const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 100) + 1;
};

export const getMessage = (
  feedback: Feedback,
  target?: number
): string => {
  switch (feedback) {
    case "low":
      return "Số cao hơn!";
    case "high":
      return "Số phải thấp hơn!";
    case "correct":
      return "Bingo!";
    case "out_of_turns":
      return `Gà! Số đúng là [${target}].`;
    default:
      return "Nhập một số từ 1 đến 100";
  }
};
