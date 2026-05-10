import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/profile');
    } catch (err) {
      setError(t('login_error') || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('login_title')}</h2>
        <p className="text-gray-500 text-center mb-8">{t('login_subtitle')}</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('username')}</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white py-3 rounded-xl font-bold transition shadow-lg shadow-primary/20 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'}`}
          >
            {loading ? t('loading') : t('login_btn')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          {t('no_account')} {' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            {t('register_link')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
