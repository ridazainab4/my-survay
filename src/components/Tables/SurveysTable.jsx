import React from 'react';

const SurveysTable = ({ surveys }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-purple-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Responses</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Completion Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-100">
          {surveys.map((survey) => (
            <tr key={survey.id} className="hover:bg-purple-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{survey.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{survey.responses}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${survey.completionRate}%` }}
                    ></div>
                  </div>
                  <span>{survey.completionRate}%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{survey.createdDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  survey.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {survey.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveysTable;