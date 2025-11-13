/**
 * Types TypeScript pour l'application Dictionnaire
 * Ces interfaces d�finissent la structure des donn�es �chang�es avec l'API
 */

/**
 * Interface repr�sentant un mot dans le dictionnaire
 * Correspond au mod�le Word de l'API ASP.NET Core
 */
export interface Word {
  /** Identifiant unique du mot (MongoDB ObjectId ou GUID) */
  id: string;
  
  /** Le texte dans la langue source */
  sourceText: string;
  
  /** La langue source (ex: 'fr', 'en', 'es') */
  sourceLanguage: string;
  
  /** Le texte traduit dans la langue cible */
  targetText: string;
  
  /** La langue cible (ex: 'fr', 'en', 'es') */
  targetLanguage: string;
  
  /** Date de cr�ation (optionnelle, peut �tre ajout�e plus tard) */
  createdAt?: string;
  
  /** Date de derni�re modification (optionnelle) */
  updatedAt?: string;
}

/**
 * Interface pour cr�er un nouveau mot (sans ID)
 * Utilis�e lors de l'envoi de donn�es � l'API pour cr�ation
 */
export interface CreateWordRequest {
  sourceText: string;
  sourceLanguage: string;
  targetText: string;
  targetLanguage: string;
}

/**
 * Interface pour mettre � jour un mot existant
 * Tous les champs sont optionnels sauf l'ID
 */
export interface UpdateWordRequest {
  id: string;
  sourceText?: string;
  sourceLanguage?: string;
  targetText?: string;
  targetLanguage?: string;
}

/**
 * Interface pour les r�ponses d'erreur de l'API
 */
export interface ApiError {
  message: string;
  statusCode: number;
  details?: string;
}

/**
 * Type union pour les langues support�es
 * Peut �tre �tendu selon les besoins
 */
export type SupportedLanguage = 'fr' | 'en' | 'es' | 'de' | 'it' | 'pt';

/**
 * Interface pour les statistiques du dictionnaire
 */
export interface DictionaryStats {
  totalWords: number;
  languagePairs: Array<{
    sourceLanguage: string;
    targetLanguage: string;
    count: number;
  }>;
}

/**
 * �tats possibles pour les composants avec chargement
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Interface pour les props du composant WordCard
 */
export interface WordCardProps {
  word: Word;
  onEdit?: (word: Word) => void;
  onDelete?: (wordId: string) => void;
  className?: string;
}

/**
 * Interface pour les props du composant WordList
 */
export interface WordListProps {
  onWordSelect?: (word: Word) => void;
  searchFilter?: string;
  languageFilter?: SupportedLanguage;
  onWordsFiltered?: (words: Word[]) => void;
}

/**
 * Interface pour les paramtres de recherche
 */
export interface SearchParams {
  query?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  limit?: number;
  offset?: number;
}