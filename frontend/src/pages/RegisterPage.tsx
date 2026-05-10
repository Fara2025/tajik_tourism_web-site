import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { register } from '../api';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      // После регистрации сразу логиним
      await login(formData.username, formData.password);
      navigate('/profile');
    } catch (err) {
      setError(t('register_error') || 'Registration failed. Try another username.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-24 pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('register_title')}</h2>
        <p className="text-gray-500 text-center mb-8">{t('register_subtitle')}</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">{t('first_name')}</label>
              <input 
                type="text" 
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">{t('last_name')}</label>
              <input 
                type="text" 
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">{t('username')}</label>
            <input 
              type="text" 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">{t('email')}</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">{t('password')}</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white py-3 rounded-xl font-bold transition shadow-lg shadow-primary/20 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'}`}
          >
            {loading ? t('loading') : t('register_btn')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {t('have_account')} {' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            {t('login_link')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
