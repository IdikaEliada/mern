import express from "express";
import dotenv from "dotenv";
import { connentDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connentDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});

//