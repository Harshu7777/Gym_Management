import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Menu,
  BarChart3,
  Users,
  Clock,
  AlertTriangle,
  BadgeAlert,
  Bell,
  Search,
  TrendingUp,
  Activity,
  LogOut,
} from "lucide-react";

function Dashboard() {
  const [accordionDashboard, setAccordionDashboard] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState({
    fullname: "Admin User",
    role: "Gym Manager",
    avatar: "",
  });
  const ref = useRef(null);
  const notificationRef = useRef(null);

  const BASE_URL = "http://localhost:8000/api";

  // Fetch user data from sessionStorage or API
  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Fetch members data on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/members/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`);
      sessionStorage.clear();
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleOnClickMenu = (value) => {
    sessionStorage.setItem("func", value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Bar */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="bg-slate-900 text-white rounded-t-xl p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setAccordionDashboard((prev) => !prev)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Gym Management System</h1>
              </div>

              <div className="flex items-center space-x-6">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="w-5 h-5 absolute right-3 top-2.5 text-slate-400" />
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative"
                  >
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium">{user.fullname}</p>
                    <p className="text-xs text-slate-300">{user.role}</p>
                  </div>
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src={
                      user.avatar ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                    }
                    alt="Profile"
                  />
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <LogOut className="w-6 h-6 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Member List */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <p className="text-lg font-semibold">{member.name}</p>
                  <p className="text-gray-600">{member.email}</p>
                  <p className="text-sm text-gray-500">Plan: {member.plan}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
