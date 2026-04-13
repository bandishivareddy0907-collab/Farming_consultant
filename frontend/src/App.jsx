import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Import components
import LandingPage from './components/LandingPage';
import FarmerRegistration from './components/FarmerRegistration';
import FarmerLogin from './components/FarmerLogin';
import FarmerDashboard from './components/FarmerDashboard';
import NewFarmingForm from './components/NewFarmingForm';
import FarmingRecords from './components/FarmingRecords';
import ResearchResults from './components/ResearchResults';

// Translation resources
const resources = {
  en: {
    translation: {
      // English translations
      welcome: "Welcome to Agricultural Advisor",
      newFarmer: "New Farmer",
      existingFarmer: "Existing Farmer",
      selectLanguage: "Select Language",
      english: "English",
      telugu: "తెలుగు",
      hindi: "हिंदी",
      name: "Name",
      mobileNumber: "Mobile Number",
      address: "Address",
      password: "Password",
      register: "Register",
      login: "Login",
      forgotPassword: "Forgot Password?",
      contactSupport: "Contact Customer Service: 8688484559",
      newFarming: "New Farming",
      existingFarmingInfo: "Existing Farming Information",
      farmingType: "Farming Type",
      soilType: "Soil Type",
      waterAvailability: "Water Availability",
      area: "Area/Size",
      fertilityPercentage: "Fertility Percentage",
      yes: "Yes",
      no: "No",
      indoor: "Indoor",
      outdoor: "Outdoor",
      save: "Save",
      delete: "Delete",
      modify: "Modify",
      research: "Research",
      showResults: "Show Results",
      bestCrop: "Best Crop",
      irrigationProcess: "Irrigation Process",
      profitCategory: "Profit Category",
      riskAnalysis: "Risk Analysis",
      weatherSuitability: "Weather Suitability",
      downloadPDF: "📥 Download as PDF"
    }
  },
  te: {
    translation: {
      // Telugu translations
      welcome: "వ్యవసాయ సలహాదారుకు స్వాగతం",
      newFarmer: "కొత్త రైతు",
      existingFarmer: "ఉన్న రైతు",
      selectLanguage: "భాషను ఎంచుకోండి",
      english: "English",
      telugu: "తెలుగు",
      hindi: "हिंदी",
      name: "పేరు",
      mobileNumber: "మొబైల్ నంబర్",
      address: "చిరునామా",
      password: "పాస్‌వర్డ్",
      register: "రిజిస్టర్ చేయండి",
      login: "లాగిన్",
      forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
      contactSupport: "కస్టమర్ సర్వీస్: 8688484559",
      newFarming: "కొత్త వ్యవసాయం",
      existingFarmingInfo: "ఉన్న వ్యవసాయ సమాచారం",
      farmingType: "వ్యవసాయ రకం",
      soilType: "నేల రకం",
      waterAvailability: "నీటి అందుబాటు",
      area: "ఎరియా/పరిమాణం",
      fertilityPercentage: "సారవంతత శాతం",
      yes: "అవును",
      no: "కాదు",
      indoor: "లోపలి",
      outdoor: "బయటి",
      save: "సేవ్ చేయండి",
      delete: "తొలగించు",
      modify: "మార్చు",
      research: "పరిశోధన",
      showResults: "ఫలితాలను చూపించు",
      bestCrop: "ఉత్తమ పంట",
      irrigationProcess: "నీటి పారుదల ప్రక్రియ",
      profitCategory: "లాభ వర్గం",
      riskAnalysis: "ప్రమాద విశ్లేషణ",
      weatherSuitability: "వాతావరణ అనుకూలత",
      downloadPDF: "📥 PDF గా డౌన్‌లోడ్ చేయండి"
    }
  },
  hi: {
    translation: {
      // Hindi translations
      welcome: "कृषि सलाहकार में आपका स्वागत है",
      newFarmer: "नए किसान",
      existingFarmer: "मौजूदा किसान",
      selectLanguage: "भाषा चुनें",
      english: "English",
      telugu: "తెలుగు",
      hindi: "हिंदी",
      name: "नाम",
      mobileNumber: "मोबाइल नंबर",
      address: "पता",
      password: "पासवर्ड",
      register: "रजिस्टर करें",
      login: "लॉगिन",
      forgotPassword: "पासवर्ड भूल गए?",
      contactSupport: "ग्राहक सेवा: 8688484559",
      newFarming: "नई खेती",
      existingFarmingInfo: "मौजूदा खेती की जानकारी",
      farmingType: "खेती का प्रकार",
      soilType: "मिट्टी का प्रकार",
      waterAvailability: "पानी की उपलब्धता",
      area: "क्षेत्रफल/आकार",
      fertilityPercentage: "उर्वरता प्रतिशत",
      yes: "हाँ",
      no: "नहीं",
      indoor: "अंदरूनी",
      outdoor: "बाहरी",
      save: "सहेजें",
      delete: "हटाएं",
      modify: "संशोधित करें",
      research: "अनुसंधान",
      showResults: "परिणाम दिखाएं",
      bestCrop: "सर्वोत्तम फसल",
      irrigationProcess: "सिंचाई प्रक्रिया",
      profitCategory: "लाभ श्रेणी",
      riskAnalysis: "जोखिम विश्लेषण",
      weatherSuitability: "मौसम अनुकूलता",
      downloadPDF: "📥 PDF के रूप में डाउनलोड करें"
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

function App() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Language Selector */}
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">{t('welcome')}</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded ${currentLanguage === 'en' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              {t('english')}
            </button>
            <button 
              onClick={() => changeLanguage('te')}
              className={`px-3 py-1 rounded ${currentLanguage === 'te' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              {t('telugu')}
            </button>
            <button 
              onClick={() => changeLanguage('hi')}
              className={`px-3 py-1 rounded ${currentLanguage === 'hi' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              {t('hindi')}
            </button>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<FarmerRegistration />} />
        <Route path="/login" element={<FarmerLogin />} />
        <Route path="/dashboard" element={<FarmerDashboard />} />
        <Route path="/new-farming" element={<NewFarmingForm />} />
        <Route path="/farming-records" element={<FarmingRecords />} />
        <Route path="/research-results/:resultId" element={<ResearchResults />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;