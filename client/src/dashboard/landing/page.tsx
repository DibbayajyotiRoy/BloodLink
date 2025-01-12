"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Heart, Users, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">BloodLink</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-gray-800 transition">About</Link>
            <Link to="/donate" className="text-gray-600 hover:text-gray-800 transition">Donate</Link>
            <Link to="/bloodseekers" className="text-gray-600 hover:text-gray-800 transition">Find Blood</Link>
          </nav>
          <div className="flex space-x-2">
            <Link to="/register/blood-bank">
              <Button variant="outline" className="hidden md:inline-flex">Register as Blood Bank</Button>
            </Link>
            <Link to="/register/donor">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Become a Donor</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Donation <span className="text-red-600">Saves Lives</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Join our community of heroes. Every drop counts in our mission to ensure everyone has access to life-saving blood.
            </p>
            <div className="flex space-x-4">
              <Link to="/bloodseekers">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  Get Started
                </Button>
              </Link>
              <Link to="/learn-more">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/placeholder.svg?height=400&width=400" 
              alt="Blood Donation Illustration" 
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Donate Blood?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Heart className="h-12 w-12 text-red-600" />}
                title="Save Lives"
                description="Your donation can save up to 3 lives with a single pint of blood."
              />
              <FeatureCard 
                icon={<Droplet className="h-12 w-12 text-red-600" />}
                title="Always Needed"
                description="Every 2 seconds, someone in the world needs blood."
              />
              <FeatureCard 
                icon={<Users className="h-12 w-12 text-red-600" />}
                title="Community Impact"
                description="Strengthen your community by helping those in urgent need."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-red-600 text-white py-12 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8">Join our community of donors and start saving lives today.</p>
            <Link to="/register/donor">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Register as a Donor <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">BloodLink</h3>
              <p className="text-gray-400">Connecting donors to save lives</p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
              <Link to="/about" className="hover:text-red-400 transition">About</Link>
              <Link to="/contact" className="hover:text-red-400 transition">Contact</Link>
              <Link to="/privacy" className="hover:text-red-400 transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-red-400 transition">Terms of Service</Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BloodLink Blood Donation Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100">
    {icon}
    <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);



export default LandingPage;

