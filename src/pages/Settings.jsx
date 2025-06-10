import React from 'react';

const SettingsPage = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Your Organization"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 text-purple-600 focus:ring-purple-500" />
                                <span className="text-gray-700">Send email notifications for new responses</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 text-purple-600 focus:ring-purple-500" />
                                <span className="text-gray-700">Weekly summary reports</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                        <select className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option>UTC-5:00 Eastern Time</option>
                            <option>UTC-6:00 Central Time</option>
                            <option>UTC-7:00 Mountain Time</option>
                            <option>UTC-8:00 Pacific Time</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;