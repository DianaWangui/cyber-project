"use client";

import Link from "next/link";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("https://cyber-project-ten.vercel.app/api/campaigns");
        console.log("Fetched campaigns:", response.data);
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setCampaigns([]);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex flex-1 overflow-hidden relative">
        {isMobile && !sidebarOpen && (
          <button
            className="p-2 bg-gray-400 rounded-md fixed right-4 top-20 z-20 shadow-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        )}

        {!isMobile && <SideBar />}

        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)}>
            <div
              className="w-full bg-gray-200 h-full p-4 shadow-md fixed inset-0 top-16 flex flex-col relative z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-3 right-5 text-gray-800"
              >
                <X size={28} />
              </button>
              <SideBar />
            </div>
          </div>
        )}

        <div className="flex-1 pr-[2.5%] pl-[2.5%] mt-8 flex flex-col">
          <h1 className="text-2xl text-gray-700 mb-4">Campaigns</h1>

          {campaigns.length === 0 ? (
            <div className="flex items-center justify-center flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 text-center w-full max-w-md"
              >
                <h2 className="text-lg font-semibold text-gray-800">No campaigns available at the moment</h2>
                <p className="text-gray-500 mt-2">Please check back later for new campaigns.</p>
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 flex-1 overflow-y-auto pr-2 p-4">
              {campaigns.map((campaign, index) => (
                <Link key={campaign._id} href={`dashboard/campaign-details`}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg transition border border-gray-200 cursor-pointer h-32 flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{campaign.name}</h2>
                      <p className="text-sm text-gray-600">{campaign.companyName} - {campaign.location}</p>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          campaign.status === "active" ? "bg-green-500" : "bg-[#1AA3E8]"
                        }`}
                      >
                        {campaign.status}
                      </span>
                      <span className="font-medium">Deadline: {new Date(campaign.endDate).toDateString()}</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
