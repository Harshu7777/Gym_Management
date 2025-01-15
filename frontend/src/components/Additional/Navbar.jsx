import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../services/authServices.js"; // Import the AuthServices for authentication-related operations

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user's authentication status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Update the state based on the token's presence
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API
      await AuthServices.logout();
      // Clear the token from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user"); // Optional: Remove stored user data
      setIsAuthenticated(false); // Update the authentication state
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#1F2937" }}> {/* Tailwind's bg-gray-800 */}
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section: Logo */}
        <Typography
          variant="h6"
          component="div"
          style={{
            color: "#FACC15", // Tailwind's text-yellow-400
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Fitness<span style={{ color: "red" }}>GYM🏋️‍♀️</span>
        </Typography>

        {/* Center Section: Navigation Links */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button style={{ color: "#fff" }} href="/">
            Home
          </Button>
          <Button style={{ color: "#FFFFFF" }} href="/about">
            About
          </Button>
          <Button style={{ color: "#fff", background: "red" }} href="/member">
            Show members
          </Button>

          {/* Conditionally render Login or Logout button */}
          {isAuthenticated ? (
            <Button style={{ color: "#FFFFFF" }} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button style={{ color: "#FFFFFF" }} href="/login">
              Login
            </Button>
          )}

          <Button style={{ color: "#FFFFFF" }} href="/register">
            SignUp
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
