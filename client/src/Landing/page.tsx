"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Droplet, Heart, Users, ArrowRight } from "lucide-react"
import Footer from "@/components/Footer"

// Helper function to decode JWT token
function decodeToken(token: string) {
  const payload = token.split(".")[1]
  return JSON.parse(atob(payload))
}

const LandingPage = () => {
  const [bloodBankName, setBloodBankName] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decodedToken = decodeToken(token)
        if (decodedToken && decodedToken.name) {
          setBloodBankName(decodedToken.name)
        }
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }
  }, [])

  return (
    <div className="flex flex-col h-screen min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">BloodLink</span>
          </Link>
          <div className="flex space-x-2">
            {bloodBankName ? (
              <div className="flex items-center space-x-2">
                <Droplet className="h-5 w-5 text-red-600" />
                <span className="text-gray-700 font-semibold">{bloodBankName}</span>
              </div>
            ) : (
              <>
                <Link to="/register/blood-bank">
                  <Button variant="outline" className="hidden md:inline-flex">
                    Register as Blood Bank
                  </Button>
                </Link>
                <Link to="/register/donor">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Become a Donor</Button>
                </Link>
              </>
            )}
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
              Join our community of heroes. Every drop counts in our mission to ensure everyone has access to
              life-saving blood.
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
              src="https://i.pinimg.com/1200x/14/8d/ef/148def07f994486fb660fbc48ba24823.jpg"
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

      <Footer />
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100">
    {icon}
    <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default LandingPage
