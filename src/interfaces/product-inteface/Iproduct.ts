import {Document} from "mongoose";

export interface IProduct extends Document {
  nombre: string;
  precio_base: number;
  existencia: number;
}