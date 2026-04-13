import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [farmerName, setFarmerName] = useState('');

  useEffect(() => {
    // Check if farmer is logged in
    const farmerId = localStorage.getItem('farmerId');
    const name = localStorage.getItem('farmerName');
    
    if (!farmerId) {
      navigate('/login');
      return;
    }
    
    setFarmerName(name || 'Farmer');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('farmerId');
    localStorage.removeItem('farmerName');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-green-800">Farmer Dashboard</h1>
              <p className="text-gray-600">Welcome, {farmerName}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* New Farming Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('newFarming')}</h2>
              <p className="text-gray-600 mb-6">
                Add new farming information to get personalized crop recommendations
              </p>
              <button 
                onClick={() => navigate('/new-farming')}
                className="btn btn-primary w-full py-3 text-lg"
              >
                {t('newFarming')}
              </button>
            </div>
          </div>
          
          {/* Existing Farming Information Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('existingFarmingInfo')}</h2>
              <p className="text-gray-600 mb-6">
                View, modify, or research your existing farming records
              </p>
              <button 
                onClick={() => navigate('/farming-records')}
                className="btn btn-primary w-full py-3 text-lg"
              >
                {t('existingFarmingInfo')}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Your Farming Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">3</div>
              <div className="text-gray-600">Maximum Records</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-gray-600">Active Records</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-600">Research Results</div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Tips for Best Results</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Provide accurate soil and water information</li>
                  <li>• Include precise area measurements</li>
                  <li>• Update fertility percentage regularly</li>
                  <li>• Run research on each farming record</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;