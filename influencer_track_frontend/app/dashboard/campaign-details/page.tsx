"use client";

import { useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

const dummyCampaigns = [
  { id: 1, name: "Summer Fashion Promo", company: "FashionHub", location: "New York, USA", status: "Ongoing", deadline: "2025-02-15", description: "Promote summer outfits and share your unique style!" },
  { id: 2, name: "Tech Gadget Giveaway", company: "TechVerse Inc.", location: "San Francisco, USA", status: "Completed", deadline: "2025-01-30", description: "Review and share our latest gadgets with your audience." },
  { id: 3, name: "Fitness Challenge 2025", company: "FitLife", location: "Los Angeles, USA", status: "Upcoming", deadline: "2025-03-10", description: "Join the fitness challenge and motivate your followers!" },
  { id: 4, name: "Summer Fashion Promo", company: "FashionHub", location: "New York, USA", status: "Ongoing", deadline: "2025-02-15", description: "Promote summer outfits and share your unique style!" },
  { id: 5, name: "Tech Gadget Giveaway", company: "TechVerse Inc.", location: "San Francisco, USA", status: "Completed", deadline: "2025-01-30", description: "Review and share our latest gadgets with your audience." },
  { id: 6, name: "Fitness Challenge 2025", company: "FitLife", location: "Los Angeles, USA", status: "Upcoming", deadline: "2025-03-10", description: "Join the fitness challenge and motivate your followers!" },
  { id: 7, name: "Summer Fashion Promo", company: "FashionHub", location: "New York, USA", status: "Ongoing", deadline: "2025-02-15", description: "Promote summer outfits and share your unique style!" },
  { id: 8, name: "Tech Gadget Giveaway", company: "TechVerse Inc.", location: "San Francisco, USA", status: "Completed", deadline: "2025-01-30", description: "Review and share our latest gadgets with your audience." },
  { id: 9, name: "Fitness Challenge 2025", company: "FitLife", location: "Los Angeles, USA", status: "Upcoming", deadline: "2025-03-10", description: "Join the fitness challenge and motivate your followers!" },
];

const CampaignDetails = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(dummyCampaigns[0]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        {/* Campaigns and Details Section */}
        <main className="flex flex-1 p-6 space-x-4">
          {/* Left Column: Campaign List with independent scrolling */}
          <div className="w-1/3 bg-white p-4 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-80px)]">
            <h2 className="text-lg font-semibold mb-4">Other Campaigns</h2>
            <ul>
              {dummyCampaigns.map((campaign) => (
                <li 
                  key={campaign.id} 
                  onClick={() => setSelectedCampaign(campaign)}
                  className={`mb-4 p-3 border rounded-lg cursor-pointer transition ${
                    selectedCampaign.id === campaign.id ? "bg-green-100 border-green-500" : "hover:bg-gray-100"
                  }`}
                >
                  <h3 className="text-blue-600 font-medium">{campaign.name}</h3>
                  <p className="text-gray-500">{campaign.location}</p>
                  <span className={`text-sm px-2 py-1 rounded-full text-white ${campaign.status === "Ongoing" ? "bg-green-500" : "bg-gray-400"}`}>
                    {campaign.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Campaign Details with independent scrolling */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-80px)]">
            <h1 className="text-2xl font-bold">{selectedCampaign.name}</h1>
            <p className="text-gray-600">{selectedCampaign.company} - {selectedCampaign.location}</p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg mt-2">Apply</button>
            
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Job Description</h2>
              <p className="text-gray-700 mt-2">{selectedCampaign.description}</p>
              <p className="mt-2 font-medium">Deadline: {selectedCampaign.deadline}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CampaignDetails;