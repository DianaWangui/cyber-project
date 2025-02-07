"use client"; // Ensure this runs only on the client side

import Link from "next/link";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { motion } from "framer-motion"; // Import Framer Motion
import { useState, useEffect } from "react";
import { Menu } from "lucide-react"; // Import menu icon

const dummyCampaigns = [
  { id: 1, name: "Summer Fashion Promo", company: "FashionHub", location: "New York, USA", status: "Ongoing", deadline: "2025-02-15", description: "Promote summer outfits and share your unique style!" },
  { id: 2, name: "Tech Gadget Giveaway", company: "TechVerse Inc.", location: "San Francisco, USA", status: "Completed", deadline: "2025-01-30", description: "Review and share our latest gadgets with your audience." },
];

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex flex-1 overflow-hidden">
        {/* Hamburger Menu Button on the Right */}
        {isMobile && (
          <button 
            className="p-2 bg-gray-200 rounded-md fixed right-4 top-4 z-20 shadow-md" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
        )}

        {/* Sidebar */}
        {!isMobile && <SideBar />}

        {/* Mobile Sidebar */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setSidebarOpen(false)}>
            <div className="w-64 bg-white h-full p-4 shadow-md fixed right-0 top-0" onClick={(e) => e.stopPropagation()}>
              <SideBar />
            </div>
          </div>
        )}

        <div className="flex-1 pr-[2.5%] pl-[2.5%] mt-8 flex flex-col">
          <h1 className="text-2xl text-gray-700 mb-4">Campaigns</h1>
          <div className="flex flex-col space-y-4 flex-1 overflow-y-auto pr-2 p-4">
            {dummyCampaigns.map((campaign, index) => (
              <Link key={campaign.id} href={`dashboard/campaign-details`}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg transition border border-gray-200 cursor-pointer h-32 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{campaign.name}</h2>
                    <p className="text-sm text-gray-600">{campaign.company} - {campaign.location}</p>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        campaign.status === "Ongoing" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {campaign.status}
                    </span>
                    <span className="font-medium">Deadline: {campaign.deadline}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
