import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const FarmingRecords = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [farmerId, setFarmerId] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('farmerId');
    if (!id) {
      navigate('/login');
      return;
    }
    setFarmerId(id);
    fetchRecords(id);
  }, [navigate]);

  const fetchRecords = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/farming/farmer/${id}`);
      setRecords(response.data);
    } catch (error) {
      setError('Failed to fetch farming records');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recordId) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/farming/${recordId}`);
      fetchRecords(farmerId);
    } catch (error) {
      setError('Failed to delete record');
    }
  };

  const handleModify = (recordId) => {
    // For simplicity, we'll just navigate to new farming form
    // In a real app, you'd pre-fill the form with existing data
    navigate('/new-farming');
  };

  const handleResearch = async (recordId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/research/analyze/${recordId}`);
      // Handle SSE response for progress updates
      // For now, redirect to results page
      if (response.data.resultId) {
        navigate(`/research-results/${response.data.resultId}`);
      }
    } catch (error) {
      setError('Research analysis failed');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading farming records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">{t('existingFarmingInfo')}</h1>
              <p className="text-gray-600">Manage your farming records and research results</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/new-farming')}
                className="btn btn-primary flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Record
              </button>
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
          </div>

          {error && (
            <div className="alert alert-error mb-6">
              {error}
            </div>
          )}

          {records.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No farming records found</h3>
              <p className="text-gray-600 mb-6">Start by adding your first farming record</p>
              <button
                onClick={() => navigate('/new-farming')}
                className="btn btn-primary py-3 px-6"
              >
                Create New Record
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {records.map((record) => (
                <div key={record._id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {record.farmingType} Farming
                      </h3>
                      <p className="text-gray-600">
                        {record.soilType} • {record.area} acres • {record.fertilityPercentage}% fertility
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Created: {formatDate(record.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {record.hasResearchResult && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Researched
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        record.waterAvailability.hasWater 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.waterAvailability.hasWater ? 'Water Available' : 'No Water'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Water Availability</div>
                      <div className="font-medium">
                        {record.waterAvailability.hasWater 
                          ? `${record.waterAvailability.percentage}%` 
                          : 'None'
                        }
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Area</div>
                      <div className="font-medium">{record.area} acres</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Fertility</div>
                      <div className="font-medium">{record.fertilityPercentage}%</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Soil Type</div>
                      <div className="font-medium text-sm">{record.soilType}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="btn btn-danger flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {t('delete')}
                    </button>
                    
                    <button
                      onClick={() => handleModify(record._id)}
                      className="btn btn-secondary flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {t('modify')}
                    </button>
                    
                    <button
                      onClick={() => handleResearch(record._id)}
                      disabled={record.hasResearchResult}
                      className={`btn flex items-center ${
                        record.hasResearchResult 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'btn-primary'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {t('research')}
                    </button>
                    
                    {record.hasResearchResult && (
                      <button
                        onClick={() => navigate(`/research-results/${record.researchResultId}`)}
                        className="btn btn-secondary flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {t('showResults')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{records.length}</div>
              <div className="text-gray-600">Total Records</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {records.filter(r => r.hasResearchResult).length}
              </div>
              <div className="text-gray-600">Researched Records</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{3 - records.length}</div>
              <div className="text-gray-600">Available Slots</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingRecords;