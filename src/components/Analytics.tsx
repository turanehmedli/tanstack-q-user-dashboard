import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, BarChart3, Briefcase, X, Search } from "lucide-react";
import { useGetUsers } from "../hooks/useUsers";
import { calculateUserAnalytics, getAgeRange } from "../utils/userAnalytics";
import {
  formatGenderChartData,
  formatAgeRangeChartData,
  formatCountryChartData,
} from "../utils/chartData";
import type { User } from "../utils/types";

const GENDER_COLORS = ["#6366f1", "#ec4899"];

const Analytics: React.FC = () => {
  const { data: users = [], isLoading, error } = useGetUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const analytics = useMemo(() => {
    return calculateUserAnalytics(users);
  }, [users]);

  // Filter users based on selections
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const gender = selectedGender === "All" || user.gender === selectedGender;
      const ageRange =
        selectedAgeRange === "All" ||
        getAgeRange(user.age) === selectedAgeRange;
      const country =
        selectedCountry === "All" || user.address?.country === selectedCountry;

      const search =
        searchTerm === "" ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
      return gender && ageRange && country && search;
    });
  }, [users, selectedGender, selectedAgeRange, selectedCountry, searchTerm]);
  // Paginate users
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const genderChartData = useMemo(
    () => formatGenderChartData(analytics),
    [analytics],
  );
  const ageChartData = useMemo(
    () => formatAgeRangeChartData(analytics),
    [analytics],
  );
  const countryChartData = useMemo(
    () => formatCountryChartData(analytics),
    [analytics],
  );

  const handleClearFilters = () => {
    setSelectedGender("All");
    setSelectedAgeRange("All");
    setSelectedCountry("All");
    setCurrentPage(1);
  };

  const handleInputValue = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const uniqueGenders = ["All", ...new Set(users.map((u) => u.gender))];
  const uniqueAgeRanges = ["All", "7-17", "18-25", "26-35", "36-50", "50+"];
  const uniqueCountries = [
    "All",
    ...Array.from(
      new Set(users.map((u) => u.address?.country || "Unknown")),
    ).sort(),
  ];

  if (isLoading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-red-500">Error loading users data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          User Analytics
        </h1>
        <p className="text-gray-600">Comprehensive insights about your users</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {analytics.totalUsers.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-2">
                ↑ 12.5% vs last 30 days
              </p>
            </div>
            <Users className="w-12 h-12 text-purple-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Age</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {analytics.averageAge}
              </p>
              <p className="text-xs text-red-600 mt-2">
                ↓ 1.3% vs last 30 days
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Male / Female</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {analytics.malePercentage}% / {analytics.femalePercentage}%
              </p>
              <p className="text-xs text-green-600 mt-2">
                ↑ 3% / 3% vs last 30 days
              </p>
            </div>
            <Users className="w-12 h-12 text-pink-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Countries</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {analytics.countryDistribution.length}
              </p>
              <p className="text-xs text-green-600 mt-2">
                ↑ 8.4% vs last 30 days
              </p>
            </div>
            <Briefcase className="w-12 h-12 text-orange-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={selectedGender}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {uniqueGenders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range
              </label>
              <select
                value={selectedAgeRange}
                onChange={(e) => {
                  setSelectedAgeRange(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {uniqueAgeRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {uniqueCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Gender Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Gender Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => `${props.name} ${props.percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {genderChartData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => (value as number).toLocaleString()}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">Total: {analytics.totalUsers}</p>
          </div>
        </div>

        {/* Age Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Age Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: any) => (value as number).toLocaleString()}
              />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users by Country */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Users by Country
            </h3>
            <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
              View All
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={countryChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: any) => (value as number).toLocaleString()}
              />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b justify-between flex gap-4 border-gray-200 items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Users
            <p className="text-gray-600 text-sm font-normal">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </p>
          </h3>

          <div className="relative flex">
            <Search
              className="absolute left-3 top-4.5 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              onChange={(e) => handleInputValue(e.target.value)}
              type="text"
              placeholder="Search by name or email..."
              className="w-150 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Joined On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedUsers.map((user: User) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{user.age}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${user.gender === "female" ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-500"} `}
                    >
                      {user.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">
                      {user.address?.country || "N/A"}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">
                      {user.company?.name || "N/A"}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">
                      {new Date().toLocaleDateString()}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm text-gray-600 disabled:opacity-50"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                page = currentPage - 2 + i;
              }
              if (page <= totalPages) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === page
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="text-gray-600">...</span>
            )}
            {totalPages > 5 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === totalPages
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm text-gray-600 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
