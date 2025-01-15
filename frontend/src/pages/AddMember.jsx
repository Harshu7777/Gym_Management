import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    joiningDate: "",
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [memberships, setMemberships] = useState([]);

  // Fetch memberships from the server
  React.useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/membership", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setMemberships(response.data.memberships || []);
      } catch (err) {
        console.error("Error fetching memberships:", err);
        setError("Failed to fetch memberships");
      }
    };
    fetchMemberships();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("mobileNo", formData.mobileNo);
    form.append("address", formData.address);
    form.append("membership", formData.membership);
    form.append("joiningDate", formData.joiningDate);
    form.append("profilePic", formData.profilePic);

    try {
      await axios.post("http://localhost:8000/api/member/add-memberships", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Member added successfully!");
      navigate("/dashboard"); // Redirect after success
    } catch (err) {
      console.error("Error adding member:", err);
      setError(err.response?.data?.message || "Failed to add member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md space-y-4 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Add Member</h1>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Mobile Number"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          select
          label="Membership"
          name="membership"
          value={formData.membership}
          onChange={handleChange}
          required
        >
          {memberships.map((membership) => (
            <MenuItem key={membership._id} value={membership._id}>
              {membership.name} ({membership.months} months)
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          type="date"
          label="Joining Date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        <div>
          <label className="block mb-2 text-gray-600">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Member"}
        </Button>
      </form>
    </div>
  );
};

export default AddMember;
