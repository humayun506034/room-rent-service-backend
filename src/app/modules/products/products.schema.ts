import { Schema, model } from "mongoose";
import { T_Products } from "./products.interface";

const products_schema = new Schema<T_Products>({});

export const products_model = model("products", products_schema);
