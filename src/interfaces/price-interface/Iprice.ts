import { Document } from "mongoose";

export interface ISpecialPrice {
  nombre_producto: string;
  precio_especial_personal: number;
}

export interface IPrice extends Document {
  name: string;
  metadata: {
    precios_especiales: ISpecialPrice[];
  };
}