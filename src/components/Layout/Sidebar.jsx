import React from 'react';
import { Home, Users, BarChart3, Settings, Menu, X } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
  const navigation = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'Users', icon: Users, id: 'users' },
    { name: 'Analytics', icon: BarChart3, id: 'analytics' },
    { name: 'Settings', icon: Settings, id: 'settings' }
  ];
  
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 relative`}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-purple-100">
          <div className="flex items-center justify-between">
            <h2 className={`font-bold text-xl text-purple-600 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              Survey Dashboard
            </h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-purple-50 text-purple-600"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className={`font-medium transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;