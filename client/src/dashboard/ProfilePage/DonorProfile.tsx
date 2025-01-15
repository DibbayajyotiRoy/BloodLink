import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // To extract the ID from URL
import axios from "axios";
import { Button } from "@/components/ui/button"; // Assuming Button component is from your UI library


interface Donor {
  name: string;
  email: string;
  number: string;
  bloodType: string;
  subdivision: string;
}

const DonorProfilePage = () => {
  const { id } = useParams<{ id: string }>(); // Extract the ID from the URL
  const [donor, setDonor] = useState<Donor | null>(null);

  // Fetch donor data
  const fetchDonorDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/blooddonor/find-donor", // Send a POST request with the ID
        { id } // Sending ID in the request body
      );
      const { donorDetails } = response.data;
      setDonor(donorDetails); // Set the donor details
    } catch (error) {
      console.error("Error fetching donor data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDonorDetails();
    }
  }, [id]);

  if (!donor) {
    return <p>Loading donor details...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">BloodLink</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="border-2 border-gray-200 rounded-lg p-6 shadow-md bg-white hover:shadow-xl transition duration-300 ease-in-out">
          {/* Donor Information */}
          <h2 className="font-bold text-2xl text-gray-800 mb-4">{donor.name}</h2>
          <p className="text-lg"><strong>Email:</strong> {donor.email}</p>
          <p className="text-lg"><strong>Contact:</strong> {donor.number}</p>
          <p className="text-lg"><strong>Blood Type:</strong> {donor.bloodType}</p>
          <p className="text-lg"><strong>Subdivision:</strong> {donor.subdivision}</p>

          {/* Go back button */}
          <Link to="/bloodseekers">
            <Button className="mt-6">Back to Blood Seekers</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorProfilePage;
