import mongoose from "mongoose";

const uri = "mongodb+srv://Dee:Dee2025@cluster0.aagmx.mongodb.net/influencerDB?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("✅ Already connected to MongoDB");
            return;
        }

        await mongoose.connect(uri);
        console.log("✅ Connected to MongoDB successfully!");

    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;


