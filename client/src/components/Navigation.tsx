import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Droplet className="h-8 w-8 text-red-600" />
          <span className="text-2xl font-bold text-gray-800">BloodLink</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
            <li><Link to="/bloodseekers" className="text-gray-600 hover:text-gray-800">Find Blood</Link></li>
            <li><Link to="/register/donor" className="text-gray-600 hover:text-gray-800">Become a Donor</Link></li>
            <li>
              <Link to="/register/blood-bank">
                <Button variant="outline">Register Blood Bank</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

