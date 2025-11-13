/**
 * Composant WordList - Affiche la liste compl�te des mots du dictionnaire
 * Ce composant g�re le chargement des donn�es, les �tats de loading/erreur,
 * et l'affichage de tous les mots sous forme de cartes
 * Version TypeScript avec typage strict
 */

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import WordCard from './WordCard';
import { WordService } from '../services/wordService';
import type { Word, LoadingState, WordListProps } from '../types';
import './WordList.css';

/**
 * Composant principal pour afficher la liste des mots
 */
const WordList: React.FC<WordListProps> = ({
  onWordSelect,
  searchFilter,
  languageFilter,
  onWordsFiltered
}: WordListProps) => {
  // �tats du composant avec typage TypeScript
  const [words, setWords] = useState<Word[]>([]); // Liste des mots typ�e
  const [loadingState, setLoadingState] = useState<LoadingState>('idle'); // �tat de chargement typ�
  const [error, setError] = useState<string | null>(null); // état d'erreur

  /**
   * Fonction pour charger les mots depuis l'API
   * useCallback pour �viter les re-renders inutiles
   */
  const loadWords = useCallback(async (): Promise<void> => {
    try {
      setLoadingState('loading'); // �tat de chargement
      setError(null); // R�initialise les erreurs pr�c�dentes
      
      // Appel au service pour r�cup�rer les mots
      const fetchedWords: Word[] = await WordService.getAllWords();
      
      // Met � jour l'�tat avec les donn�es r�cup�r�es
      setWords(fetchedWords);
      setLoadingState('success');
      
    } catch (err) {
      // Gestion d'erreur typ�e
      console.error('Erreur lors du chargement des mots:', err);
      
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Une erreur est survenue lors du chargement des mots.';
        
      setError(errorMessage);
      setLoadingState('error');
    }
  }, []);

  /**
   * Hook useEffect pour charger les donn�es au montage du composant
   */
  useEffect(() => {
    loadWords();
  }, [loadWords]);

  /**
   * Gestionnaire pour la s�lection d'un mot
   */
  const handleWordSelect = useCallback((word: Word): void => {
    if (onWordSelect) {
      onWordSelect(word);
    }
  }, [onWordSelect]);

  /**
   * Gestionnaire pour l'�dition d'un mot
   */
  const handleWordEdit = useCallback((word: Word): void => {
    console.log('Edition du mot:', word);
    // TODO: Impl�menter la logique d'�dition
    // Peut ouvrir un modal ou naviguer vers une page d'�dition
    handleWordSelect(word);
  }, [handleWordSelect]);

  /**
   * Gestionnaire pour la suppression d'un mot
   */
  const handleWordDelete = useCallback(async (wordId: string): Promise<void> => {
    try {
      setLoadingState('loading');
      
      // Appel API pour supprimer le mot
      await WordService.deleteWord(wordId);
      
      // Mise � jour de l'�tat local pour supprimer le mot de la liste
      setWords(prevWords => prevWords.filter(word => word.id !== wordId));
      setLoadingState('success');
      
      console.log(`Mot ${wordId} supprimé avec succés`);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Erreur lors de la suppression du mot.';
        
      setError(errorMessage);
      setLoadingState('error');
      
      // Recharger la liste en cas d'erreur pour s'assurer de la coh�rence
      setTimeout(() => loadWords(), 2000);
    }
  }, [loadWords]);

  /**
   * Fonction pour filtrer les mots selon les crit�res
   */
  const filteredWords = React.useMemo((): Word[] => {
    let filtered = words;

    // Filtre par texte de recherche
    if (searchFilter && searchFilter.trim() !== '') {
      const searchLower = searchFilter.toLowerCase();
      filtered = filtered.filter(word =>
        word.sourceText.toLowerCase().includes(searchLower) ||
        word.targetText.toLowerCase().includes(searchLower)
      );
    }

    // Filtre par langue
    if (languageFilter) {
      filtered = filtered.filter(word =>
        word.sourceLanguage === languageFilter ||
        word.targetLanguage === languageFilter
      );
    }

    return filtered;
  }, [words, searchFilter, languageFilter]);

  // Transmet la liste filtrée à App.tsx
  React.useEffect(() => {
    if (typeof onWordsFiltered === 'function') {
      onWordsFiltered(filteredWords);
    }
  }, [filteredWords, onWordsFiltered]);

  // Rendu conditionnel : affichage pendant le chargement
  if (loadingState === 'loading') {
    return (
      <div className="word-list-container">
        <div className="loading-state">
          <div className="spinner" role="status" aria-label="Chargement"></div>
          <p>Chargement des mots...</p>
        </div>
      </div>
    );
  }

  // Rendu conditionnel : affichage en cas d'erreur
  if (loadingState === 'error' && error) {
    return (
      <div className="word-list-container">
        <div className="error-state">
          <h3>? Erreur</h3>
          <p>{error}</p>
          <button 
            onClick={loadWords} 
            className="retry-button"
            type="button"
          >
            ?? R�essayer
          </button>
        </div>
      </div>
    );
  }

  // Rendu conditionnel : liste vide
  if (filteredWords.length === 0 && words.length === 0) {
    return (
      <div className="word-list-container">
        <div className="empty-state">
          <h3>📭 Aucun mot trouvé</h3>
          <p>Le dictionnaire est vide pour le moment.</p>
            <button 
            onClick={loadWords} 
            className="refresh-button"
            type="button"
            >
            🔄 Actualiser la liste
            </button>
        </div>
      </div>
    );
  }

  // Rendu conditionnel : pas de résultats pour les filtres
  if (filteredWords.length === 0 && words.length > 0) {
    return (
      <div className="word-list-container">
        <div className="empty-state">
          <h3> Aucun résultat</h3>
          <p>Aucun mot ne correspond à vos critères de recherche.</p>
          <button 
            onClick={loadWords} 
            className="refresh-button"
            type="button"
          >
            ?? Actualiser
          </button>
        </div>
      </div>
    );
  }

  // Rendu principal : affichage de la liste des mots
  return (
    <div className="word-list-container">
      {/* En-tête avec titre et statistiques */}
      <div className="word-list-header">
        <h2> Dictionnaire Multilingue</h2>
        <div className="word-stats">
          <span className="word-count">
            {filteredWords.length} mot{filteredWords.length > 1 ? 's' : ''} 
            {filteredWords.length !== words.length && (
              <span className="filter-info"> sur {words.length}</span>
            )}
          </span>
            <button 
            onClick={loadWords} 
            className="refresh-button" 
            title="Actualiser la liste"
            type="button"
            >
            🔄 
            </button>
        </div>
      </div>

      {/* Liste des mots */}
      <div className="word-list">
        {filteredWords.map((word: Word) => (
          <WordCard 
            key={word.id} 
            word={word}
            onEdit={handleWordEdit}
            onDelete={handleWordDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default WordList;