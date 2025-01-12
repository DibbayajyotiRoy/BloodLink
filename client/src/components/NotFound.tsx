import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

