/**
 * Composant QuizMode - Mode d'apprentissage par quiz à choix multiple
 */

import * as React from 'react';
import { useState, useEffect } from 'react';
import type { Word } from '../types';
import './QuizMode.css';

interface QuizModeProps {
  words: Word[];
  onComplete: (score: number, totalWords: number) => void;
  onExit: () => void;
}

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

const QuizMode: React.FC<QuizModeProps> = ({ words, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  // Génère les options de réponse pour le mot actuel
  useEffect(() => {
    if (!currentWord) return;

    const correctAnswer = currentWord.targetText;
    const wrongAnswers = words
      .filter(w => w.id !== currentWord.id && w.targetLanguage === currentWord.targetLanguage)
      .map(w => w.targetText)
      .slice(0, 3);

    // Si pas assez de mauvaises réponses, en générer quelques-unes
    while (wrongAnswers.length < 3) {
      wrongAnswers.push(`Réponse ${wrongAnswers.length + 1}`);
    }

    const allOptions: QuizOption[] = [
      { text: correctAnswer, isCorrect: true },
      ...wrongAnswers.map(text => ({ text, isCorrect: false }))
    ];

    // Mélange les options
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
    setSelectedOption(null);
    setShowAnswer(false);
  }, [currentIndex, currentWord, words]);

  const handleOptionClick = (index: number) => {
    if (showAnswer) return;
    setSelectedOption(index);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    const isCorrect = options[selectedOption].isCorrect;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(score, words.length);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="quiz-mode-container">
      <div className="quiz-mode-header">
        <h2>Mode Quiz</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{currentIndex + 1} / {words.length}</span>
        <button className="exit-btn" onClick={onExit}>×</button>
      </div>

      <div className="quiz-mode-content">
        <div className="question-section">
          <div className="source-word">
            <span className="language-badge">{currentWord.sourceLanguage}</span>
            <h3>{currentWord.sourceText}</h3>
          </div>
          <p>Quelle est la traduction de ce mot ?</p>
        </div>

        <div className="options-section">
          {options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedOption === index ? 'selected' : ''} 
                         ${showAnswer ? (option.isCorrect ? 'correct' : selectedOption === index ? 'incorrect' : '') : ''}`}
              onClick={() => handleOptionClick(index)}
              disabled={showAnswer}
            >
              {option.text}
            </button>
          ))}
        </div>

        <div className="action-buttons">
          {!showAnswer ? (
            <button 
              className="check-btn" 
              onClick={checkAnswer} 
              disabled={selectedOption === null}
            >
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

export default QuizMode;