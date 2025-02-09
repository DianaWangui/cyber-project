import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
mongoose.set('debug', true);


// will put this on .env
const uri = "mongodb+srv://Dee:Dee2025@cluster0.aagmx.mongodb.net/influencerDB?retryWrites=true&w=majority&appName=Cluster0"

const formDataSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  videoLink: { type: String, required: true },
});

const FormData = mongoose.models.FormData || mongoose.model('FormData', formDataSchema);

export async function POST(req: Request) {
  try {
    await mongoose.connect(uri);

    const body = await req.json(); 
    console.log('Request Body:', body);

    await FormData.create(body);
    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    console.error('Error saving form data:', error);
    return NextResponse.json({ error: 'Error saving form data' }, { status: 500 });
  }
}