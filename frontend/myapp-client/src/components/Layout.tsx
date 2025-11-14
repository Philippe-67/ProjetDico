import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  onHomeClick?: () => void;
  onLearningClick?: () => void;
  onLogoutClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated, onHomeClick, onLearningClick, onLogoutClick }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (onLogoutClick) onLogoutClick();
    navigate('/login');
  };
  return (
    <>
      <header className="app-header">
        <div className="container">
          <h1>📚 Mon Dictionnaire</h1>
          <nav className="app-nav">
            {isAuthenticated ? (
              <>
                <Link to="/" onClick={onHomeClick}>liste des mots</Link>
                <Link to="/apprentissage" onClick={onLearningClick}>Apprentissage</Link>
                <Link to="/ajouter-mot" style={{ color: '#f9f9faff', textDecoration: 'none', marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Ajouter un mot</Link>
                <button className="logout-link" onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#f9fbfcff', cursor: 'pointer', padding: 0, marginLeft: '1rem' }}>Déconnexion</button>
              </>
            ) : (
              <Link to="/login" style={{ color: '#f9f9faff', textDecoration: 'none', marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Connexion</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2024 Mon Dictionnaire - Application de traduction multilingue</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
