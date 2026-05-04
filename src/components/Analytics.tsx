import React from "react";
import { BarChart3, TrendingUp, Users, Activity, ArrowUp } from "lucide-react";

const Analytics: React.FC = () => {
  const analyticsData = [
    {
      label: "Page Views",
      value: "128,543",
      icon: Activity,
      change: "21.3%",
    },
    {
      label: "Sessions",
      value: "45,231",
      icon: Users,
      change: "15.8%",
    },
    {
      label: "Bounce Rate",
      value: "42.3%",
      icon: BarChart3,
      change: "5.2%",
    },
    {
      label: "Avg Duration",
      value: "4m 32s",
      icon: TrendingUp,
      change: "8.1%",
    },
  ];

  const topPages = [
    { page: "Dashboard", views: 12543, users: 2543, bounceRate: "32.1%" },
    { page: "Users Management", views: 8932, users: 1854, bounceRate: "28.5%" },
    { page: "Analytics", views: 7821, users: 1632, bounceRate: "35.2%" },
    { page: "Settings", views: 5643, users: 987, bounceRate: "42.1%" },
    { page: "Profile", views: 4532, users: 876, bounceRate: "31.8%" },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">
          Track your website performance and user behavior
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-medium text-sm">
                  {metric.label}
                </h3>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <IconComponent size={24} className="text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {metric.value}
              </p>
              <div className="flex items-center gap-2">
                <ArrowUp size={16} className="text-green-600" />
                <p className="text-sm text-green-600">
                  {metric.change} vs last week
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Traffic Over Time
          </h2>
          <div className="h-64 bg-linear-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Line chart would display here</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Traffic Sources
          </h2>
          <div className="h-64 bg-linear-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Pie chart would display here</p>
          </div>
        </div>
      </div>

      {/* Top Pages Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Top Pages</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  PAGE
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  VIEWS
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  USERS
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  BOUNCE RATE
                </th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.page}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.users.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.bounceRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
