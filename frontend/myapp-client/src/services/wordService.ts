/**
 * Service pour interagir avec l'API des mots
 * Ce service centralise toutes les requ�tes HTTP vers l'API backend
 * Version TypeScript avec typage fort
 */

import type { Word, CreateWordRequest, UpdateWordRequest, ApiError } from '../types';

// Configuration de l'URL de base de l'API
// En développement, l'API tourne généralement sur le port 7238 (HTTPS) ou 5238 (HTTP)
//const API_BASE_URL = 'https://localhost:5238/api';
export const API_BASE_URL = 'http://localhost:7239/api';

/**
 * Classe d'erreur personnalis�e pour les erreurs API
 */
class ApiException extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

/**
 * Service pour g�rer les mots du dictionnaire
 * Toutes les m�thodes sont statiques et typ�es avec TypeScript
 */
export class WordService {
  /**
   * M�thode utilitaire pour g�rer les r�ponses HTTP
   * @param response - La r�ponse fetch � traiter
   * @returns Les donn�es JSON typ�es
   * @throws {ApiException} Si la r�ponse n'est pas OK
   */
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorMessage = `Erreur HTTP: ${response.status} - ${response.statusText}`;
      
      try {
        // Tenter de parser le message d'erreur de l'API
        const errorData: ApiError = await response.json();
        throw new ApiException(errorData.message || errorMessage, response.status, response);
      } catch (parseError) {
        // Si on ne peut pas parser, utiliser le message g�n�rique
        throw new ApiException(errorMessage, response.status, response);
      }
    }

    // Parser et retourner les donn�es JSON typ�es
    return await response.json() as T;
  }

  /**
   * R�cup�re tous les mots du dictionnaire
   * @returns {Promise<Word[]>} Liste typ�e des mots
   * @throws {ApiException} Si la requ�te �choue
   */
  static async getAllWords(): Promise<Word[]> {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_BASE_URL}/word`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
      });
      return await this.handleResponse<Word[]>(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des mots:', error);
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Impossible de récupérer les mots: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        0
      );
    }
  }

  /**
   * R�cup�re un mot par son ID
   * @param {string} id - L'identifiant du mot
   * @returns {Promise<Word>} Le mot trouv�
   * @throws {ApiException} Si le mot n'existe pas ou si la requ�te �choue
   */
  static async getWordById(id: string): Promise<Word> {
    if (!id || id.trim() === '') {
      throw new ApiException('L\'identifiant du mot est requis', 400);
    }
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_BASE_URL}/word/${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
      });
      return await this.handleResponse<Word>(response);
    } catch (error) {
      console.error(`Erreur lors de la récupération du mot ${id}:`, error);
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Impossible de récupérer le mot: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        0
      );
    }
  }

  /**
   * Cr�e un nouveau mot
   * @param {CreateWordRequest} wordData - Les donn�es du mot � cr�er
   * @returns {Promise<Word>} Le mot cr�� avec son ID
   * @throws {ApiException} Si les donn�es sont invalides ou si la cr�ation �choue
   */
  static async createWord(wordData: CreateWordRequest): Promise<Word> {
    // Validation c�t� client
    if (!wordData.sourceText?.trim()) {
      throw new ApiException('Le texte source est requis', 400);
    }
    if (!wordData.sourceLanguage?.trim()) {
      throw new ApiException('La langue source est requise', 400);
    }
    if (!wordData.targetText?.trim()) {
      throw new ApiException('Le texte cible est requis', 400);
    }
    if (!wordData.targetLanguage?.trim()) {
      throw new ApiException('La langue cible est requise', 400);
    }
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_BASE_URL}/word`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(wordData),
      });
      return await this.handleResponse<Word>(response);
    } catch (error) {
      console.error('Erreur lors de la création du mot:', error);
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Impossible de créer le mot: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        0
      );
    }
  }

  /**
   * Met � jour un mot existant
   * @param {UpdateWordRequest} wordData - Les donn�es � mettre � jour
   * @returns {Promise<Word>} Le mot mis � jour
   * @throws {ApiException} Si la mise � jour �choue
   */
  static async updateWord(wordData: UpdateWordRequest): Promise<Word> {
    if (!wordData.id?.trim()) {
      throw new ApiException('L\'identifiant du mot est requis', 400);
    }
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_BASE_URL}/word/${encodeURIComponent(wordData.id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(wordData),
      });
      return await this.handleResponse<Word>(response);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot:', error);
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Impossible de mettre à jour le mot: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        0
      );
    }
  }

  /**
   * Supprime un mot
   * @param {string} id - L'identifiant du mot � supprimer
   * @returns {Promise<void>}
   * @throws {ApiException} Si la suppression �choue
   */
  static async deleteWord(id: string): Promise<void> {
    if (!id?.trim()) {
      throw new ApiException('L\'identifiant du mot est requis', 400);
    }
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_BASE_URL}/word/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
      });
      if (!response.ok) {
        throw new ApiException(`Erreur HTTP: ${response.status}`, response.status, response);
      }
    } catch (error) {
      console.error(`Erreur lors de la suppression du mot ${id}:`, error);
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Impossible de supprimer le mot: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        0
      );
    }
  }
}