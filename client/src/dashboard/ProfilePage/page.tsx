import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Droplet, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "react-toastify";

// Helper function to decode JWT token
const decodeToken = (token: string) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

interface Donor {
  id: string;
  name: string;
  email: string;
  number: string;
  bloodType: string;
  subdivision: string;
}

const ProfilePage: React.FC = () => {
  const { id: paramId } = useParams<{ id: string }>();
  const [donor, setDonor] = useState<Donor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedDonor, setUpdatedDonor] = useState<Donor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorProfile = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        const userType = localStorage.getItem("userType");

        if (!token || !userType) {
          toast.error("Access denied. Please log in.");
          navigate("/login");
          return;
        }

        const decodedToken = decodeToken(token);
        const id = decodedToken.id;

        if (userType === "blooddonor") {
          const response = await axios.post(
            "http://localhost:3000/blooddonor/profile",
            { id }, // Pass the donor's ID explicitly here
            {
              headers: {
                token, // Pass the token in headers
              },
            }
          );
          setDonor(response.data);
        } else {
          const response = await axios.get(`http://localhost:3000/bloodbank/profile`);
          setDonor(response.data);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching donor data:", err);
        setError("Failed to load donor profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonorProfile();
  }, [paramId, navigate]);

  const handleUpdateClick = () => {
    setShowUpdateForm(true); // Show the update form
    setUpdatedDonor(donor); // Pre-fill the form with current donor data
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedDonor({
      ...updatedDonor!,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmUpdate = async () => {
    if (updatedDonor) {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = decodeToken(token || "");

        // Explicitly include `id` in the request body
        const requestBody = { ...updatedDonor, id: decodedToken.id };

        await axios.put(
          "http://localhost:3000/blooddonor/update",
          requestBody, // Send `id` along with other fields
          {
            headers: {
              token, // Include JWT token in headers
            },
          }
        );

        toast.success("Profile updated successfully!");
        setShowUpdateForm(false);
        setDonor(updatedDonor); // Update the donor state
      } catch (err) {
        console.error("Error updating donor profile:", err);
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  const handleCancelUpdate = () => {
    setShowUpdateForm(false); // Hide the form if the user cancels
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-center">
          <p className="text-xl font-semibold">Donor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white py-6 px-8">
          <div className="flex items-center space-x-6">
            <div className="bg-white rounded-full p-3">
              <Droplet className="h-12 w-12 text-red-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{donor.name}</h1>
              <p className="text-xl font-medium text-red-200">Blood Type: {donor.bloodType}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-gray-50 px-8 py-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-gray-600" />
              <p className="text-lg text-gray-700">{donor.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-gray-600" />
              <p className="text-lg text-gray-700">{donor.number}</p>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-gray-600" />
              <p className="text-lg text-gray-700">{donor.subdivision}</p>
            </div>

            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={handleUpdateClick}
            >
              Update Profile
            </button>

            {showUpdateForm && (
              <div className="mt-6 p-4 bg-gray-200 rounded-md">
                <h3 className="text-xl font-semibold">Are you sure you want to update your profile?</h3>
                <div className="space-y-4 mt-4">
                  {/* Name Field */}
                  <div className="flex items-center space-x-4">
                    <label className="text-lg">Name:</label>
                    <input
                      title="name"
                      type="text"
                      name="name"
                      value={updatedDonor?.name || ""}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md"
                    />
                  </div>
                  {/* Email Field */}
                  <div className="flex items-center space-x-4">
                    <label className="text-lg">Email:</label>
                    <input
                      title="email"
                      type="email"
                      name="email"
                      value={updatedDonor?.email || ""}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md"
                    />
                  </div>
                  {/* Number Field */}
                  <div className="flex items-center space-x-4">
                    <label className="text-lg">Phone Number:</label>
                    <input
                     title="number"
                      type="text"
                      name="number"
                      value={updatedDonor?.number || ""}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md"
                    />
                  </div>
                  {/* Blood Type Field */}
                  <div className="flex items-center space-x-4">
                    <label className="text-lg">Blood Type:</label>
                    <input
                      title="bloodType"
                      type="text"
                      name="bloodType"
                      value={updatedDonor?.bloodType || ""}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md"
                    />
                  </div>
                  {/* Subdivision Field */}
                  <div className="flex items-center space-x-4">
                    <label className="text-lg">Subdivision:</label>
                    <input
                      title="subdivision"
                      type="text"
                      name="subdivision"
                      value={updatedDonor?.subdivision || ""}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4 flex space-x-4">
                  <button
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={handleConfirmUpdate}
                  >
                    Yes, Update
                  </button>
                  <button
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={handleCancelUpdate}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
