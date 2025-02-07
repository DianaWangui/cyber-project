import mongoose from "mongoose";
import Campaign from "./models/campaign.js"; // Ensure the correct path to your model

// MongoDB connection string
const uri = "mongodb+srv://Dee:Dee2025@cluster0.aagmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to insert campaigns
async function run() {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully!");

    // Sample campaign data
    const campaigns = [
      { name: "Summer Promotion", description: "A campaign for summer sales", startDate: new Date("2025-06-01"), endDate: new Date("2025-08-31"), status: "active", companyName: "TechCorp", location: "Nairobi, Kenya" },
      { name: "New Year Giveaway", description: "End-of-year discounts and giveaways", startDate: new Date("2025-12-01"), endDate: new Date("2026-01-05"), status: "active", companyName: "MarketPro", location: "Mombasa, Kenya" },
      { name: "Black Friday Deals", description: "Huge discounts on electronics", startDate: new Date("2025-11-25"), endDate: new Date("2025-11-30"), status: "active", companyName: "ElectroStore", location: "Kisumu, Kenya" },
      { name: "Back to School", description: "School supplies discounts", startDate: new Date("2025-01-05"), endDate: new Date("2025-02-15"), status: "completed", companyName: "EduSupplies", location: "Nakuru, Kenya" },
      { name: "Easter Special", description: "Easter holiday discounts on all items", startDate: new Date("2025-04-10"), endDate: new Date("2025-04-20"), status: "active", companyName: "FestiveDeals", location: "Eldoret, Kenya" },
      { name: "Tech Week", description: "Discounts on laptops and accessories", startDate: new Date("2025-03-15"), endDate: new Date("2025-03-22"), status: "active", companyName: "GadgetWorld", location: "Thika, Kenya" },
      { name: "Holiday Bonanza", description: "Christmas special sale", startDate: new Date("2025-12-15"), endDate: new Date("2025-12-31"), status: "active", companyName: "GiftHub", location: "Nairobi, Kenya" },
      { name: "Health & Fitness", description: "Discounts on gym subscriptions and supplements", startDate: new Date("2025-07-01"), endDate: new Date("2025-07-15"), status: "active", companyName: "FitLife", location: "Nairobi, Kenya" },
      { name: "Fashion Week Sale", description: "Clothing discounts for fashion lovers", startDate: new Date("2025-09-10"), endDate: new Date("2025-09-20"), status: "active", companyName: "TrendyWear", location: "Mombasa, Kenya" },
      { name: "Food Festival", description: "Restaurant discounts and special menus", startDate: new Date("2025-05-01"), endDate: new Date("2025-05-10"), status: "active", companyName: "TastyBites", location: "Kisumu, Kenya" },
      { name: "Automobile Expo", description: "Car deals and free test drives", startDate: new Date("2025-10-01"), endDate: new Date("2025-10-07"), status: "active", companyName: "AutoHub", location: "Eldoret, Kenya" },
      { name: "Smart Home Week", description: "Home automation discounts", startDate: new Date("2025-06-15"), endDate: new Date("2025-06-25"), status: "active", companyName: "HomeTech", location: "Nakuru, Kenya" }
    ];

    // Insert campaigns into MongoDB
    await Campaign.insertMany(campaigns);
    console.log("✅ 12 Campaigns inserted successfully!");

  } catch (error) {
    console.error("❌ Error inserting campaigns:", error);
  } finally {
    // Close the Mongoose connection
    await mongoose.connection.close();
    console.log("✅ Closed connection to MongoDB");
  }
}

// Run the function
run();
