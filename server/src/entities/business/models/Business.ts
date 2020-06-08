import { Schema } from "mongoose";

export const BusinessSchema = new Schema({
  name: String,
  isUnlocked: Boolean,
  unlockCost: Number,
  rateQuantity: Number,
  rateWaitTime: Number,
  upgradeCost: Number,
  upgradeLevel: Number,
  hasManager: Boolean,
  managerCost: Number,
});