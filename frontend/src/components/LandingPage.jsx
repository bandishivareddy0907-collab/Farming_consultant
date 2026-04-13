import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-8">
            {t('welcome')}
          </h1>
          
          <p className="text-xl text-green-700 mb-12">
            Smart agricultural solutions for modern farmers
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* New Farmer Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('newFarmer')}</h2>
                <p className="text-gray-600 mb-6">
                  Register as a new farmer to get started with our agricultural advisory services
                </p>
                <button 
                  onClick={() => navigate('/register')}
                  className="btn btn-primary w-full py-3 text-lg"
                >
                  {t('register')}
                </button>
              </div>
            </div>
            
            {/* Existing Farmer Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('existingFarmer')}</h2>
                <p className="text-gray-600 mb-6">
                  Login to access your existing farming records and research results
                </p>
                <button 
                  onClick={() => navigate('/login')}
                  className="btn btn-primary w-full py-3 text-lg"
                >
                  {t('login')}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">
                Get personalized crop recommendations based on live agricultural data
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;