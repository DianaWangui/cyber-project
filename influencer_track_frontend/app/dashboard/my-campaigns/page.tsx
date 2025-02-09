"use client";

import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { Menu, X } from "lucide-react";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch("http://localhost:3000/api/my-campaigns");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        console.log("Error fetching campaigns:", error.response.data);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />

      <div className="md:hidden flex justify-end p-4">
        {isMenuOpen ? (
          <button onClick={() => setIsMenuOpen(false)} className="text-gray-700">
            <X size={28} />
          </button>
        ) : (
          <button onClick={() => setIsMenuOpen(true)} className="text-gray-700">
            <Menu size={28} />
          </button>
        )}
      </div>

      {isMenuOpen && (
        <div className="fixed top-[64px] left-0 w-full bg-white shadow-lg md:hidden transition-transform duration-300 ease-in-out">
          <SideBar />
        </div>
      )}

      <div className="flex flex-1">
        <aside className="hidden md:block">
          <SideBar />
        </aside>

        <main className="flex-1 p-5 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">My Campaigns</h1>

          {loading ? (
            <p className="text-gray-600">Loading campaigns...</p>
          ) : campaigns.length === 0 ? (
            <p className="text-gray-600">No campaigns found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {campaigns.map((campaign) => (
                <div key={campaign._id} className="bg-white p-5 rounded-lg shadow-md border">
                  <h2 className="text-lg font-semibold text-gray-700">{campaign.name}</h2>
                  <p className="text-gray-600">{campaign.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Start:</strong> {new Date(campaign.startDate).toDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>End:</strong> {new Date(campaign.endDate).toDateString()}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span className={`px-2 py-1 text-gray-600 rounded ${campaign.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                      {campaign.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Company:</strong> {campaign.companyName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {campaign.location}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
