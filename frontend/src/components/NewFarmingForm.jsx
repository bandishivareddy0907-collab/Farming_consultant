import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const NewFarmingForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [farmerId, setFarmerId] = useState('');
  const [formData, setFormData] = useState({
    farmingType: 'Outdoor',
    soilType: '',
    waterAvailability: {
      hasWater: true,
      percentage: 100
    },
    area: '',
    fertilityPercentage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('farmerId');
    if (!id) {
      navigate('/login');
      return;
    }
    setFarmerId(id);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('waterAvailability.')) {
      const key = name.split('.')[1];
      setFormData({
        ...formData,
        waterAvailability: {
          ...formData.waterAvailability,
          [key]: key === 'hasWater' ? checked : Number(value)
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? Number(value) : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/farming', {
        ...formData,
        farmerId
      });
      
      setSuccess('Farming record created successfully!');
      setTimeout(() => {
        navigate('/farming-records');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create farming record');
    } finally {
      setLoading(false);
    }
  };

  const soilTypes = [
    'Clay Soil', 'Sandy Soil', 'Silt Soil', 'Loam Soil', 
    'Peat Soil', 'Chalky Soil', 'Saline Soil', 'Other'
  ];

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-green-800 mb-2">{t('newFarming')}</h1>
                <p className="text-gray-600">Fill in your farming details for analysis</p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-secondary flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </div>

            {error && (
              <div className="alert alert-error mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Farming Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('farmingType')} *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="farmingType"
                      value="Indoor"
                      checked={formData.farmingType === 'Indoor'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span>{t('indoor')}</span>
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="farmingType"
                      value="Outdoor"
                      checked={formData.farmingType === 'Outdoor'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span>{t('outdoor')}</span>
                  </label>
                </div>
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('soilType')} *
                </label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select soil type</option>
                  {soilTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Water Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('waterAvailability')} *
                </label>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="waterAvailability.hasWater"
                      checked={formData.waterAvailability.hasWater}
                      onChange={handleChange}
                      className="mr-3 h-5 w-5 text-green-600"
                    />
                    <span>{t('yes')}</span>
                  </label>
                  
                  {formData.waterAvailability.hasWater && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Water Availability Percentage
                      </label>
                      <input
                        type="range"
                        name="waterAvailability.percentage"
                        min="0"
                        max="100"
                        value={formData.waterAvailability.percentage}
                        onChange={handleChange}
                        className="w-full"
                      />
                      <div className="text-center text-sm text-gray-600 mt-1">
                        {formData.waterAvailability.percentage}%
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Area/Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('area')} (in acres) *
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="form-input"
                  placeholder="Enter area in acres"
                />
              </div>

              {/* Fertility Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('fertilityPercentage')} *
                </label>
                <input
                  type="range"
                  name="fertilityPercentage"
                  min="0"
                  max="100"
                  value={formData.fertilityPercentage}
                  onChange={handleChange}
                  className="w-full mb-2"
                />
                <div className="text-center text-lg font-medium text-green-600">
                  {formData.fertilityPercentage}%
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-3 text-lg disabled:opacity-50"
              >
                {loading ? 'Saving...' : t('save')}
              </button>
            </form>

            {/* Information Box */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">Important Information</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• You can create maximum 3 farming records</li>
                    <li>• All fields marked with * are required</li>
                    <li>• Accurate information leads to better recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFarmingForm;