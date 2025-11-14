
import * as React from 'react';
const { useState } = React;
import { API_BASE_URL } from '../services/wordService';

interface LoginFormProps {
  onLoginSuccess?: (token: string) => void;
  onError?: (msg: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL.replace(/\/api$/, '')}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error('Erreur lors de la connexion (réponse non JSON)');
      }
      if (!response.ok || !data.token) {
        throw new Error(data.message || 'Erreur lors de la connexion');
      }
      localStorage.setItem('jwt', data.token);
      if (onLoginSuccess) onLoginSuccess(data.token);
    } catch (err: any) {
      setError(err.message);
      if (onError) onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
      <h3>Connexion</h3>
      <div>
        <label>Nom d’utilisateur</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      </div>
      <div>
        <label>Mot de passe</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      </div>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem',background: '#0056b3', /*background: '#28a745'*/ color: '#fff', border: 'none', borderRadius: 6 }}>Se connecter</button>
      {error && <div style={{ color: '#dc3545', marginTop: '1rem' }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
