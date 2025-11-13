/**
 * Composant principal de l'application Dictionnaire Multilingue
 * Ce composant sert de point d'entr�e et organise l'interface utilisateur
 * Version TypeScript
 */

import * as React from 'react';
import { useState } from 'react';
import WordList from './components/WordList';
import WordForm from './components/WordForm';
import Notification from './components/Notification';
import LearningModeSelector from './components/LearningModeSelector';
import CopyMode from './components/CopyMode';
import QuizMode from './components/QuizMode';
import LearningResults from './components/LearningResults';
import type { Word } from './types';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import './AppStyles.css';

type LearningModeType = 'copy' | 'quiz' | null;
type AppState = 'list' | 'modeSelection' | 'learning' | 'results';

/**
 * Composant principal de l'application
 */
const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('jwt'));
    const [showLogin, setShowLogin] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type?: 'success' | 'error' } | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [appState, setAppState] = useState<AppState>('list');
  const [learningMode, setLearningMode] = useState<LearningModeType>(null);
  const [wordsForLearning, setWordsForLearning] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [learningResults, setLearningResults] = useState<{ score: number; total: number } | null>(null);

  const showNotification = (message: string, type?: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleWordSelect = (word: Word): void => {
    console.log('Mot sélectionné:', word);
    // TODO: Implémenter la logique de sélection
  };

  const handleWordCreated = () => {
    showNotification('Mot ajouté avec succès !', 'success');
    setRefreshFlag(f => f + 1);
  };

  const handleStartLearning = (words: Word[]) => {
    if (words.length === 0) {
      showNotification('Aucun mot à apprendre !', 'error');
      return;
    }
    setWordsForLearning(words);
    setAppState('modeSelection');
  };

  const handleModeSelect = (mode: LearningModeType) => {
    setLearningMode(mode);
    setAppState('learning');
  };

  const handleLearningComplete = (score: number, totalWords: number) => {
    setLearningResults({ score, total: totalWords });
    setAppState('results');
  };

  const handleRestartLearning = () => {
    setAppState('modeSelection');
  };

  const handleExitLearning = () => {
    setAppState('list');
    setLearningMode(null);
    setWordsForLearning([]);
    setLearningResults(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
    setShowLogin(true);
    showNotification('Déconnexion réussie', 'success');
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div style={{ maxWidth: 500, margin: '2rem auto' }}>
          {showLogin ? (
            <>
              <LoginForm
                onLoginSuccess={() => { setIsAuthenticated(true); }}
                onError={msg => showNotification(msg, 'error')}
              />
              <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Pas encore de compte ?{' '}
                <button type="button" style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowLogin(false)}>S'inscrire</button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm
                onRegisterSuccess={() => { setShowLogin(true); showNotification('Inscription réussie, connectez-vous !', 'success'); }}
                onError={msg => showNotification(msg, 'error')}
              />
              <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Déjà inscrit ?{' '}
                <button type="button" style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowLogin(true)}>Se connecter</button>
              </p>
            </>
          )}
        </div>
      );
    }
    switch (appState) {
      case 'modeSelection':
        return (
          <LearningModeSelector
            onModeSelect={handleModeSelect}
            onClose={handleExitLearning}
          />
        );
      
      case 'learning':
        if (learningMode === 'copy') {
          return (
            <CopyMode
              words={wordsForLearning}
              onComplete={handleLearningComplete}
              onExit={handleExitLearning}
            />
          );
        } else if (learningMode === 'quiz') {
          return (
            <QuizMode
              words={wordsForLearning}
              onComplete={handleLearningComplete}
              onExit={handleExitLearning}
            />
          );
        }
        break;
      
      case 'results':
        return learningResults && (
          <LearningResults
            score={learningResults.score}
            totalWords={learningResults.total}
            mode={learningMode || 'copy'}
            onRestart={handleRestartLearning}
            onExit={handleExitLearning}
          />
        );
      
      default:
        return (
          <>
            <WordForm
              onWordCreated={handleWordCreated as () => void}
              onError={showNotification as (msg: string, type?: 'success' | 'error') => void}
            />
            <div className="search-bar">
              <input
                type="text"
                placeholder="Rechercher un mot ou une traduction..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
            <div className="learning-button-container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <button 
                className="learning-start-btn"
                onClick={() => handleStartLearning(filteredWords)}
                style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 2rem', 
                  borderRadius: '8px', 
                  fontSize: '1.1rem', 
                  cursor: 'pointer' 
                }}
              >
                🧠 Commencer l'apprentissage
              </button>
            </div>
            <WordList
              onWordSelect={handleWordSelect as (word: Word) => void}
              key={refreshFlag}
              searchFilter={searchTerm}
              onWordsFiltered={setFilteredWords}
            />
          </>
        );
    }
  };

  return (
    <div className="app">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {appState === 'list' && isAuthenticated && (
        <div style={{ textAlign: 'right', padding: '1rem 2rem 0 0' }}>
          <button onClick={handleLogout} style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>Déconnexion</button>
        </div>
      )}
      {appState === 'list' && (
        <>
          <header className="app-header">
            <div className="container">
              <h1>📚 Mon Dictionnaire</h1>
              <p>Explorez et gérez vos traductions multilingues</p>
            </div>
          </header>
          <footer className="app-footer">
            <div className="container">
              <p>&copy; 2024 Mon Dictionnaire - Application de traduction multilingue</p>
            </div>
          </footer>
        </>
      )}
      <main className="app-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;