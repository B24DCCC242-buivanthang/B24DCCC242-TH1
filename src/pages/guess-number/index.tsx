import React, { useState } from 'react';
import { useGameStore } from './gameStore';
import { getMessage } from './handle';

const GuessNumberPage: React.FC = () => {
  const { history, feedback, isGameOver, attemptsLeft, makeGuess, resetGame, targetNumber } = useGameStore();
  const [inputValue, setInputValue] = useState<string>("");

  // Xử lý chia lịch sử  và sắp xếp
  const lowGuesses = history
    .filter(num => num < targetNumber)
    .sort((a, b) => a - b); 
  // số > đoán
  const highGuesses = history
    .filter(num => num > targetNumber)
    .sort((a, b) => b - a); 
  // số < đoán
  const handleGuess = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num) && num >= 1 && num <= 100) {
      makeGuess(num);
      setInputValue("");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1> Trò chơi: Đoán số</h1>
        <p>Phạm vi: 1 - 100 | Lượt còn lại: <strong style={{ color: 'red' }}>{attemptsLeft}</strong></p>

        <input 
          type="number" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
          disabled={isGameOver}
          style={{ padding: '10px', fontSize: '16px', width: '80px', textAlign: 'center' }}
        />
        <button onClick={handleGuess} disabled={isGameOver} style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}>
          Đoán
        </button>

        <h3 style={{ color: feedback === 'correct' ? '#2ecc71' : '#e74c3c', minHeight: '1.5em' }}>
          {getMessage(feedback, targetNumber)}
        </h3>

        {isGameOver && <button onClick={resetGame} style={{ padding: '10px 30px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Chơi lại</button>}
      </div>

      {/* bảng lịch sử đoán */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {/* Cột Thấp hơn */}
        <div style={{ flex: 1, border: '2px solid #3498db', borderRadius: '10px', padding: '15px', backgroundColor: '#ebf5fb' }}>
          <h4 style={{ color: '#2980b9', marginTop: 0, textAlign: 'center' }}> Cao hơn </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {lowGuesses.map((num, i) => (
              <span key={i} style={{ padding: '5px 10px', backgroundColor: '#fff', border: '1px solid #3498db', borderRadius: '4px', fontWeight: i === lowGuesses.length - 1 ? 'bold' : 'normal' }}>
                {num}
              </span>
            ))}
          </div>
          
        </div>

        {/* Cột Cao hơn */}
        <div style={{ flex: 1, border: '2px solid #e67e22', borderRadius: '10px', padding: '15px', backgroundColor: '#fef5e7' }}>
          <h4 style={{ color: '#d35400', marginTop: 0, textAlign: 'center' }}>Thấp hơn</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {highGuesses.map((num, i) => (
              <span key={i} style={{ padding: '5px 10px', backgroundColor: '#fff', border: '1px solid #e67e22', borderRadius: '4px', fontWeight: i === highGuesses.length - 1 ? 'bold' : 'normal' }}>
                {num}
              </span>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default GuessNumberPage;