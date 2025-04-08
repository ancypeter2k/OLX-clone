import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom"; // 👈 for redirect
import defaultProfile from "../assets/profile_img.png";

const Profile = () => {
  const { user, logout } = useAuth(); // 👈 access logout
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const navigate = useNavigate(); // 👈 for navigation

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [user]);

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (!user || !user.email) {
    return (
      <p className="text-center mt-10 text-red-500">You are not logged in.</p>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/sign-in"); // 👈 redirect after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-300 object-cover mb-4"
          />
          <label className="text-blue-600 hover:underline cursor-pointer text-sm">
            Change Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
        <div className="text-left space-y-2 mb-6">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user.uid}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
