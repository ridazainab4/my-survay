// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import HomePage from './pages/Home';
import SurveysPage from './pages/Surveys';
import SurveyBuilder from './pages/SurveyBuilder';
import LeadsPage from './pages/Leads';
import AnalyticsPage from './pages/Analytics';
import SettingsPage from './pages/Settings';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'surveys':
        return <SurveysPage onNavigate={setCurrentPage} />;
      case 'survey-builder':
        return <SurveyBuilder onBack={() => setCurrentPage('surveys')} />;
      case 'leads':
        return <LeadsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 overflow-x-hidden">
        <Header />
        <main className="p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
