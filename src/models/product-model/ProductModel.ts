import mongoose, { Schema } from "mongoose";
import { IProduct } from '../../interfaces/index'


const productSchema = new Schema<IProduct>({
  nombre: String,
  precio_base: {type: Number, decimal: true}, // Define the price as decimal
  existencia: Number,
});

export const ProductModel = mongoose.model<IProduct>("products", productSchema);
