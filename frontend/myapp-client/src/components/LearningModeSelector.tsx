/**
 * Composant LearningMode - Interface pour choisir le mode d'apprentissage
 */

import * as React from 'react';
import './LearningMode.css';

export type LearningModeType = 'copy' | 'quiz' | null;

interface LearningModeProps {
  onModeSelect: (mode: LearningModeType) => void;
  onClose: () => void;
}

const LearningModeSelector: React.FC<LearningModeProps> = ({ onModeSelect, onClose }) => {
  return (
    <div className="learning-mode-overlay">
      <div className="learning-mode-modal">
        <h2>Choisissez votre mode d'apprentissage</h2>
        
        <div className="mode-options">
          <div className="mode-card" onClick={() => onModeSelect('copy')}>
            <div className="mode-icon">✍️</div>
            <h3>Mode Recopie</h3>
            <p>Tapez la traduction du mot affiché</p>
          </div>
          
          <div className="mode-card" onClick={() => onModeSelect('quiz')}>
            <div className="mode-icon">🧠</div>
            <h3>Mode Quiz</h3>
            <p>Choisissez la bonne traduction parmi les options</p>
          </div>
        </div>
        
        <button className="close-btn" onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
};

export default LearningModeSelector;