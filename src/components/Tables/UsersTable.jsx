import React from 'react';

const UsersTable = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-purple-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Surveys</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-purple-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.surveysCompleted}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.joinDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;