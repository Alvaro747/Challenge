import mongoose, { Schema } from "mongoose";
import { IPrice } from "../../interfaces/index";

const productSchema = new Schema<IPrice>({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  metadata: {
    precios_especiales: [Object],
  },
});

export const PriceModel = mongoose.model<IPrice>("users", productSchema);

