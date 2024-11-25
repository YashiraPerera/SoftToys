// packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from "path";
import cors from 'cors';

// utiles
import connectDB from "./config/db.js";

import ShopRoute from './routes/shopRoutes.js';
import PromotionRoute from './routes/promotionRoutes.js';
import ProductRoute from './routes/ProductRoutes.js';
import CartRoute from './routes/cartRoutes.js';

// load the .env file
dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(cookieParser());


app.use("/api/shop", ShopRoute);
app.use("/api/promo", PromotionRoute);
app.use("/api/product", ProductRoute);
app.use("/api/cart", CartRoute);


const __dirname = path.resolve();
app.use("/uploads/products", express.static(path.join(__dirname + '/uploads/products')));

app.listen(port, () => console.log(`server running on port: ${port}`));