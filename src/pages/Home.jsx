import React, { useState } from 'react';
import { FileText, Users, Activity, Calendar } from 'lucide-react';
import StatsCard from '../components/Common/StatsCard';
import Pagination from '../components/Common/Pagination';
import UsersTable from '../components/Tables/UsersTable';
import SurveysTable from '../components/Tables/SurveysTable';
import { mockUsers, mockSurveys } from '../data/mockData';

const HomePage = () => {
    const [userPage, setUserPage] = useState(1);
    const [surveyPage, setSurveyPage] = useState(1);
    const itemsPerPage = 5;

    const userTotalPages = Math.ceil(mockUsers.length / itemsPerPage);
    const surveyTotalPages = Math.ceil(mockSurveys.length / itemsPerPage);

    const paginatedUsers = mockUsers.slice(
        (userPage - 1) * itemsPerPage,
        userPage * itemsPerPage
    );

    const paginatedSurveys = mockSurveys.slice(
        (surveyPage - 1) * itemsPerPage,
        surveyPage * itemsPerPage
    );
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Surveys"
                    value="156"
                    icon={FileText}
                    trend="12"
                />
                <StatsCard
                    title="Active Users"
                    value="2,846"
                    icon={Users}
                    trend="8"
                />
                <StatsCard
                    title="Response Rate"
                    value="78%"
                    icon={Activity}
                    trend="5"
                />
                <StatsCard
                    title="This Month"
                    value="423"
                    icon={Calendar}
                    trend="15"
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-purple-100">
                <div className="p-6 border-b border-purple-100">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
                </div>
                <UsersTable users={paginatedUsers} />
                <div className="px-6 py-4">
                    <Pagination
                        currentPage={userPage}
                        totalPages={userTotalPages}
                        onPageChange={setUserPage}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-purple-100">
                <div className="p-6 border-b border-purple-100">
                    <h2 className="text-xl font-semibold text-gray-900">Active Surveys</h2>
                </div>
                <SurveysTable surveys={paginatedSurveys} />
                <div className="px-6 py-4">
                    <Pagination
                        currentPage={surveyPage}
                        totalPages={surveyTotalPages}
                        onPageChange={setSurveyPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;