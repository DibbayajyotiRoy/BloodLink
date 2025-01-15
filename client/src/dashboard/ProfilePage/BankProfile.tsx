import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Droplet, Mail, Phone, MapPin } from 'lucide-react';

interface BloodBank {
  id: string;
  name: string;
  email: string;
  number: string;
  district: string;
  availableBloodTypes: string[];
}

const BankProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bank, setBank] = useState<BloodBank | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBankProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/bloodbank/${id}`);
        setBank(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching bank data:", error);
        setError("Failed to load bank profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBankProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!bank) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-center">
          <p className="text-xl font-semibold">Bank not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Droplet className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{bank.name}</h1>
              <p className="text-red-600 font-semibold">District: {bank.district}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">{bank.email}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">{bank.number}</p>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">{bank.district}</p>
            </div>
            <div>
              <p className="text-gray-700">Available Blood Types: {bank.availableBloodTypes.join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankProfilePage;