"use client";

import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import axios from 'axios';
import { useRouter } from "next/navigation";


const CampaignDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
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
        const response = await axios.get("https://cyber-project-ten.vercel.app/api/campaigns");
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
  setIsSubmitting(true);
  setSubmitStatus({ type: '', message: '' });

  try {
    await axios.post('https://cyber-project-ten.vercel.app/api/campaign-application', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    setSubmitStatus({
      type: 'success',
      message: 'Your application has been successfully submitted!'
    });
    
    // Clear form and close modal after a delay
    setTimeout(() => {
      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', phoneNumber: '', videoLink: '' });
    }, 2000);

  } catch (error) {
    setSubmitStatus({
      type: 'error',
      message: 'Failed to submit your application. Please try again.'
    });
  } finally {
    setIsSubmitting(false);
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
                  <p className="mt-2 font-medium text-gray-500 text-right"> Deadline: {new Date(campaign.endDate).toDateString()}</p>
                </div>
              </div>
            </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[95%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%]">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-500">Submit Your Details</h2>

          {submitStatus.type && (
            <div className={`mb-4 p-3 rounded-lg ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-700 text-sm sm:text-base mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg text-gray-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-700 text-sm sm:text-base mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg text-gray-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-700 text-sm sm:text-base mb-1">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg text-gray-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-700 text-sm sm:text-base mb-1">Video Link to TikTok</label>
              <input
                type="text"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg text-gray-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${
                  isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base flex items-center gap-2`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
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