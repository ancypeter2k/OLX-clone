import React from "react";
import googleplay from '../assets/Footer/googleplay.webp'
import appstore from '../assets/Footer/appstore.webp'
import { FaGlobe, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="font-semibold mb-3">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Cars</a></li>
            <li><a href="#" className="hover:underline">Mobile Phones</a></li>
            <li><a href="#" className="hover:underline">Jobs</a></li>
            <li><a href="#" className="hover:underline">Bikes</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-3">Trending Searches</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">iPhone</a></li>
            <li><a href="#" className="hover:underline">Used Cars</a></li>
            <li><a href="#" className="hover:underline">Jobs in Dubai</a></li>
            <li><a href="#" className="hover:underline">Pets</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-3">About OLX</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">OLX Blog</a></li>
          </ul>
        </div>

        {/* Column 4 - Socials / Apps */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
          <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600">
                <FaGlobe size={20} />
              </a>
              <a href="#" className="hover:text-blue-500">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-pink-500">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-sky-400">
                <FaTwitter size={20} />
              </a>
          </div>
          </div>
          <h4 className="font-semibold mb-2 text-sm">Get Our App</h4>
          <div className="flex space-x-2">
            <img src={googleplay} alt="Google Play" className="h-10" />
            <img src={appstore} alt="App Store" className="h-10" />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8 border-t pt-4">
        © {new Date().getFullYear()} OLX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
