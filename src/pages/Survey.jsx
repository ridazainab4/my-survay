import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  PauseCircle, 
  PlayCircle,
  Clock,
  CheckCircle,
  BarChart,
  Copy
} from 'lucide-react';
import Pagination from '../components/Common/Pagination';

// Mock survey data
const mockSurveyData = [
  {
    id: 1,
    title: 'Post-Purchase Attribution Survey',
    status: 'active',
    responses: 2847,
    completionRate: 52.3,
    avgCompletionTime: 18,
    createdDate: '2024-01-15',
    lastModified: '2024-01-20',
    questions: 2
  },
  {
    id: 2,
    title: 'Customer Satisfaction Survey',
    status: 'active',
    responses: 1523,
    completionRate: 48.7,
    avgCompletionTime: 24,
    createdDate: '2024-01-10',
    lastModified: '2024-01-18',
    questions: 3
  },
  {
    id: 3,
    title: 'Holiday Campaign Attribution',
    status: 'inactive',
    responses: 3421,
    completionRate: 61.2,
    avgCompletionTime: 15,
    createdDate: '2023-12-01',
    lastModified: '2024-01-05',
    questions: 2
  },
  {
    id: 4,
    title: 'New Product Feedback',
    status: 'active',
    responses: 892,
    completionRate: 44.5,
    avgCompletionTime: 32,
    createdDate: '2024-01-22',
    lastModified: '2024-01-25',
    questions: 4
  },
  {
    id: 5,
    title: 'Return Customer Attribution',
    status: 'draft',
    responses: 0,
    completionRate: 0,
    avgCompletionTime: 0,
    createdDate: '2024-01-28',
    lastModified: '2024-01-28',
    questions: 2
  },
  {
    id: 6,
    title: 'Email Campaign Effectiveness',
    status: 'inactive',
    responses: 1876,
    completionRate: 55.8,
    avgCompletionTime: 20,
    createdDate: '2023-11-15',
    lastModified: '2023-12-20',
    questions: 3
  },
  {
    id: 7,
    title: 'Social Media Attribution',
    status: 'active',
    responses: 734,
    completionRate: 49.2,
    avgCompletionTime: 22,
    createdDate: '2024-01-20',
    lastModified: '2024-01-26',
    questions: 2
  },
  {
    id: 8,
    title: 'Influencer Campaign Tracking',
    status: 'active',
    responses: 456,
    completionRate: 58.9,
    avgCompletionTime: 16,
    createdDate: '2024-01-25',
    lastModified: '2024-01-27',
    questions: 2
  }
];

const SurveysPage = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;
  
  // Filter surveys based on status and search
  const filteredSurveys = mockSurveyData.filter(survey => {
    const matchesStatus = statusFilter === 'all' || survey.status === statusFilter;
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  
  const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);
  const paginatedSurveys = filteredSurveys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Calculate stats
  const totalSurveys = mockSurveyData.length;
  const activeSurveys = mockSurveyData.filter(s => s.status === 'active').length;
  const inactiveSurveys = mockSurveyData.filter(s => s.status === 'inactive').length;
  const draftSurveys = mockSurveyData.filter(s => s.status === 'draft').length;
  const totalResponses = mockSurveyData.reduce((sum, survey) => sum + survey.responses, 0);
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return { color: 'bg-green-100 text-green-800', icon: PlayCircle };
      case 'inactive':
        return { color: 'bg-gray-100 text-gray-800', icon: PauseCircle };
      case 'draft':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Edit };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: FileText };
    }
  };
  
  const handleCreateSurvey = () => {
    // Navigate to survey builder page
    if (onNavigate) {
      onNavigate('survey-builder');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Survey Management</h1>
        <button 
          onClick={handleCreateSurvey}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Survey</span>
        </button>
      </div>
      
      {/* Survey Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Surveys</p>
              <p className="text-2xl font-bold text-gray-900">{totalSurveys}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeSurveys}</p>
            </div>
            <PlayCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-600">{inactiveSurveys}</p>
            </div>
            <PauseCircle className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{draftSurveys}</p>
            </div>
            <Edit className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Responses</p>
              <p className="text-2xl font-bold text-purple-600">{totalResponses.toLocaleString()}</p>
            </div>
            <BarChart className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Surveys</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Drafts</option>
            </select>
            
            <input
              type="text"
              placeholder="Search surveys..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
            />
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Showing {filteredSurveys.length} of {totalSurveys} surveys</span>
          </div>
        </div>
      </div>
      
      {/* Surveys Table */}
      <div className="bg-white rounded-xl shadow-sm border border-purple-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Survey Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Responses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Completion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Avg. Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Questions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {paginatedSurveys.map((survey) => {
                const statusBadge = getStatusBadge(survey.status);
                const StatusIcon = statusBadge.icon;
                
                return (
                  <tr key={survey.id} className="hover:bg-purple-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{survey.title}</div>
                      <div className="text-xs text-gray-500">Modified: {survey.lastModified}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {survey.responses.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${survey.completionRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-900">{survey.completionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {survey.avgCompletionTime > 0 ? `${survey.avgCompletionTime}s` : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {survey.questions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {survey.createdDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <button className="text-purple-600 hover:text-purple-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredSurveys.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No surveys found</p>
          </div>
        )}
        {filteredSurveys.length > 0 && (
          <div className="px-6 py-4">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveysPage;
