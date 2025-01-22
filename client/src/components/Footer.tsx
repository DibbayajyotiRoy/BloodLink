import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">BloodLink</h3>
            <p className="text-gray-400">Connecting donors to save lives</p>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
              <li><Link to="/about" className="hover:text-red-400 transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition">Contact</Link></li>
              {/* <li><Link to="/privacy" className="hover:text-red-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-red-400 transition">Terms of Service</Link></li> */}
            </ul>
          </nav>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BloodLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

