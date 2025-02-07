import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const campaigns = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  companyName: { type: String, required: true },
  location: { type: String },
});

const Campaign = mongoose.model('Campaign', campaigns)

export default Campaign;