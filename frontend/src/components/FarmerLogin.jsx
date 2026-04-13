import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const FarmerLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: address, 2: mobile, 3: name selection, 4: password
  const [formData, setFormData] = useState({
    address: '',
    mobileNumber: '',
    name: '',
    password: ''
  });
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already logged in
    const farmerId = localStorage.getItem('farmerId');
    if (farmerId) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5000/api/farmers/by-address/${encodeURIComponent(formData.address)}`);
      if (response.data.length > 0) {
        setFarmers(response.data);
        setStep(2);
      } else {
        setError('No farmers found with this address. Please check and try again.');
      }
    } catch (error) {
      setError('Failed to fetch farmers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    const filteredFarmers = farmers.filter(farmer => 
      farmer.mobileNumber === formData.mobileNumber
    );
    
    if (filteredFarmers.length > 0) {
      setFarmers(filteredFarmers);
      setStep(3);
    } else {
      setError('No farmer found with this mobile number at the given address.');
    }
  };

  const handleNameSelect = (selectedName) => {
    setFormData({ ...formData, name: selectedName });
    setStep(4);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/farmers/login', {
        mobileNumber: formData.mobileNumber,
        name: formData.name,
        password: formData.password
      });
      
      // Store farmer info in localStorage
      localStorage.setItem('farmerId', response.data.farmerId);
      localStorage.setItem('farmerName', response.data.farmerName);
      
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleAddressSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('address')} *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="form-input"
                placeholder="Enter your address"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 text-lg disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Next'}
            </button>
          </form>
        );

      case 2:
        return (
          <form onSubmit={handleMobileSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('mobileNumber')} *
              </label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                required
                className="form-input"
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-secondary flex-1 py-3"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1 py-3 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Next'}
              </button>
            </div>
          </form>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 text-center">
              Select your name from the list:
            </h3>
            <div className="space-y-2">
              {farmers.map((farmer, index) => (
                <button
                  key={index}
                  onClick={() => handleNameSelect(farmer.name)}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-green-50 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
                >
                  <div className="font-medium text-gray-800">{farmer.name}</div>
                  <div className="text-sm text-gray-600">{farmer.mobileNumber}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="btn btn-secondary w-full py-3"
            >
              Back
            </button>
          </div>
        );

      case 4:
        return (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Welcome, {formData.name}!
              </h3>
              <p className="text-gray-600 mb-6">Please enter your password</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')} *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="form-input"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn btn-secondary flex-1 py-3"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1 py-3 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : t('login')}
              </button>
            </div>
            
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                {t('forgotPassword')}
              </p>
              <p className="text-sm text-green-600 font-medium">
                {t('contactSupport')}
              </p>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-800 mb-2">{t('existingFarmer')}</h1>
              <p className="text-gray-600">Step {step} of 4</p>
              
              {/* Progress indicator */}
              <div className="mt-4">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Address</span>
                  <span>Mobile</span>
                  <span>Name</span>
                  <span>Password</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="alert alert-error mb-6">
                {error}
              </div>
            )}

            {renderStep()}

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-green-600 hover:text-green-800 font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerLogin;