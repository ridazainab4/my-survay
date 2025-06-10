// src/pages/Home.jsx
import React, { useState } from 'react';
import { FileText, Users, Activity, Calendar, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import StatsCard from '../components/Common/StatsCard';
import Pagination from '../components/Common/Pagination';
import UsersTable from '../components/Tables/UsersTable';
import SurveysTable from '../components/Tables/SurveysTable';
import { mockUsers, mockSurveys } from '../data/mockData';

// Mock data for response times
const responseTimeData = [
  { day: 'Mon', avgTime: 4.2, responses: 145 },
  { day: 'Tue', avgTime: 5.1, responses: 132 },
  { day: 'Wed', avgTime: 4.8, responses: 156 },
  { day: 'Thu', avgTime: 6.3, responses: 128 },
  { day: 'Fri', avgTime: 5.5, responses: 142 },
  { day: 'Sat', avgTime: 4.9, responses: 98 },
  { day: 'Sun', avgTime: 5.2, responses: 87 }
];

const surveyResponseTimes = [
  { survey: 'Customer Satisfaction', avgTime: 3.5, color: '#9333ea' },
  { survey: 'Product Feedback', avgTime: 5.2, color: '#a855f7' },
  { survey: 'Market Research', avgTime: 7.8, color: '#c084fc' },
  { survey: 'User Experience', avgTime: 4.1, color: '#d8b4fe' },
  { survey: 'Service Quality', avgTime: 6.5, color: '#e9d5ff' }
];

// Response Time Card Component
const ResponseTimeCard = ({ title, time, subtitle, icon: Icon, trend, status }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'alert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getStatusColor()}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={`text-sm font-medium flex items-center ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{time}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

const HomePage = () => {
  const [userPage, setUserPage] = useState(1);
  const [surveyPage, setSurveyPage] = useState(1);
  const itemsPerPage = 5;
  
  const userTotalPages = Math.ceil(mockUsers.length / itemsPerPage);
  const surveyTotalPages = Math.ceil(mockSurveys.length / itemsPerPage);
  
  const paginatedUsers = mockUsers.slice(
    (userPage - 1) * itemsPerPage,
    userPage * itemsPerPage
  );
  
  const paginatedSurveys = mockSurveys.slice(
    (surveyPage - 1) * itemsPerPage,
    surveyPage * itemsPerPage
  );
  
  // Calculate max value for chart scaling
  const maxTime = Math.max(...responseTimeData.map(d => d.avgTime));
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Surveys" 
          value="156" 
          icon={FileText}
          trend="12"
        />
        <StatsCard 
          title="Active Users" 
          value="2,846" 
          icon={Users}
          trend="8"
        />
        <StatsCard 
          title="Response Rate" 
          value="78%" 
          icon={Activity}
          trend="5"
        />
        <StatsCard 
          title="This Month" 
          value="423" 
          icon={Calendar}
          trend="15"
        />
      </div>
      
      {/* Average Response Time Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Response Time Metrics */}
        <div className="lg:col-span-1 space-y-4">
          <ResponseTimeCard
            title="Overall Avg. Time"
            time="5.2 min"
            subtitle="Across all surveys"
            icon={Clock}
            trend={-8}
            status="good"
          />
          <ResponseTimeCard
            title="Fastest Response"
            time="2.3 min"
            subtitle="Quick Survey"
            icon={TrendingUp}
            status="excellent"
          />
          <ResponseTimeCard
            title="Slowest Response"
            time="12.7 min"
            subtitle="Detailed Survey"
            icon={AlertCircle}
            trend={15}
            status="warning"
          />
        </div>
        
        {/* Weekly Response Time Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-purple-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Response Time Trends</h2>
          <div className="space-y-4">
            {/* Chart */}
            <div className="h-48 flex items-end justify-between space-x-2">
              {responseTimeData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center mb-2">
                    <span className="text-xs font-medium text-gray-600 mb-1">{data.avgTime}m</span>
                    <div className="w-full bg-purple-100 rounded-t-lg relative">
                      <div 
                        className="bg-purple-600 rounded-t-lg transition-all duration-500 hover:bg-purple-700"
                        style={{ height: `${(data.avgTime / maxTime) * 120}px` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{data.day}</span>
                  <span className="text-xs text-gray-500">{data.responses}</span>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded"></div>
                <span className="text-sm text-gray-600">Avg. Response Time (minutes)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Number below bar = Total responses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Response Time by Survey Type */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Average Response Time by Survey</h2>
        <div className="space-y-3">
          {surveyResponseTimes.map((survey, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{survey.survey}</span>
                  <span className="text-sm font-bold text-gray-900">{survey.avgTime} min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(survey.avgTime / 10) * 100}%`,
                      backgroundColor: survey.color
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Target response time: &lt; 5 minutes</span>
            <span className="font-medium text-purple-600">2 surveys above target</span>
          </div>
        </div>
      </div>
      
      {/* Recent Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100">
        <div className="p-6 border-b border-purple-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
        </div>
        <UsersTable users={paginatedUsers} />
        <div className="px-6 py-4">
          <Pagination 
            currentPage={userPage}
            totalPages={userTotalPages}
            onPageChange={setUserPage}
          />
        </div>
      </div>
      
      {/* Active Surveys Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100">
        <div className="p-6 border-b border-purple-100">
          <h2 className="text-xl font-semibold text-gray-900">Active Surveys</h2>
        </div>
        <SurveysTable surveys={paginatedSurveys} />
        <div className="px-6 py-4">
          <Pagination 
            currentPage={surveyPage}
            totalPages={surveyTotalPages}
            onPageChange={setSurveyPage}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;