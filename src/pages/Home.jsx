// src/pages/Home.jsx
import React, { useState } from 'react';
import { 
  FileText, 
  Target, 
  Activity, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Zap,
  DollarSign
} from 'lucide-react';
import StatsCard from '../components/Common/StatsCard';
import Pagination from '../components/Common/Pagination';
import { mockUsers, mockSurveys } from '../data/mockData';

// Mock data for attribution metrics
const attributionData = [
  { channel: 'Google Ads', orders: 245, revenue: 48500, confidence: 85, trend: 12 },
  { channel: 'Facebook', orders: 189, revenue: 37200, confidence: 78, trend: -5 },
  { channel: 'Email', orders: 156, revenue: 31000, confidence: 92, trend: 8 },
  { channel: 'Instagram', orders: 134, revenue: 26500, confidence: 73, trend: 15 },
  { channel: 'Direct', orders: 98, revenue: 19400, confidence: 95, trend: 3 },
  { channel: 'Organic Search', orders: 87, revenue: 17300, confidence: 88, trend: 7 },
  { channel: 'TikTok', orders: 45, revenue: 8900, confidence: 65, trend: 25 },
  { channel: 'Unattributed', orders: 23, revenue: 4600, confidence: 0, trend: -18 }
];

const surveyMetrics = {
  displayed: 1250,
  completed: 625,
  completionRate: 50,
  avgCompletionTime: 18,
  firstTouchResponses: 580,
  lastTouchResponses: 595
};

// Attribution Gap Analysis
const AttributionGapCard = () => {
  const gapPercentage = 15.2;
  const identified = 84.8;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Attribution Gap Analysis</h3>
      <div className="relative h-32">
        <svg className="w-full h-full" viewBox="0 0 200 100">
          {/* Background arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 180 80"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Identified arc */}
          <path
            d={`M 20 80 A 60 60 0 0 1 ${20 + (160 * identified / 100)} 80`}
            fill="none"
            stroke="#9333ea"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center mt-8">
            <p className="text-3xl font-bold text-gray-900">{identified}%</p>
            <p className="text-sm text-gray-600">Attributed</p>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Unattributed Revenue</span>
          <span className="text-sm font-semibold text-red-600">${(4600).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Gap Reduction (30d)</span>
          <span className="text-sm font-semibold text-green-600">↓ 8.3%</span>
        </div>
      </div>
    </div>
  );
};

// Survey Performance Card
const SurveyPerformanceCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Performance</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Completion Rate</span>
            <span className="text-sm font-semibold text-gray-900">{surveyMetrics.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${surveyMetrics.completionRate}%` }}
            />
          </div>
          <p className="text-xs text-green-600 mt-1">Industry avg: 10-15%</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">{surveyMetrics.avgCompletionTime}s</p>
            <p className="text-xs text-gray-600">Avg. completion time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{surveyMetrics.completed}</p>
            <p className="text-xs text-gray-600">Responses today</p>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">First Touch Q's</span>
            <span className="font-medium text-gray-900">{surveyMetrics.firstTouchResponses}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Last Touch Q's</span>
            <span className="font-medium text-gray-900">{surveyMetrics.lastTouchResponses}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Confidence Score Distribution
const ConfidenceDistribution = () => {
  const distribution = [
    { range: 'High (80-100%)', count: 687, percentage: 68, color: 'bg-green-500' },
    { range: 'Medium (60-79%)', count: 213, percentage: 21, color: 'bg-yellow-500' },
    { range: 'Low (<60%)', count: 112, percentage: 11, color: 'bg-red-500' }
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Attribution Confidence</h3>
      <div className="space-y-3">
        {distribution.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700">{item.range}</span>
              <span className="text-sm font-medium text-gray-900">{item.count} orders</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${item.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-700">
          <Zap className="inline h-4 w-4 mr-1" />
          89% of orders have high confidence attribution
        </p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [channelPage, setChannelPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalRevenue = attributionData.reduce((sum, channel) => sum + channel.revenue, 0);
  const totalOrders = attributionData.reduce((sum, channel) => sum + channel.orders, 0);
  
  const channelTotalPages = Math.ceil(attributionData.length / itemsPerPage);
  const paginatedChannels = attributionData.slice(
    (channelPage - 1) * itemsPerPage,
    channelPage * itemsPerPage
  );
  
  const getConfidenceBadge = (confidence) => {
    if (confidence >= 80) return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
    if (confidence >= 60) return { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle };
    if (confidence > 0) return { color: 'bg-red-100 text-red-800', icon: XCircle };
    return { color: 'bg-gray-100 text-gray-800', icon: Eye };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Attribution Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Last updated:</span>
          <span className="text-sm font-medium text-gray-900">2 minutes ago</span>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Survey Completion Rate" 
          value={`${surveyMetrics.completionRate}%`}
          icon={MessageSquare}
          trend="5"
        />
        <StatsCard 
          title="Attribution Coverage" 
          value="84.8%" 
          icon={Target}
          trend="8"
        />
        <StatsCard 
          title="Avg. Confidence Score" 
          value="82%" 
          icon={Activity}
          trend="3"
        />
        <StatsCard 
          title="Revenue Attributed" 
          value={`$${(totalRevenue * 0.848 / 1000).toFixed(1)}k`}
          icon={DollarSign}
          trend="12"
        />
      </div>
      
      {/* Attribution Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AttributionGapCard />
        <SurveyPerformanceCard />
        <ConfidenceDistribution />
      </div>
      
      {/* Channel Attribution Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100">
        <div className="p-6 border-b border-purple-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Channel Attribution</h2>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
              View Detailed Report
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Revenue %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">30d Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {paginatedChannels.map((channel) => {
                const badge = getConfidenceBadge(channel.confidence);
                const BadgeIcon = badge.icon;
                const revenuePercentage = ((channel.revenue / totalRevenue) * 100).toFixed(1);
                
                return (
                  <tr key={channel.channel} className="hover:bg-purple-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${channel.channel === 'Unattributed' ? 'text-red-600' : 'text-gray-900'}`}>
                        {channel.channel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{channel.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${channel.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(revenuePercentage * 2, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-900">{revenuePercentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {channel.confidence > 0 ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                          <BadgeIcon className="h-3 w-3 mr-1" />
                          {channel.confidence}%
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium flex items-center ${
                        channel.trend > 0 ? 'text-green-600' : channel.trend < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {channel.trend > 0 ? '↑' : channel.trend < 0 ? '↓' : '→'} {Math.abs(channel.trend)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4">
          <Pagination 
            currentPage={channelPage}
            totalPages={channelTotalPages}
            onPageChange={setChannelPage}
          />
        </div>
      </div>
      
      {/* Daily Insights */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Daily Attribution Insight</h3>
            <p className="text-purple-100">
              Your attribution gap has decreased by 8.3% over the last 30 days. Instagram campaigns are showing 
              the highest growth (+25%) but have lower confidence scores (73%). Consider adding UTM parameters 
              to Instagram story links to improve tracking accuracy. Email campaigns maintain the highest 
              confidence (92%) and show steady growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
