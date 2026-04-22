import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    stationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    phoneNumber: String,
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endTime: Date,
    duration: {
      type: Number,
      // in minutes
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'paused'],
      default: 'active',
    },
    cost: Number,
    notes: String,
    billGenerated: {
      type: Boolean,
      default: false,
    },
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bill',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);
