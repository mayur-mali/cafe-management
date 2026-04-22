import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['snacks', 'beverages', 'equipment', 'accessories'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    reorderLevel: {
      type: Number,
      default: 10,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    supplier: String,
    lastRestocked: Date,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('Inventory', inventorySchema);
