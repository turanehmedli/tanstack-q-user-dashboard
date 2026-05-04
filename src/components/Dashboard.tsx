import React from "react";
import {
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const stats = [
    {
      label: "Total Revenue",
      value: "$45,231",
      change: "12.5%",
      positive: true,
      icon: DollarSign,
    },
    {
      label: "Active Users",
      value: "1,208",
      change: "8.2%",
      positive: true,
      icon: Users,
    },
    {
      label: "Growth Rate",
      value: "24.5%",
      change: "3.1%",
      positive: false,
      icon: TrendingUp,
    },
    {
      label: "Engagement",
      value: "68.2%",
      change: "4.3%",
      positive: true,
      icon: Activity,
    },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your performance overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </h3>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <IconComponent size={24} className="text-indigo-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              <div className="flex items-center gap-2">
                {stat.positive ? (
                  <ArrowUp size={16} className="text-green-600" />
                ) : (
                  <ArrowDown size={16} className="text-red-600" />
                )}
                <p
                  className={`text-sm ${stat.positive ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change} from last month
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Revenue Trend
          </h2>
          <div className="h-64 bg-linear-to-br from-indigo-50 to-blue-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            User Distribution
          </h2>
          <div className="h-64 bg-linear-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
