import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Droplet } from 'lucide-react';
import { toast } from 'react-toastify';

// Helper function to decode JWT token
function decodeToken(token: string) {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const BloodBankDashboard: React.FC = () => {
  const [bloodQuantities, setBloodQuantities] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);
  const [bloodBankName, setBloodBankName] = useState<string>("");

  // Fetch blood bank name from the token when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        console.log("Decoded Token:", decodedToken); // Log the entire decoded token
        if (decodedToken && decodedToken.name) {
          setBloodBankName(decodedToken.name); // Assuming blood bank name is in the token
        } else {
          setError("Blood bank name not found in token.");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setError("Invalid token format.");
      }
    } else {
      setError("No token found. Please login.");
    }
  }, []);

  const handleSubmitBloodUnits = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("No token found. Please login.");
      return;
    }
  
    const updatedBloodUnits = bloodTypes.map((type) => ({
      bloodType: type,
      quantity: bloodQuantities[type] || 0,
    }));
  
    try {
      // Send the updated data and token to the backend in the 'token' header
      const response = await axios.post(
        'http://localhost:3000/bloodbank/add-bloods',
        updatedBloodUnits,
        {
          headers: {
            token: token, // Include the token in the 'token' header (not 'Authorization')
          },
        }
      );
      console.log(response)
      toast.success('Blood units updated successfully!');
    } catch (error) {
      console.error('Error submitting blood units:', error);
      toast.error('Failed to update blood units. Please try again later.');
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      {bloodBankName && <h1 className="text-2xl font-bold mb-4">Welcome, {bloodBankName}</h1>}
      
      <h2 className="text-xl font-semibold mb-2">Update Blood Units</h2>
      <ul className="space-y-2">
        {bloodTypes.map((type) => (
          <Card key={type} className="flex justify-between items-center p-2 border rounded shadow hover:shadow-lg">
            <div className="flex items-center">
              <Droplet className="h-5 w-5 text-red-600 mr-2" />
              <span>{type}</span>
            </div>
            <input
              title='number'
              type="number"
              value={bloodQuantities[type] || 0}
              onChange={(e) => setBloodQuantities({ ...bloodQuantities, [type]: Number(e.target.value) })}
              className="border rounded p-1 w-20"
            />
          </Card>
        ))}
      </ul>
      <Button className='mt-4 bg-red-600 hover:bg-red-700' onClick={handleSubmitBloodUnits}>Submit Blood Units</Button>
    </div>
  );
};

export default BloodBankDashboard;
