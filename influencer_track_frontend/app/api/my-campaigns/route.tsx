import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const uri = "mongodb+srv://Dee:Dee2025@cluster0.aagmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const user = {
  id: "USR001",
  firstName: "Alice",
  lastName: "Johnson",
  role: "Customer",
  campaigns: ["67a67a8f70c648b412a43015", '67a67a8f70c648b412a43012'],
};

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri);
    }

    const db = mongoose.connection.useDb("test");
    const campaignsCollection = db.collection("campaigns");

    const campaigns = await campaignsCollection.find({
      _id: { $in: user.campaigns.map(id => new ObjectId(id)) },
    }).toArray();

    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ message: "Failed to fetch campaigns" }, { status: 500 });
  }
}