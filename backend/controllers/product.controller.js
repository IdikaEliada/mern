import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json({ success:true, message: "Products fetched successfully", products, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ success:false, message: "Server Error. Please try again." });
  }
}

export const addProduct = async (req, res) => {
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
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  console.log("Received product update data:", product, "for ID:", id);

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success:false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success:true, message: "Product updated successfully", product: updatedProduct, data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ success:false, message: "Server Error. Please try again." });
  } 
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success:true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ success:false, message: "Product not found" });
    return res.status(500).json({ success:false, message: "Server Error. Please try again." });
  }
}