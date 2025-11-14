/**
 * Composant principal de l'application Dictionnaire Multilingue
 * Ce composant sert de point d'entr�e et organise l'interface utilisateur
 * Version TypeScript
 */

import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Layout from './components/Layout';
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

  const handleModeSelect = async (mode: LearningModeType) => {
    setLearningMode(mode);
    // Charger les mots depuis filteredWords s'ils existent, sinon depuis l'API
    if (filteredWords.length > 0) {
      setWordsForLearning(filteredWords);
    } else {
      // Si pas de mots filtrés, utiliser tous les mots de l'utilisateur
      try {
        const { WordService } = await import('./services/wordService');
        const allWords = await WordService.getAllWords();
        setWordsForLearning(allWords);
      } catch (error) {
        showNotification('Erreur lors du chargement des mots', 'error');
        return;
      }
    }
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
    // Rediriger vers la page d'accueil
    window.location.href = '/';
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
    setShowLogin(true);
    showNotification('Déconnexion réussie', 'success');
  };

  const handleHomeNavigation = () => {
    setAppState('list');
    setLearningMode(null);
    setLearningResults(null);
  };

  const handleLearningNavigation = () => {
    setAppState('modeSelection');
    setLearningMode(null);
    setLearningResults(null);
  };

  const renderContent = () => {
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
        return null;
      case 'results':
        return learningResults ? (
          <LearningResults
            score={learningResults.score}
            totalWords={learningResults.total}
            mode={learningMode || 'copy'}
            onRestart={handleRestartLearning}
            onExit={handleExitLearning}
          />
        ) : null;
      default:
        return (
          <>
            {/* <WordForm
              onWordCreated={handleWordCreated as () => void}
              onError={showNotification as (msg: string, type?: 'success' | 'error') => void}
            /> */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Rechercher un mot ou une traduction..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ccc' }}
              />
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
    <BrowserRouter>
      <div className="app">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated
                ? <Navigate to="/" replace />
                : (
                  <Layout isAuthenticated={false}>
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
                  </Layout>
                )
            }
          />
          <Route
            path="/apprentissage"
            element={
              isAuthenticated
                ? (
                  <Layout 
                    isAuthenticated={true}
                    onHomeClick={handleHomeNavigation}
                    onLearningClick={handleLearningNavigation}
                    onLogoutClick={handleLogout}
                  >
                    {appState === 'learning' && learningMode === 'copy' && wordsForLearning.length > 0 ? (
                      <CopyMode
                        words={wordsForLearning}
                        onComplete={handleLearningComplete}
                        onExit={handleExitLearning}
                      />
                    ) : appState === 'learning' && learningMode === 'quiz' && wordsForLearning.length > 0 ? (
                      <QuizMode
                        words={wordsForLearning}
                        onComplete={handleLearningComplete}
                        onExit={handleExitLearning}
                      />
                    ) : appState === 'results' && learningResults ? (
                      <LearningResults
                        score={learningResults.score}
                        totalWords={learningResults.total}
                        mode={learningMode || 'copy'}
                        onRestart={handleRestartLearning}
                        onExit={handleExitLearning}
                      />
                    ) : appState === 'learning' && wordsForLearning.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Chargement des mots...</p>
                      </div>
                    ) : (
                      <LearningModeSelector
                        onModeSelect={handleModeSelect}
                        onClose={handleExitLearning}
                      />
                    )}
                  </Layout>
                )
                : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated
                ? (
                  <Layout 
                    isAuthenticated={true}
                    onHomeClick={handleHomeNavigation}
                    onLearningClick={handleLearningNavigation}
                    onLogoutClick={handleLogout}
                  >
                    {appState === 'list' && (
                      <>
                        <div style={{ textAlign: 'right', padding: '1rem 2rem 0 0' }}>
                          {/* Le bouton Déconnexion est maintenant dans la nav */}
                        </div>
                      </>
                    )}
                    <main className="app-main">
                      {renderContent()}
                    </main>
                  </Layout>
                )
                : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/ajouter-mot"
            element={
              isAuthenticated
                ? (
                  <Layout 
                    isAuthenticated={true}
                    onHomeClick={handleHomeNavigation}
                    onLearningClick={handleLearningNavigation}
                    onLogoutClick={handleLogout}
                  >
                    <WordForm
                      onWordCreated={handleWordCreated as () => void}
                      onError={showNotification as (msg: string, type?: 'success' | 'error') => void}
                    />
                  </Layout>
                )
                : <Navigate to="/login" replace />
            }
          />

          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;