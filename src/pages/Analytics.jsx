import React from 'react';
import { chartData, mockSurveys } from '../data/mockData';

const AnalyticsPage = () => {
    const maxValue = Math.max(...chartData.map(d => d.responses));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Response Trends</h2>
                    <div className="h-64 flex items-end justify-between space-x-2">
                        {chartData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div className="w-full bg-purple-200 rounded-t-lg relative">
                                    <div
                                        className="bg-purple-600 rounded-t-lg transition-all duration-500 hover:bg-purple-700"
                                        style={{ height: `${(data.responses / maxValue) * 200}px` }}
                                    >
                                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700">
                                            {data.responses}
                                        </span>
                                    </div>
                                </div>
                                <span className="mt-2 text-sm text-gray-600">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Survey Performance</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Average Completion Rate</span>
                            <span className="font-semibold text-gray-900">78.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Average Response Time</span>
                            <span className="font-semibold text-gray-900">5.2 min</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Total Responses</span>
                            <span className="font-semibold text-gray-900">3,420</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Active Surveys</span>
                            <span className="font-semibold text-gray-900">24</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Surveys</h2>
                <div className="space-y-3">
                    {mockSurveys.slice(0, 5).map((survey, index) => (
                        <div key={survey.id} className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors">
                            <div className="flex items-center space-x-3">
                                <span className="text-lg font-bold text-purple-600">#{index + 1}</span>
                                <div>
                                    <p className="font-medium text-gray-900">{survey.title}</p>
                                    <p className="text-sm text-gray-600">{survey.responses} responses</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">{survey.completionRate}%</p>
                                <p className="text-sm text-gray-600">completion rate</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
          
