import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { useTranslation } from 'react-i18next';
import { getUserBookings, Booking } from '../api';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, loading: authLoading, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getUserBookings();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pt-24 pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
          <div className="bg-primary p-8 text-white relative">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-1">
                {user.first_name} {user.last_name}
              </h1>
              <p className="opacity-80">@{user.username} • {user.email}</p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          </div>
          <div className="p-8 flex justify-between items-center border-t border-gray-50">
             <div>
               <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{t('account_status')}</h3>
               <p className="text-green-500 font-bold flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 {t('active_status')}
               </p>
             </div>
             <button 
               onClick={logout}
               className="text-red-500 font-bold hover:underline"
             >
               {t('logout_btn')}
             </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span className="p-2 bg-primary/10 rounded-lg text-primary">📋</span>
          {t('my_bookings')}
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <motion.div 
                key={booking.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{booking.tour_title}</h3>
                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                    <span>📅 {new Date(booking.date).toLocaleDateString()}</span>
                    <span>👥 {booking.guests} {t('guests_label')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tighter ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {t(`status_${booking.status}`)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{t('no_bookings_title')}</h3>
            <p className="text-gray-500 mb-6">{t('no_bookings_subtitle')}</p>
            <button 
              onClick={() => navigate('/')}
              className="text-primary font-bold hover:underline"
            >
              {t('browse_tours_btn')}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;
