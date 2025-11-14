import * as React from 'react';
import { useState } from 'react';
import { WordService } from '../services/wordService';
import type { CreateWordRequest, SupportedLanguage } from '../types';
import './WordForm.css';

interface WordFormProps {
  onWordCreated?: () => void;
  onError?: (msg: string) => void;
}

const WordForm: React.FC<WordFormProps> = (props: WordFormProps) => {
  const { onWordCreated, onError } = props;
  const [form, setForm] = useState<CreateWordRequest>({
    sourceText: '',
    sourceLanguage: 'fr',
    targetText: '',
    targetLanguage: 'en',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const languages: SupportedLanguage[] = ['fr', 'en', 'es', 'de', 'it', 'pt'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await WordService.createWord(form);
      setSuccess(true);
      setForm({ ...form, sourceText: '', targetText: '' });
      if (onWordCreated) onWordCreated();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(msg);
      if (onError) onError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="word-form" onSubmit={handleSubmit}>
      <h3>Ajouter un mot</h3>
      <div>
        <label>Texte source</label>
        <input name="sourceText" value={form.sourceText} onChange={handleChange} required />
      </div>
      <div>
        <label>Langue source</label>
        <select name="sourceLanguage" value={form.sourceLanguage} onChange={handleChange}>
          {languages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label>Texte cible</label>
        <input name="targetText" value={form.targetText} onChange={handleChange} required />
      </div>
      <div>
        <label>Langue cible</label>
        <select name="targetLanguage" value={form.targetLanguage} onChange={handleChange}>
          {languages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <button type="submit" disabled={loading}>Créer</button>
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">Mot ajouté !</div>}
    </form>
  );
};

export default WordForm;
