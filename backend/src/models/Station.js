import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    stationNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    systemType: {
      type: String,
      enum: ['gaming-pc', 'console-ps5', 'console-xbox', 'vr-station'],
      required: true,
    },
    specs: String,
    status: {
      type: String,
      enum: ['available', 'occupied', 'maintenance'],
      default: 'available',
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Station', stationSchema);
