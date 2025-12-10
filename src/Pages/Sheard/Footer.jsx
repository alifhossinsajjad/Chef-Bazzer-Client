import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <div className="relative pt-16 mt-20">
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 pt-20 pb-12">
          {/* Newsletter Section */}
          <div className="w-full max-w-4xl mx-auto text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with <span className="text-orange-500">Deliciousness</span>
            </h2>
            <p className="mb-8 text-gray-400">Subscribe for exclusive offers, new menu alerts, and culinary tips.</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full sm:w-80 rounded-full bg-gray-800 border-gray-700 text-white focus:outline-none focus:border-orange-500"
              />
              <button className="btn btn-primary bg-orange-600 hover:bg-orange-700 border-none rounded-full px-8 text-white flex items-center gap-2">
                Subscribe <FaPaperPlane />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-gray-800 pt-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 mb-2">
                <img src={logo} alt="ChefCorner Logo" className="w-12 h-12 rounded-full" />
                <h3 className="text-2xl font-bold text-white">Chef<span className="text-orange-500">Corner</span></h3>
              </Link>
              <p className="text-sm leading-relaxed">
                Bringing the finest culinary experiences directly to your doorstep. Fresh ingredients, passionate chefs, and unforgettable flavors.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300">
                  <FaFacebookF />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Home
                  </Link>
                </li>
                <li>
                  <Link to="/meals" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Meals
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> About Us
                  </Link>
                </li>
               
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-orange-500 mt-1" />
                  <span>Dhaka, Bangladesh -1310</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-orange-500" />
                  <span>+880 1824225331</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-orange-500" />
                  <span>alifhossinsajjad123456@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* App Download (Dummy) */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Get the App</h4>
              <p className="text-sm mb-4">Order on the go with our mobile app. Available for iOS and Android.</p>
              <div className="flex flex-col gap-3">
                <button className="btn btn-outline border-gray-600 text-white hover:bg-white hover:text-black hover:border-white justify-start normal-case">
                  <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6 mr-2">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-bold leading-none">App Store</div>
                  </div>
                </button>
                <button className="btn btn-outline border-gray-600 text-white hover:bg-white hover:text-black hover:border-white justify-start normal-case">
                  <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6 mr-2">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-bold leading-none">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} ChefCorner. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
