/**
 * Composant CopyMode - Mode d'apprentissage par recopie
 */

import * as React from 'react';
import { useState } from 'react';
import type { Word } from '../types';
import './CopyMode.css';

interface CopyModeProps {
  words: Word[];
  onComplete: (score: number, totalWords: number) => void;
  onExit: () => void;
}

const CopyMode: React.FC<CopyModeProps> = ({ words, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  const checkAnswer = () => {
    const isCorrect = userInput.toLowerCase().trim() === currentWord.targetText.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setFeedback(null);
      setShowAnswer(false);
    } else {
      onComplete(score, words.length);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="copy-mode-container">
      <div className="copy-mode-header">
        <h2>Mode Recopie</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{currentIndex + 1} / {words.length}</span>
        <button className="exit-btn" onClick={onExit}>×</button>
      </div>

      <div className="copy-mode-content">
        <div className="word-display">
          <div className="source-word">
            <span className="language-badge">{currentWord.sourceLanguage}</span>
            <h3>{currentWord.sourceText}</h3>
          </div>
        </div>

        <div className="input-section">
          <label>Tapez la traduction :</label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={showAnswer}
            placeholder="Votre réponse..."
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && !showAnswer && checkAnswer()}
          />
        </div>

        {feedback && (
          <div className={`feedback ${feedback}`}>
            {feedback === 'correct' ? '✓ Correct !' : '✗ Incorrect'}
            {showAnswer && (
              <div className="correct-answer">
                Réponse correcte : <strong>{currentWord.targetText}</strong>
              </div>
            )}
          </div>
        )}

        <div className="action-buttons">
          {!showAnswer ? (
            <button className="check-btn" onClick={checkAnswer} disabled={!userInput.trim()}>
              Vérifier
            </button>
          ) : (
            <button className="next-btn" onClick={nextWord}>
              {currentIndex < words.length - 1 ? 'Suivant' : 'Terminer'}
            </button>
          )}
        </div>

        <div className="score">Score : {score} / {currentIndex + (showAnswer ? 1 : 0)}</div>
      </div>
    </div>
  );
};

export default CopyMode;