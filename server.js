const express = require('express');
const cors = require('cors');
const path = require("path");
const { sequelize } = require("./models");
const app = express();

// Import Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount Routes
app.use("/api/auth", authRoutes); 
app.use("/api/product", productRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));