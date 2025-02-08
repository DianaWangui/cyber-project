"use client";

import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from 'axios';
import { useRouter } from "next/navigation";


const CampaignDetails = () => {
  const router = useRouter();
  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    videoLink: ''
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/campaigns");
        console.log("Fetched campaigns:", response.data);
        setCampaigns(response.data);

        if (response.data.length > 0) {
          setSelectedCampaign(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setCampaigns([]);
      }
    };

    fetchCampaigns();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000//api/campaign-application', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <NavBar />
      <div className="flex flex- flex-1 overflow-hidden lg:flex-row lg:flex-nowrap md:flex-row lg:mx-8 lg:my-2 lg:px-4 lg:py-4 h-[50%]">
        <main className="flex flex-col flex-1 overflow-hidden lg:flex-row lg:flex-nowrap md:flex-row lg:mx-8 lg:my-2 lg:px-4 lg:py-4">
            <div className="w-full sm:w-1/2 h-1/4 sm:h-auto bg-white p-4 rounded-lg shadow-md overflow-x-auto flex flex-row sm:flex-col space-x-4 sm:space-x-0">
            <button 
              className="hidden sm:block bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 mb-4 w-auto self-start"
              onClick={() => router.back()}
              >
              ←-
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-500">Other Campaigns</h2>
              {campaigns.map((campaign) => (
                <div 
                  key={campaign._id} 
                  onClick={() => setSelectedCampaign(campaign)}
                  className={`min-w-[70%] sm:w-full p-4 border rounded-lg cursor-pointer transition m-2 ${
                    selectedCampaign._id === campaign._id ? "bg-green-100 border-green-500" : "hover:bg-gray-100"
                  }`}
                >
                  <h3 className="text-blue-600 font-medium">{campaign.name}</h3>
                  <p className="text-gray-500">{campaign.location}</p>
                  <span className={`text-sm px-2 py-1 rounded-full text-white ${campaign.status === "Ongoing" ? "bg-green-500" : "bg-gray-400"}`}>
                    {campaign.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full sm:w-1/2 h-3/4 sm:h-auto bg-white p-6 rounded-lg shadow-md overflow-y-auto">
              <h1 className="text-2xl font-bold text-gray-700">{selectedCampaign.name}</h1>
              <p className="text-gray-600">{selectedCampaign.companyName} - {selectedCampaign.location}</p>
              <button 
                className="bg-orange-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg mt-2"
                onClick={() => setIsModalOpen(true)}
              >
                Submit
              </button>
              
              <div className="mt-4 p-4">
                <h2 className="text-lg font-semibold text-gray-500">Campaign Details</h2>
                <div className="flex justify-between items-start">
                  <p className="text-gray-700 mt-2">{selectedCampaign.description}</p>
                  <p className="mt-2 font-medium text-gray-500 text-right"> Deadline: {selectedCampaign.endDate}</p>
                </div>
              </div>
            </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Submit Your Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border rounded-lg text-gray-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border rounded-lg text-gray-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input 
                  type="text" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border rounded-lg text-gray-500"
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Video Link to TikTok</label>
                <input 
                  type="text" 
                  name="videoLink" 
                  value={formData.videoLink} 
                  onChange={handleInputChange} 
                  className="w-full p-2 border rounded-lg text-gray-500"
                  required 
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;