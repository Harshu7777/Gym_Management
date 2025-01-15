import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!username || !email || !password || !avatar) {
      setError("Please fill in all fields, including the avatar.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      // Send the POST request to register the user
      const response = await axios.post("http://localhost:8000/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // For handling file uploads
        },
      });

      // Handle success response
      setSuccess(response.data.message);
      setError(""); // Clear previous error messages
      setTimeout(() => navigate("/dashboard"), 1000); // Redirect to login after successful registration
    } catch (error) {
      // Handle error response
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setSuccess(""); // Clear success message
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file); // Set avatar file
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Typography variant="h5" className="text-center text-gray-800 font-semibold mb-6">
          Create an Account
        </Typography>

        {/* Display success message */}
        {success && (
          <div className="text-green-500 text-center mb-4">
            <Typography>{success}</Typography>
          </div>
        )}

        {/* Display error message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            <Typography>{error}</Typography>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100"
            />
          </div>

          <div>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100"
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
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-gray-800 py-2 px-4 border border-gray-300 rounded-lg"
            />
            {avatar && (
              <div className="mt-4 text-center">
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar Preview"
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                />
              </div>
            )}
          </div>

          <div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              className="text-white py-2"
            >
              Register
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Typography variant="body2" className="text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
