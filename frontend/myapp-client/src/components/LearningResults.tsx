/**
 * Composant LearningResults - Affiche les résultats après une session d'apprentissage
 */

import * as React from 'react';
import './LearningResults.css';

interface LearningResultsProps {
  score: number;
  totalWords: number;
  mode: 'copy' | 'quiz';
  onRestart: () => void;
  onExit: () => void;
}

const LearningResults: React.FC<LearningResultsProps> = ({ 
  score, 
  totalWords, 
  mode, 
  onRestart, 
  onExit 
}) => {
  const percentage = Math.round((score / totalWords) * 100);
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "🎉 Excellent !";
    if (percentage >= 70) return "👍 Bien joué !";
    if (percentage >= 50) return "🙂 Pas mal !";
    return "💪 Continue tes efforts !";
  };

  const getScoreColor = () => {
    if (percentage >= 70) return "#28a745";
    if (percentage >= 50) return "#ffc107";
    return "#dc3545";
  };

  return (
    <div className="learning-results-overlay">
      <div className="learning-results-modal">
        <h2>Résultats</h2>
        
        <div className="score-display">
          <div className="score-circle" style={{ borderColor: getScoreColor() }}>
            <span className="score-percentage" style={{ color: getScoreColor() }}>
              {percentage}%
            </span>
          </div>
          
          <div className="score-details">
            <p className="score-message">{getScoreMessage()}</p>
            <p className="score-breakdown">
              {score} bonnes réponses sur {totalWords} mots
            </p>
            <p className="mode-info">
              Mode : {mode === 'copy' ? 'Recopie' : 'Quiz'}
            </p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="restart-btn" onClick={onRestart}>
            Recommencer
          </button>
          <button className="exit-btn" onClick={onExit}>
            Retour à la liste
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningResults;