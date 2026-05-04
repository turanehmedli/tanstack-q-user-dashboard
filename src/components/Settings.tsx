import React, { useState } from "react";
import { Save, Bell, Lock, User, Eye, EyeOff } from "lucide-react";

const Settings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account and application preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <User size={20} className="text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Account Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Company
              </label>
              <input
                type="text"
                placeholder="Your Company Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={20} className="text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Security</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell size={20} className="text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive email updates about your account
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-600">
                  Get text messages for important alerts
                </p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">
                  Enable browser notifications
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">Marketing Emails</p>
                <p className="text-sm text-gray-600">
                  Receive news about new features
                </p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <Save size={20} />
            Save Changes
          </button>
          {isSaved && (
            <div className="flex items-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg">
              <span className="text-sm font-medium">
                ✓ Changes saved successfully
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
