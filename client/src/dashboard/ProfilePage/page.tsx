import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Droplet, Mail, Phone, MapPin } from 'lucide-react';

interface Donor {
  id: string;
  name: string;
  email: string;
  number: string;
  bloodType: string;
  subdivision: string;
}

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [donor, setDonor] = useState<Donor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonorProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/blooddonor/${id}`);
        setDonor(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching donor data:", error);
        setError("Failed to load donor profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonorProfile();
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

  if (!donor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-center">
          <p className="text-xl font-semibold">Donor not found</p>
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
              <h1 className="text-2xl font-bold text-gray-900">{donor.name}</h1>
              <p className="text-red-600 font-semibold">Blood Type: {donor.bloodType}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">{donor.email}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">{donor.number}</p>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">{donor.subdivision}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;