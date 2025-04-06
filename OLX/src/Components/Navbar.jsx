import React, { useState } from "react";
import { FiSearch, FiHeart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import sell from "../assets/sell.svg";
import olxLogo from "../assets/olxLogo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = async () => {
    if (user) {
      await logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-6 pl-8">
        <Link to="/">
          <img src={olxLogo} alt="OLX" className="h-8 w-auto" />
        </Link>
        <div className="pl-16">
          <select className="border border-gray-300 px-6 py-1 mx-6 max-w-m rounded text-sm text-gray-800">
            <option value="india">India</option>
            <option value="pakistan">Pakistan</option>
            <option value="uae">UAE</option>
          </select>
        </div>
      </div>

      <div className="hidden md:flex items-center flex-grow max-w-2xl mx-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none"
        />
        <button className="bg-black text-white px-4 py-2.5">
          <FiSearch size={18} />
        </button>
      </div>

      <div className="hidden sm:flex items-center space-x-6">
      <select className="text-sm text-gray-800 bg-transparent focus:outline-none">
          <option value="en">ENGLISH</option>
          <option value="hi">हिंदी</option>
        </select>

        <FiHeart className="text-gray-700 hover:text-red-500 cursor-pointer" size={20} title="Wishlist" />

        <button onClick={handleAuthClick} className="text-sm font-semibold hover:underline">
          {user ? "Logout" : "Login"}
        </button>

        <Link to={user ? "/sell" : "/login"} className="relative">
          <img src={sell} alt="Sell" className="w-24 h-10 object-cover rounded-md" />
          <span className="absolute inset-0 flex items-center justify-center font-bold text-black text-[15px]">
            + Sell
          </span>
        </Link>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md p-4 md:hidden space-y-3">
          <select className="w-full border px-3 py-2 rounded-md text-sm text-gray-600">
            <option value="india">India</option>
            <option value="pakistan">Pakistan</option>
            <option value="uae">UAE</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            className="w-full border px-3 py-2 rounded-md text-sm"
          />

          <div className="flex justify-between items-center">
            <button onClick={handleAuthClick} className="text-sm">
              {user ? "Logout" : "Login"}
            </button>
            <FiHeart className="text-gray-600 hover:text-red-500 cursor-pointer" size={20} />
          </div>

          <Link to={user ? "/sell" : "/login"}>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm px-4 py-2 rounded-full font-semibold">
              + Sell
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
