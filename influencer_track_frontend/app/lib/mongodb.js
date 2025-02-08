import mongoose from "mongoose";
import Campaign from "./models/campaign.js";

const uri = "mongodb+srv://Dee:Dee2025@cluster0.aagmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to insert campaigns
async function run() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully!");

    // Sample campaign data with influencers
    const campaigns = [
      { 
        id: 1,
        name: "Summer Promotion", 
        description: "A campaign for summer sales", 
        startDate: new Date("2025-06-01"), 
        endDate: new Date("2025-08-31"), 
        status: "active", 
        companyName: "TechCorp", 
        location: "Nairobi, Kenya"
      },
      { 
        id: 2,
        name: "New Year Giveaway", 
        description: "End-of-year discounts and giveaways", 
        startDate: new Date("2025-12-01"), 
        endDate: new Date("2026-01-05"), 
        status: "active", 
        companyName: "MarketPro", 
        location: "Mombasa, Kenya"
      },
      { 
        id: 3,
        name: "Black Friday Deals", 
        description: "Huge discounts on electronics", 
        startDate: new Date("2025-11-25"), 
        endDate: new Date("2025-11-30"), 
        status: "active", 
        companyName: "ElectroStore", 
        location: "Kisumu, Kenya"
      },
      { 
        id: 4,
        name: "Back to School", 
        description: "School supplies discounts", 
        startDate: new Date("2025-01-05"), 
        endDate: new Date("2025-02-15"), 
        status: "completed", 
        companyName: "EduSupplies", 
        location: "Nakuru, Kenya"
      },
      { 
        id: 5,
        name: "Tech Week", 
        description: "Showcasing the latest technology", 
        startDate: new Date("2025-09-15"), 
        endDate: new Date("2025-09-22"), 
        status: "active", 
        companyName: "InnovateTech", 
        location: "Nairobi, Kenya"
      },
      { 
        id: 6,
        name: "Easter Special", 
        description: "Exclusive Easter discounts", 
        startDate: new Date("2025-04-10"), 
        endDate: new Date("2025-04-20"), 
        status: "completed", 
        companyName: "RetailMart", 
        location: "Eldoret, Kenya"
      }
    ];
  
     
     
    await Campaign.insertMany(campaigns);
    console.log("✅ Campaigns with Influencers inserted successfully!");
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
