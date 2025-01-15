import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout API directly
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {}, // Empty body for POST request
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Ensure token is included
          },
        }
      );

      if (response.status === 200) {
        // Clear local storage or session storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        // Redirect to login page
        navigate("/login");
      } else {
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Logout</h1>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
