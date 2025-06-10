import React from 'react';
import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-purple-100">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back!</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-purple-50 text-gray-600">
              <Activity className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;