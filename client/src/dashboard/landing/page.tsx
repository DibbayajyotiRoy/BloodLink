import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface BloodDonor {
  id: number;
  name: string;
  bloodType: string;
  location: string;
}

const BloodSeekersPage = () => {
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<BloodDonor[]>([]);
  const [bloodType, setBloodType] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  // Fetch donors from the API
  const fetchDonors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blooddonors"); // Adjust the endpoint as necessary
      setDonors(response.data);
      setFilteredDonors(response.data); // Initialize filtered donors
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  // Filter donors based on blood type and location
  useEffect(() => {
    const filtered = donors.filter((donor) => {
      return (
        (bloodType ? donor.bloodType === bloodType : true) &&
        (location
          ? donor.location.toLowerCase().includes(location.toLowerCase())
          : true)
      );
    });
    setFilteredDonors(filtered);
  }, [bloodType, location, donors]);

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    // <div className="container mx-auto p-4">
    <div className="min-h-screen ">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
        <div className="w-full mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">BloodLink</h1>
          <div className="flex space-x-4">
            <Link to="/register/donor">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Register as Donor
              </Button>
            </Link>
            <Link to="/register/blood-bank">
              <Button className="bg-red-600 text-white hover:bg-red-700">
                Register as Blood Bank
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 w-full p-4">
        {/* Search Section */}
        <div className=" bg-slate-100 p-6 rounded-lg shadow- mb-6 w-full">
          <h2 className="text-xl font-semibold mb-4">
            Search for Blood Donors
          </h2>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          >
            <option value="">Select your Sub-Division</option>
            <option value="Dukli">Dukli</option>
            <option value="Jirania">Jirania</option>
            <option value="Mohanpur">Mohanpur</option>
            <option value="Mandwi">Mandwi</option>
            <option value="Khowai">Khowai</option>
            <option value="Teliamura">Teliamura</option>
            <option value="Tulasikhar">Tulasikhar</option>
            <option value="Bishalgarh">Bishalgarh</option>
            <option value="Melaghar">Melaghar</option>
            <option value="Matabari">Matabari</option>
            <option value="Amarpur">Amarpur</option>
            <option value="Rajnagar">Rajnagar</option>
            <option value="Bakafa">Bakafa</option>
            <option value="Satchand">Satchand</option>
            <option value="Rupaichari">Rupaichari</option>
            <option value="Kadamtala">Kadamtala</option>
            <option value="Kanchanpur">Kanchanpur</option>
            <option value="Panisagar">Panisagar</option>
            <option value="Salema">Salema</option>
            <option value="Gandacherra">Gandacherra</option>
            <option value="Chawmanu">Chawmanu</option>
          </select>
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Donors List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white border rounded-lg p-4 shadow-md"
            >
              <h2 className="font-bold text-lg">{donor.name}</h2>
              <p>Blood Type: {donor.bloodType}</p>
              <p>Location: {donor.location}</p>
              <Button
                className="mt-2 bg-green-600 text-white hover:bg-green-700"
                onClick={() => alert(`Contact ${donor.name}`)}
              >
                Contact
              </Button>
            </div>
          ))}
        </div>

        {/* No Donors Found Message */}
        {filteredDonors.length === 0 && (
          <p className="mt-6 text-center text-gray-600">
            No donors found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default BloodSeekersPage;
