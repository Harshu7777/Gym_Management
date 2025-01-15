import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }, // Correctly defined formData
        {
          headers: {
            "Content-Type": "application/json", // JSON format for sending data
          },
        }
      );

      // Handle success response
      setError(""); // Clear any previous errors
      setTimeout(() => navigate("/dashboard"), 1000); // Redirect after success
    } catch (err) {
      // Handle error response
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Typography variant="h5" className="text-center text-gray-800 font-semibold mb-6">
          Login
        </Typography>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            <Typography>{error}</Typography>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100"
              error={!email && error === "Please fill in all fields"} // Visual feedback for empty email
              helperText={!email && error === "Please fill in all fields" ? "Email is required" : ""}
            />
          </div>

          <div>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100"
              error={!password && error === "Please fill in all fields"} // Visual feedback for empty password
              helperText={!password && error === "Please fill in all fields" ? "Password is required" : ""}
            />
          </div>

          <div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              className="text-white py-2"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Typography variant="body2" className="text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer"
            >
              Sign Up
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
