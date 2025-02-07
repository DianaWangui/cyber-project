import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";  

const dummyCampaigns = [
  {
    id: 1,
    name: "Summer Fashion Promo",
    description: "Promote summer outfits and share your unique style!",
    status: "Ongoing",
    deadline: "2025-02-15"
  },
  {
    id: 2,
    name: "Tech Gadget Giveaway",
    description: "Review and share our latest gadgets to your audience.",
    status: "Completed",
    deadline: "2025-01-30"
  }
];


const Dashboard = () => {
  return (
    <div className="h-screen bg-gray-100">
      <NavBar />
      <main className="flex">
        <SideBar />
        <div className="flex-1 pr-[2.5%] pl-[2.5%]">
          {dummyCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white shadow p-4 mb-4 border border-gray-200 rounded-xl">
              <h1 className="text-2xl font-bold">{campaign.name}</h1>
              <p>{campaign.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;