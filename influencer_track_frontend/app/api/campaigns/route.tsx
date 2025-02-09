import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri = "mongodb+srv://Dee:Dee2025@cluster0.aagmx.mongodb.net/influencerDB?retryWrites=true&w=majority&appName=Cluster0"

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri);
    }

    const db = mongoose.connection.useDb("test");
    const campaignsCollection = db.collection("campaigns");
    const campaigns = await campaignsCollection.find({}).toArray()

    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch campaigns" }, { status: 500 });
  }
}
