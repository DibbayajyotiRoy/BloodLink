import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Droplet } from 'lucide-react';
import { toast } from 'react-toastify';

interface BloodUnit {
  id: number;
  bloodType: string;
  quantity: number;
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const BloodBankDashboard: React.FC = () => {
  const [bloodUnits, setBloodUnits] = useState<BloodUnit[]>([]);
  const [bloodQuantities, setBloodQuantities] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBloodUnits = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/bloodunits');
      setBloodUnits(response.data);
      // Initialize blood quantities state
      const initialQuantities: { [key: string]: number } = {};
      response.data.forEach((unit: BloodUnit) => {
        initialQuantities[unit.bloodType] = unit.quantity;
      });
      setBloodQuantities(initialQuantities);
    } catch (error) {
      console.error('Error fetching blood units:', error);
      setError('Failed to fetch blood units. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBloodUnit = async (bloodType: string) => {
    const quantity = bloodQuantities[bloodType];
    if (quantity < 0) {
      toast.error('Quantity cannot be negative.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/bloodunits/${bloodType}`, { quantity });
      setBloodUnits(bloodUnits.map(unit => (unit.bloodType === bloodType ? response.data : unit)));
      toast.success(`Blood unit ${bloodType} updated successfully!`);
    } catch (error) {
      console.error('Error updating blood unit:', error);
      toast.error('Failed to update blood unit. Please try again later.');
    }
  };

  useEffect(() => {
    fetchBloodUnits();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blood Bank Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">Update Blood Units</h2>
          <ul className="space-y-2">
            {bloodTypes.map((type) => (
              <Card key={type} className="flex justify-between items-center p-2 border rounded">
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 text-red-600 mr-2" />
                  <span>{type}</span>
                </div>
                <input
                  type="number"
                  value={bloodQuantities[type] || 0}
                  onChange={(e) => setBloodQuantities({ ...bloodQuantities, [type]: Number(e.target.value) })}
                  className="border rounded p-1 w-20"
                />
                <Button onClick={() => handleUpdateBloodUnit(type)}>Update</Button>
              </Card>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default BloodBankDashboard;