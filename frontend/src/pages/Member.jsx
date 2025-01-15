import React, { useState, useEffect } from "react";
import {
  Dumbbell,
  Plus,
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  Bell,
  Users,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { Plus, Dumbbell } from "react-feather";

function Member() {
  const [addMembership, setAddMembership] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [limit] = useState(9);
  const [noOfPage, setNoOfPage] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock data for demonstration
  const mockMembers = [
    {
      id: 1,
      name: "John Doe",
      membershipType: "Premium",
      joinDate: "2024-01-15",
      expiryDate: "2024-12-15",
      status: "active",
      photo:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Jane Smith",
      membershipType: "Standard",
      joinDate: "2024-02-01",
      expiryDate: "2024-08-01",
      status: "active",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Mike Johnson",
      membershipType: "Basic",
      joinDate: "2024-01-20",
      expiryDate: "2024-07-20",
      status: "expiring",
      photo:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    },
  ];

  useEffect(() => {
    // Simulating data fetch
    setData(mockMembers);
    setTotalData(mockMembers.length);
    setNoOfPage(Math.ceil(mockMembers.length / limit));
  }, [limit]);

  const navigate = useNavigate();

  const handleMembership = () => {
    // setAddMembership((prev) => !prev);
    navigate("/Addmember");
  };

  const handleMembers = () => {
    setAddMember((prev) => !prev);
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setStartFrom((newPage - 1) * limit);
      setEndTo(Math.min(newPage * limit, totalData));
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setStartFrom((newPage - 1) * limit);
      setEndTo(Math.min(newPage * limit, totalData));
    }
  };

  const handleSearchData = () => {
    if (search) {
      const filteredData = mockMembers.filter((member) =>
        member.name.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredData);
      setIsSearchModeOn(true);
      setTotalData(filteredData.length);
    } else {
      setData(mockMembers);
      setIsSearchModeOn(false);
      setTotalData(mockMembers.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="bg-slate-900 text-white rounded-t-xl p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <a
                  href="/dashboard"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Dashboard</span>
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleMembers}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Member</span>
                </button>

                <button
                  onClick={handleMembership}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                >
                  <Dumbbell className="w-5 h-5" />
                  <span>Membership</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by name or mobile number..."
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                  <button
                    onClick={handleSearchData}
                    className="absolute right-2 top-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 ml-4">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold">{totalData}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Members</p>
                  <p className="text-2xl font-bold">
                    {data.filter((m) => m.status === "active").length}
                  </p>
                </div>
                <Bell className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold">
                    {data.filter((m) => m.status === "expiring").length}
                  </p>
                </div>
                <Bell className="w-8 h-8 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Member List */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Members</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {startFrom + 1} - {endTo} of {totalData} Members
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === noOfPage}
                    className={`p-2 rounded-lg border ${
                      currentPage === noOfPage
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {data.map((member) => (
              <div
                key={member.id}
                className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">
                      {member.membershipType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Joined</p>
                    <p className="text-sm font-medium">{member.joinDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Expires</p>
                    <p className="text-sm font-medium">{member.expiryDate}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {member.status === "active" ? "Active" : "Expiring Soon"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Member;
