import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    const filtered = donors.filter(donor => {
      return (
        (bloodType ? donor.bloodType === bloodType : true) &&
        (location ? donor.location.toLowerCase().includes(location.toLowerCase()) : true)
      );
    });
    setFilteredDonors(filtered);
  }, [bloodType, location, donors]);

  useEffect(() => {
    fetchDonors();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">BloodLink</h1>
        <div className="flex space-x-2">
          <Link to="/register/blood-bank">
            <Button>Register as Blood Bank</Button>
          </Link>
          <Link to="/register/donor">
            <Button>Register as Blood Donor</Button>
          </Link>
        </div>
      </div>

      <div className="mb-4">
         <Input
          type="text"
          placeholder="Search by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mb-2"
        />
        <select
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          className="mb-2 border rounded p-2"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.map((donor) => (
          <div key={donor.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="font-bold text-lg">{donor.name}</h2>
            <p>Blood Type: {donor.bloodType}</p>
            <p>Location: {donor.location}</p>
            {/* Add any additional donor information here */}
            <Button className="mt-2" onClick={() => alert(`Contact ${donor.name}`)}>Contact</Button>
          </div>
        ))}
      </div>

      {filteredDonors.length === 0 && (
        <p className="mt-4 text-center">No donors found matching your criteria.</p>
      )}

    </div>
  );
};

export default BloodSeekersPage;























































































