/**
 * Composant WordCard - Affiche les informations d'un mot du dictionnaire
 * Ce composant pr�sente de mani�re visuelle les donn�es d'un mot avec sa traduction
 * Version TypeScript avec typage strict des props
 */

import * as React from 'react';
import type { WordCardProps } from '../types';
import './WordCard.css';

/**
 * Composant pour afficher un mot avec sa traduction
 * @param props - Les propri�t�s typ�es du composant
 */
const WordCard: React.FC<WordCardProps> = ({ 
  word, 
  onEdit, 
  onDelete, 
  className = '' 
}) => {
  // Validation des donn�es pour �viter les erreurs d'affichage
  if (!word) {
    return (
      <div className={`word-card error ${className}`}>
        <p>Données du mot manquantes</p>
      </div>
    );
  }

  // Destructuration des propri�t�s du mot pour un code plus lisible
  const { id, sourceText, sourceLanguage, targetText, targetLanguage } = word;

  /**
   * Gestionnaire pour l'�dition du mot
   */
  const handleEdit = (): void => {
    if (onEdit) {
      onEdit(word);
    }
  };

  /**
   * Gestionnaire pour la suppression du mot
   */
  const handleDelete = (): void => {
    if (onDelete && id) {
      // Demande confirmation avant suppression
      const isConfirmed = window.confirm(
        `êtes-vous sûr de vouloir supprimer la traduction "${sourceText}" ? "${targetText}" ?`
      );
      
      if (isConfirmed) {
        onDelete(id);
      }
    }
  };

  return (
    <div className={`word-card ${className}`}>
      {/* Section du mot source */}
      <div className="word-section source">
        <div className="language-label">
          {sourceLanguage || 'Langue inconnue'}
        </div>
        <div className="word-text">
          {sourceText || 'Texte manquant'}
        </div>
      </div>

      {/* Fl�che de traduction */}
      <div className="translation-arrow">
        <span aria-label="Traduction" title="Traduction">→</span>
      </div>

      {/* Section du mot traduit */}
      <div className="word-section target">
        <div className="language-label">
          {targetLanguage || 'Langue inconnue'}
        </div>
        <div className="word-text">
          {targetText || 'Traduction manquante'}
        </div>
      </div>

      {/* Boutons d'action (si les callbacks sont fournis) */}
      {(onEdit || onDelete) && (
        <div className="word-actions">
          {onEdit && (
            <button
              type="button"
              onClick={handleEdit}
              className="action-button edit-button"
              title="Modifier ce mot"
              aria-label={`Modifier la traduction ${sourceText}`}
            >
              ✏️
            </button>
          )}
          
          {onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="action-button delete-button"
              title="Supprimer ce mot"
              aria-label={`Supprimer la traduction ${sourceText}`}
            >
              🗑️
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WordCard;