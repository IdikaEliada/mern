import express from "express";
import dotenv from "dotenv";
import { connentDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/products", async (req, res) => {
  const product = req.body; //user will send product data in request body
  console.log("Received product data:", product);

  // Validate the product data
  if (!product.name || !product.image || !product.price || !product.description) {
    return res.status(400).json({ success:false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success:true, message: "Product created successfully", product: newProduct, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ success:false, message: "Server Error. Please try again." });
  }


  res.send("Product created!");
});



app.get("/api/data", (req, res) => {
  res.json({ message: "This is some data from the server." });
});

app.listen(PORT, () => {
  connentDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});

//