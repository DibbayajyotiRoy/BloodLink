import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To extract the ID from URL
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BloodBank {
  name: string;
  district: string;
  email: string;
  number: string;
  state: string;
}

interface BloodQuantities {
  A_positive: number;
  A_negative: number;
  B_positive: number;
  B_negative: number;
  O_positive: number;
  O_negative: number;
  AB_positive: number;
  AB_negative: number;
}

const BloodBankProfilePage = () => {
  const { id } = useParams<{ id: string }>(); // Extract the ID from the URL
  const [bloodBank, setBloodBank] = useState<BloodBank | null>(null);
  const [bloodQuantities, setBloodQuantities] = useState<BloodQuantities | null>(null);

  // Fetch blood bank and blood quantities data
  const fetchBloodBankDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/bloodbank/find-bank", // Send a POST request with the ID
        { id } // Sending ID in the request body
      );
      const { bloodBankDetails, bloodQuantities } = response.data;
      setBloodBank(bloodBankDetails); // Set the blood bank details
      setBloodQuantities(bloodQuantities?.quantities); // Set the blood quantities
    } catch (error) {
      console.error("Error fetching blood bank data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBloodBankDetails();
    }
  }, [id]);

  if (!bloodBank || !bloodQuantities) {
    return <p>Loading blood bank details...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      <header className="sticky top-0 z-10 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">BloodLink</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="border-2 border-gray-200 rounded-lg p-6 shadow-md bg-white hover:shadow-xl transition duration-300 ease-in-out">
          {/* Blood Bank Information */}
          <h2 className="font-bold text-2xl text-gray-800 mb-4">{bloodBank.name}</h2>
          <p className="text-lg"><strong>Location:</strong> {bloodBank.district}, {bloodBank.state}</p>
          <p className="text-lg"><strong>Email:</strong> {bloodBank.email}</p>
          <p className="text-lg"><strong>Contact:</strong> {bloodBank.number}</p>

          <h3 className="mt-6 text-xl font-semibold text-gray-800">Available Blood Quantities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">A+ </p>
              <p className="text-md">{bloodQuantities.A_positive} units</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">A- </p>
              <p className="text-md">{bloodQuantities.A_negative} units</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">B+ </p>
              <p className="text-md">{bloodQuantities.B_positive} units</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">B- </p>
              <p className="text-md">{bloodQuantities.B_negative} units</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">O+ </p>
              <p className="text-md">{bloodQuantities.O_positive} units</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">O- </p>
              <p className="text-md">{bloodQuantities.O_negative} units</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">AB+ </p>
              <p className="text-md">{bloodQuantities.AB_positive} units</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">AB- </p>
              <p className="text-md">{bloodQuantities.AB_negative} units</p>
            </div>
          </div>

          {/* Go back button to the previous page */}
          <Link to="/bloodseekers">
            <Button className="mt-6">Back to Blood Seekers</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BloodBankProfilePage;
