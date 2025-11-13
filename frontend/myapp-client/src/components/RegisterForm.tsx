
import * as React from 'react';
import { useState } from 'react';
import { API_BASE_URL } from '../services/wordService';

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
  onError?: (msg: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(`${API_BASE_URL.replace(/\/api$/, '')}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors de l’inscription');
      }
      setSuccess(true);
      setUsername('');
      setPassword('');
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err: any) {
      setError(err.message);
      if (onError) onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
      <h3>Inscription</h3>
      <div>
        <label>Nom d’utilisateur</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      </div>
      <div>
        <label>Mot de passe</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      </div>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: 6 }}>S’inscrire</button>
      {error && <div style={{ color: '#dc3545', marginTop: '1rem' }}>{error}</div>}
      {success && <div style={{ color: '#28a745', marginTop: '1rem' }}>Inscription réussie !</div>}
    </form>
  );
};

export default RegisterForm;
