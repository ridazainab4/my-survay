// src/pages/Leads.jsx
import React, { useState } from 'react';
import { Globe, Facebook, Twitter, Linkedin, Mail, Search, Smartphone, Monitor } from 'lucide-react';
import Pagination from '../components/Common/Pagination';

// Mock data for leads
const platformData = [
    { name: 'Google', percentage: 35, color: '#4285F4', icon: Search },
    { name: 'Facebook', percentage: 25, color: '#1877F2', icon: Facebook },
    { name: 'Email', percentage: 20, color: '#EA4335', icon: Mail },
    { name: 'LinkedIn', percentage: 10, color: '#0A66C2', icon: Linkedin },
    { name: 'Twitter', percentage: 5, color: '#1DA1F2', icon: Twitter },
    { name: 'Direct', percentage: 5, color: '#34A853', icon: Globe }
];

const mockLeads = Array.from({ length: 100 }, (_, i) => {
    const platforms = ['Google', 'Facebook', 'Email', 'LinkedIn', 'Twitter', 'Direct'];
    const devices = ['Mobile', 'Desktop', 'Tablet'];
    const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France'];

    return {
        id: i + 1,
        name: `Lead ${i + 1}`,
        email: `lead${i + 1}@example.com`,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
        surveysCompleted: Math.floor(Math.random() * 5) + 1,
        conversionRate: Math.floor(Math.random() * 100)
    };
});

// Pie Chart Component
const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.percentage, 0);
    let cumulativePercentage = 0;

    const createPath = (percentage, offset) => {
        const startAngle = (offset / 100) * 360;
        const endAngle = ((offset + percentage) / 100) * 360;
        const largeArcFlag = percentage > 50 ? 1 : 0;

        const startX = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
        const startY = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
        const endX = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
        const endY = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);

        return `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    };

    return (
        <div className="flex items-center justify-center space-x-8">
            <div className="relative">
                <svg viewBox="0 0 100 100" className="w-64 h-64">
                    {data.map((item, index) => {
                        const path = createPath(item.percentage, cumulativePercentage);
                        cumulativePercentage += item.percentage;

                        return (
                            <path
                                key={index}
                                d={path}
                                fill={item.color}
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900">100%</p>
                        <p className="text-sm text-gray-600">Total Leads</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                        <item.icon className="h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700 w-20">{item.name}</span>
                        <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LeadsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPlatform, setSelectedPlatform] = useState('All');
    const itemsPerPage = 10;

    // Filter leads based on selected platform
    const filteredLeads = selectedPlatform === 'All'
        ? mockLeads
        : mockLeads.filter(lead => lead.platform === selectedPlatform);

    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
    const paginatedLeads = filteredLeads.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calculate platform statistics
    const platformStats = platformData.map(platform => {
        const leads = mockLeads.filter(lead => lead.platform === platform.name);
        return {
            ...platform,
            leadCount: leads.length,
            avgConversion: leads.length > 0
                ? Math.round(leads.reduce((sum, lead) => sum + lead.conversionRate, 0) / leads.length)
                : 0
        };
    });

    const getDeviceIcon = (device) => {
        switch (device) {
            case 'Mobile': return <Smartphone className="h-4 w-4" />;
            case 'Desktop': return <Monitor className="h-4 w-4" />;
            default: return <Monitor className="h-4 w-4" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Lead Sources</h1>
                <div className="flex space-x-4">
                    <select
                        className="px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={selectedPlatform}
                        onChange={(e) => {
                            setSelectedPlatform(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="All">All Platforms</option>
                        {platformData.map(platform => (
                            <option key={platform.name} value={platform.name}>{platform.name}</option>
                        ))}
                    </select>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Platform Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Lead Distribution by Platform</h2>
                <PieChart data={platformData} />
            </div>

            {/* Platform Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {platformStats.map((platform, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-purple-100 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <platform.icon className="h-5 w-5" style={{ color: platform.color }} />
                            <span className="text-xs font-medium text-gray-500">{platform.percentage}%</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{platform.leadCount} leads</p>
                        <p className="text-xs text-purple-600 mt-1">{platform.avgConversion}% avg conv.</p>
                    </div>
                ))}
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl shadow-sm border border-purple-100">
                <div className="p-6 border-b border-purple-100">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">Lead Details</h2>
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-purple-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Platform</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Device</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Country</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Surveys</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Conv. Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-100">
                            {paginatedLeads.map((lead) => {
                                const platform = platformData.find(p => p.name === lead.platform);
                                const PlatformIcon = platform?.icon || Globe;

                                return (
                                    <tr key={lead.id} className="hover:bg-purple-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{lead.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <PlatformIcon className="h-4 w-4" style={{ color: platform?.color }} />
                                                <span className="text-sm text-gray-900">{lead.platform}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2 text-gray-600">
                                                {getDeviceIcon(lead.device)}
                                                <span className="text-sm">{lead.device}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.country}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.surveysCompleted}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                    <div
                                                        className="bg-purple-600 h-2 rounded-full"
                                                        style={{ width: `${lead.conversionRate}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-900">{lead.conversionRate}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default LeadsPage;