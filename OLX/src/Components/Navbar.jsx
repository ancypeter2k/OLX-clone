import React, { useState } from "react";
import { FiSearch, FiHeart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../../src/assets/arrow-down.svg";
import sell from "../assets/sell.svg";
import olxLogo from "../assets/olxLogo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import profile from '../assets/profile_img.png';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) return null; 

  return (
    <div>
      <nav className="bg-white shadow-md px-4 py-2 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 pl-8">
            <Link to="/">
              <img src={olxLogo} alt="OLX" className="h-8 w-auto" />
            </Link>
            <div className="pl-10">
              <select className="border border-gray-300 px-6 py-1 mx-6 max-w-m rounded text-sm text-gray-800">
                <option value="india">India</option>
                <option value="pakistan">Pakistan</option>
                <option value="uae">UAE</option>
              </select>
            </div>
          </div>

          <div className="hidden md:flex items-center flex-grow max-w-2xxl mx-6">
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones, and More..."
              className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none"
            />
            <button className="bg-black text-white px-4 py-2.5">
              <FiSearch size={18} />
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            <select className="text-sm text-gray-800 bg-transparent  border-none">
              <option value="en">ENGLISH</option>
              <option value="hi">हिंदी</option>
            </select>

            <FiHeart
              className="text-gray-700 hover:text-blue-300 cursor-pointer"
              size={20}
              title="Wishlist"
              onClick={() => navigate('/wishlist')}
            />

            {!user ? (
              <Link
                to="/signin"
                className="font-bold underline ml-5 cursor-pointer text-[#002f34]"
              >
                Login
              </Link>
            ) : (
              <div
                className="flex items-center space-x-2 ml-5 cursor-pointer text-[#002f34] font-bold"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={user.photoURL || profile}
                  alt="Profile"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <p>{user.displayName?.split(" ")[0]}</p>
              </div>
            )}

            <div className="relative cursor-pointer" onClick={() => navigate("/sell")}>
              <img
                src={sell}
                alt="sell"
                className="w-24 h-10 object-cover rounded-md"
              />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-black text-[15px]">
                + Sell
              </span>
            </div>
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
        </div>

        {/* Category Navigation */}
        <div className="flex items-center space-x-6 px-10 mt-3 overflow-x-auto text-sm font-medium">
          <div className="flex items-center relative">
            <p className="font-semibold uppercase text-sm">All Categories</p>
            <img
              className="w-4 ml-2 cursor-pointer"
              src={arrow}
              alt="dropdown"
            />
          </div>
          <p className="cursor-pointer">Cars</p>
          <p className="cursor-pointer">Motorcycles</p>
          <p className="cursor-pointer">Mobile Phones</p>
          <p className="cursor-pointer">For Sale: Houses & Apartments</p>
          <p className="cursor-pointer">Scooters</p>
          <p className="cursor-pointer">Commercial & Other Vehicles</p>
          <p className="cursor-pointer">For Rent: Houses & Apartments</p>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3">
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
            <span className="text-sm">Wishlist</span>
            <FiHeart
              className="text-gray-600 hover:text-red-500 cursor-pointer"
              size={20}
              onClick={() => navigate("/wishlist")}
            />
          </div>

          <button
            onClick={() => navigate(user ? "/sell" : "/signin")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm px-4 py-2 rounded-full font-semibold"
          >
            + Sell
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
