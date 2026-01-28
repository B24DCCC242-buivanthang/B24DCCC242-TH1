import { useState } from 'react';
import { generateRandomNumber, Feedback } from './handle';

export const useGameStore = () => {
	const [targetNumber, setTargetNumber] = useState<number>(generateRandomNumber());
	const [history, setHistory] = useState<number[]>([]);
	const [feedback, setFeedback] = useState<Feedback>('');
	const [isGameOver, setIsGameOver] = useState<boolean>(false);

	const maxAttempts = 10;

	// hàm kiểm tra đoán số
	const makeGuess = (guess: number) => {
		if (isGameOver || history.includes(guess)) return;

		const newHistory = [...history, guess];
		setHistory(newHistory);
		// hàm tạo lịch sử đoán

		if (guess === targetNumber) {
			setFeedback('correct');
			setIsGameOver(true);
		} else if (newHistory.length >= maxAttempts) {
			setFeedback('out_of_turns');
			setIsGameOver(true);
		} else {
			setFeedback(guess < targetNumber ? 'low' : 'high');
		}
	};

	// hàm reset game
	const resetGame = () => {
		setTargetNumber(generateRandomNumber());
		setHistory([]);
		setFeedback('');
		setIsGameOver(false);
	};

	return {
		targetNumber,
		history,
		feedback,
		isGameOver,
		attemptsLeft: maxAttempts - history.length,
		makeGuess,
		resetGame,
	};
};
