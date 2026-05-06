import React, { useState } from "react";
import {
  Search,
  Bell,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Users as UsersIcon, UserCheck, UserPlus, UserX } from "lucide-react";
import { useGetUsers, useUpdateUser, useDeleteUser } from "../hooks/useUsers";
import type { User } from "../utils/types";

interface EditingUser extends Omit<
  User,
  "age" | "gender" | "address" | "company"
> {
  isOpen: boolean;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Inactive";
}

const Users: React.FC = () => {
  // API hooks
  const { data: users = [], isLoading: loading } = useGetUsers();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editFormData, setEditFormData] = useState<EditingUser | null>(null);

  const itemsPerPage = 5;

  // Search results
  const searchResults = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Paginated users
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const stats = [
    {
      label: "Total Users",
      value: users.length.toString(),
      icon: UsersIcon,
      color: "bg-indigo-100",
      iconColor: "text-indigo-600",
      change: "12.5%",
    },
    {
      label: "Active Users",
      value: users.filter((u) => u.status === "Active").length.toString(),
      icon: UserCheck,
      color: "bg-green-100",
      iconColor: "text-green-600",
      change: "8.2%",
    },
    {
      label: "New Users",
      value: (users.length * 0.15).toFixed(0),
      icon: UserPlus,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
      change: "24.1%",
    },
    {
      label: "Inactive Users",
      value: users.filter((u) => u.status === "Inactive").length.toString(),
      icon: UserX,
      color: "bg-red-100",
      iconColor: "text-red-600",
      change: "5.3%",
      negative: true,
    },
  ];

  const handleEditUser = (user: User) => {
    setEditingUser({
      ...user,
      isOpen: true,
      role: user.role || "Viewer",
      status: user.status || "Active",
    });
    setEditFormData({
      ...user,
      isOpen: true,
      role: user.role || "Viewer",
      status: user.status || "Active",
    });
  };

  const handleSaveChanges = () => {
    if (editFormData) {
      const { isOpen, ...userToUpdate } = editFormData;
      updateUserMutation.mutate(userToUpdate as User);
    }
    setEditingUser(null);
    setEditFormData(null);
  };

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
    setShowSearchResults(value.length > 0);
  };

  const handleSelectSearchResult = (user: User) => {
    setSearchTerm("");
    setShowSearchResults(false);
    handleEditUser(user);
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">Manage and monitor your users</p>
        </div>
        <div className="flex gap-2 lg:gap-4 items-center">
          <div className="relative flex-1 lg:flex-none">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-40 max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-gray-200 text-sm text-gray-600">
                  Users ({searchResults.length})
                  <a
                    href="#"
                    className="float-right text-indigo-600 hover:underline"
                  >
                    View all results
                  </a>
                </div>
                <div className="divide-y divide-gray-200">
                  {searchResults.slice(0, 5).map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSelectSearchResult(user)}
                      className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative shrink-0">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap shrink-0">
            <Plus size={20} />
            <span>Add User</span>
          </button>
          <button className="md:hidden flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shrink-0">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </h3>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <IconComponent size={20} className={stat.iconColor} />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              <p
                className={`text-xs lg:text-sm ${stat.negative ? "text-red-600" : "text-green-600"}`}
              >
                {stat.negative ? "↓" : "↑"} {stat.change} from last month
              </p>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Table Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
              />
            </div>
            <div className="flex gap-3 text-sm">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left font-semibold text-gray-600 uppercase">
                      USER
                    </th>
                    <th className="hidden md:table-cell px-4 lg:px-6 py-3 text-left font-semibold text-gray-600 uppercase">
                      EMAIL
                    </th>
                    <th className="hidden lg:table-cell px-4 lg:px-6 py-3 text-left font-semibold text-gray-600 uppercase">
                      ROLE
                    </th>
                    <th className="hidden lg:table-cell px-4 lg:px-6 py-3 text-left font-semibold text-gray-600 uppercase">
                      STATUS
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left font-semibold text-gray-600 uppercase">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.image}
                            alt={user.firstName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="hidden md:block">
                            <span className="font-medium text-gray-900 text-sm">
                              {user.firstName} {user.lastName}
                            </span>
                            <p className="text-gray-500 text-xs">
                              {user.email}
                            </p>
                          </div>
                          <div className="md:hidden">
                            <span className="font-medium text-gray-900 text-sm">
                              {user.firstName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 lg:px-6 py-4 text-gray-600 text-sm">
                        {user.email}
                      </td>
                      <td className="hidden lg:table-cell px-4 lg:px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                            user.role === "Admin"
                              ? "bg-indigo-100 text-indigo-600"
                              : user.role === "Editor"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-4 lg:px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 hover:text-indigo-600"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, users.length)} of{" "}
                {users.length} results
              </p>
              <div className="flex gap-2 justify-center md:justify-end">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ChevronLeft size={18} className="text-gray-600" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`w-8 h-8 rounded-lg font-medium text-sm transition-colors ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ChevronRight size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit User Slide Panel */}
      {editingUser?.isOpen && editFormData && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => {
              setEditingUser(null);
              setEditFormData(null);
            }}
          />

          {/* Slide Panel */}
          <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 shadow-lg overflow-y-auto slide-panel">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setEditFormData(null);
                  }}
                  className="text-gray-600 hover:text-gray-900 md:hidden"
                >
                  <X size={24} />
                </button>
              </div>

              {/* User Avatar */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={editFormData.image}
                    alt={editFormData.firstName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                    <Edit2 size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.firstName}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.lastName}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Role
                  </label>
                  <select
                    value={editFormData.role}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        role: e.target.value as "Admin" | "Editor" | "Viewer",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                  >
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Status
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editFormData.phone || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setEditFormData(null);
                  }}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .slide-panel {
          animation: slideInRight 0.3s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @media (min-width: 768px) {
          .slide-panel {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Users;
