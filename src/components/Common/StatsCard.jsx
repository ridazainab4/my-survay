import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            {trend}% increase
          </p>
        )}
      </div>
      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
        <Icon className="h-6 w-6 text-purple-600" />
      </div>
    </div>
  </div>
);

export default StatsCard;