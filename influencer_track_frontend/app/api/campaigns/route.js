import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Campaign from "../../lib/models/campaign.js"; // Import the model

const uri = "mongodb+srv://Dee:Dee2025@cluster0.aagmx.mongodb.net/influencerDB?retryWrites=true&w=majority&appName=Cluster0";

export async function GET() {
  try {
    // Ensure you're connected to the MongoDB database
    if (!mongoose.connection.readyState) {
      await mongoose.connect(uri); // Make sure to replace with your actual connection string
    }
    const db = mongoose.connection.useDb('test');
    // Fetch data directly from the 'campaigns' collection
    const campaigns = db.collection('campaigns').find({}).toArrays();

    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ message: 'Failed to fetch campaigns' }, { status: 500 });
  }
}
