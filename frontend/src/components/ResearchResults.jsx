import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ResearchResults = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResult();
  }, [resultId]);

  const fetchResult = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/research/result/${resultId}`);
      setResult(response.data);
    } catch (error) {
      setError('Failed to fetch research results');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/research/pdf/${resultId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `research-result-${resultId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError('Failed to download PDF');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading research results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Error Loading Results</h3>
          <p className="text-gray-600 mb-6">{error || 'Research results not found'}</p>
          <button
            onClick={() => navigate('/farming-records')}
            className="btn btn-primary py-2 px-6"
          >
            Back to Records
          </button>
        </div>
      </div>
    );
  }

  const getProfitColor = (category) => {
    switch (category) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">Research Results</h1>
              <p className="text-gray-600">Detailed analysis and recommendations</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleDownloadPDF}
                className="btn btn-primary flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('downloadPDF')}
              </button>
              <button
                onClick={() => navigate('/farming-records')}
                className="btn btn-secondary flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </div>
          </div>

          {/* Main Results Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {/* Best Crop Recommendation */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                {t('bestCrop')}
              </h2>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="text-xl font-bold text-green-800 mb-2">{result.bestCrop.name}</h3>
                <p className="text-gray-700">{result.bestCrop.description}</p>
              </div>
            </div>

            {/* Irrigation Process */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                {t('irrigationProcess')}
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Steps:</h3>
                <ol className="space-y-2 mb-4">
                  {result.irrigationProcess.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="border-t pt-3">
                  <span className="font-semibold text-blue-800">Duration: </span>
                  <span className="text-gray-700">{result.irrigationProcess.duration}</span>
                </div>
              </div>
            </div>

            {/* Profit and Risk Analysis */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('profitCategory')}
                </h2>
                <div className={`inline-block px-4 py-2 rounded-full font-semibold ${getProfitColor(result.profitCategory)}`}>
                  {result.profitCategory} Profit Potential
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {t('riskAnalysis')}
              </h2>
              <div className={`inline-block px-4 py-2 rounded-full font-semibold ${getRiskColor(result.riskAnalysis.level)}`}>
                {result.riskAnalysis.level} Risk Level
              </div>
              {result.riskAnalysis.factors.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-medium text-gray-700 mb-2">Risk Factors:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {result.riskAnalysis.factors.map((factor, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Weather Suitability */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              {t('weatherSuitability')}
            </h2>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-purple-800 mb-2">Current Conditions</h3>
                  <p className="text-gray-700">{result.weatherSuitability.current}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800 mb-2">Forecast</h3>
                  <p className="text-gray-700">{result.weatherSuitability.forecast}</p>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-purple-800 mb-2">Recommendation</h3>
                <p className="text-gray-700">{result.weatherSuitability.recommendation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Next Steps</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleDownloadPDF}
              className="btn btn-primary flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Full Report
            </button>
            <button
              onClick={() => navigate('/farming-records')}
              className="btn btn-secondary"
            >
              View All Records
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ResearchResults;