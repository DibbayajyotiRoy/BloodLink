import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BloodDonor {
  id: number;
  name: string;
  bloodType: string;
  subdivision: string;
  state: string;
  email: string;
  number: string;
}

interface BloodBank {
  id: number;
  name: string;
  district: string;
  email: string;
  number: string;
  availableBloodTypes: string[];
}

const BloodSeekersPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"donors" | "banks">(
    "donors"
  );
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<BloodDonor[]>([]);
  const [banks, setBanks] = useState<BloodBank[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<BloodBank[]>([]);
  const [bloodType, setBloodType] = useState<string>("");
  const [donorLocation, setDonorLocation] = useState<string>("");
  const [bankLocation, setBankLocation] = useState<string>("");
  const [state] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/blooddonor/find-donors",
        {
          state: "Tripura",
          subdivision: donorLocation,
          bloodType,
        }
      );
      setDonors(response.data.donors);
      setFilteredDonors(response.data.donors);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBanks = async () => {
    
    
    
    try {
      const response =await axios.post('http://localhost:3000/bloodbank/find-banks',{
       state: "Tripura",
       district: bankLocation}
      )
      setBanks(response.data.banks)
      setFilteredBanks(response.data.banks)
      console.log(banks)
    } catch (error) {
      console.log(error)
      return
    }
  };

  const filterDonors = () => {
    let filtered = [...donors];

    if (bloodType) {
      filtered = filtered.filter((donor) => donor.bloodType === bloodType);
    }

    if (donorLocation) {
      filtered = filtered.filter(
        (donor) =>
          donor.subdivision.toLowerCase() === donorLocation.toLowerCase()
      );
    }

    if (state) {
      filtered = filtered.filter(
        (donor) => donor.state.toLowerCase() === state.toLowerCase()
      );
    }

    setFilteredDonors(filtered);
  };

  const filterBanks = () => {
    let filtered = [...banks];

    if (bankLocation) {
      filtered = filtered.filter(
        (bank) => bank.district.toLowerCase() === bankLocation.toLowerCase()
      );
    }

    setFilteredBanks(filtered);
  };

  useEffect(() => {
    fetchData();
    fetchBanks();
  }, []);

  useEffect(() => {
    filterDonors();
  }, [bloodType, donorLocation, state]);

  useEffect(() => {
    filterBanks();
  }, [bankLocation]);

  const toggleSection = (section: "donors" | "banks") => {
    setActiveSection(section);
  };

  const renderSearchFilters = () => {
    if (activeSection === "donors") {
      return (
        <>
          <select
            title="location"
            value={donorLocation}
            onChange={(e) => setDonorLocation(e.target.value)}
            className="border rounded p-2 shadow hover:shadow-lg w-full sm:w-76"
          >
            <option value="">Select your Sub-Division</option>
            <option value="Sadar">Sadar</option>
            <option value="Mohanpur">Mohanpur</option>
            <option value="Jirania">Jirania</option>
            <option value="Belonia">Belonia</option>
            <option value="Santirbazar">Santirbazar</option>
            <option value="Sabroom">Sabroom</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Amarpur">Amarpur</option>
            <option value="Karbook">Karbook</option>
            <option value="Khowai">Khowai</option>
            <option value="Teliamura">Teliamura</option>
            <option value="Bishalgarh">Bishalgarh</option>
            <option value="Jampuijala">Jampuijala</option>
            <option value="Sonamura">Sonamura</option>
            <option value="Kumarghat">Kumarghat</option>
            <option value="Kailashahar">Kailashahar</option>
            <option value="Dharmanagar">Dharmanagar</option>
            <option value="Kanchanpur">Kanchanpur</option>
            <option value="Panisagar">Panisagar</option>
            <option value="Ambassa">Ambassa</option>
            <option value="Kamalpur">Kamalpur</option>
            <option value="Longtarai Valley">Longtarai Valley</option>
            <option value="Gandachera">Gandachera</option>

          </select>
          <select
            title="bloodType"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="border rounded p-2 shadow hover:shadow-lg w-full sm:w-76"
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
        </>
      );
    } else {
      return (
        <select
          title="location"
          value={bankLocation}
          onChange={(e) => setBankLocation(e.target.value)}
          className="border rounded p-2 shadow hover:shadow-lg w-full sm:w-76"
        >
          <option value="">Select your District</option>
          <option value="Dhalai">Dhalai</option>
          <option value="Gomati">Gomati</option>
          <option value="Khowai">Khowai</option>
          <option value="North_Tripura">North Tripura</option>
          <option value="Sepahijala">Sepahijala</option>
          <option value="South_Tripura">South Tripura</option>
          <option value="Unakoti">Unakoti</option>
          <option value="West_Tripura">West Tripura</option>
        </select>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      <header className="sticky top-0 z-10 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">BloodLink</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            {/* <Link
              to="/about"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              About
            </Link>
            <Link
              to="/bloodseekers"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Find Blood
            </Link> */}
          </nav>
          <div className="flex space-x-2">
            <Link to="/register/blood-bank">
              <Button variant="outline" className="hidden md:inline-flex">
                Register as Blood Bank
              </Button>
            </Link>
            <Link to="/register/donor">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Become a Donor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={() => toggleSection("donors")}
            variant={activeSection === "donors" ? "default" : "outline"}
          >
            Blood Donors
          </Button>
          <Button
            onClick={() => toggleSection("banks")}
            variant={activeSection === "banks" ? "default" : "outline"}
          >
            Blood Banks
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          {renderSearchFilters()}
        </div>

        {activeSection === "donors" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDonors.length === 0 ? (
              <p>No donors found matching your criteria.</p>
            ) : (
              filteredDonors.map((donor) => (
                <div key={donor.id} className="border-2 border-gray-200 rounded-lg p-4 shadow-md bg-white hover:shadow-xl  transition duration-300 ease-in-out">
                  <h2 className="font-bold text-lg">{donor.name}</h2>
                  <p>Location: {donor.subdivision}</p>
                  <p>Blood Type: {donor.bloodType}</p>
                  <p>Email: {donor.email}</p>
                  <p>Contact: {donor.number}</p>
                  <Button
                    className="mt-2"
                    onClick={() => navigate(`/profile/${donor.id}`)}
                  >
                    View Profile
                  </Button>
                </div>
              ))
            )}
          </div>
        )}

{activeSection === "banks" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {filteredBanks.length === 0 ? (
      <p>No blood banks found matching your criteria.</p>
    ) : (
      // <table className="table-auto border-collapse border border-gray-300 w-full  rounded-lg">
      //   <thead>
      //     <tr className="bg-gray-100">
      //       <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
      //       <th className="border border-gray-300 px-4 py-2 text-center">District</th>
      //       <th className="border border-gray-300 px-4 py-2 text-center">Email</th>
      //       <th className="border border-gray-300 px-4 py-2 text-center">Contact</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {filteredBanks.map((bank) => (
      //       <tr key={bank.id} className="odd:bg-white even:bg-slate-50">
      //         <td className=" border border-gray-300 px-4 py-2">{bank.name}</td>
      //         <td className=" border border-gray-300 px-4 py-2">{bank.district}</td>
      //         <td className=" border border-gray-300 px-4 py-2">{bank.email}</td>
      //         <td className=" border border-gray-300 px-4 py-2">{bank.number}</td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </table>
      filteredBanks.map((bank) => (
        <div key={bank.id} className="mb-5 border-2 border-gray-200 rounded-lg p-4 shadow-md bg-white hover:shadow-xl  transition duration-300 ease-in-out">
          <h2 className="font-bold text-lg">{bank.name}</h2>
          <p>Location: {bank.district}</p>
          <p>Email: {bank.email}</p>
          <p>Contact: {bank.number}</p>
          <Button
            className="mt-2"
            onClick={() => navigate(`/profile/${bank.id}`)}
          >
            View Profile
          </Button>
        </div>
      ))
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default BloodSeekersPage;
