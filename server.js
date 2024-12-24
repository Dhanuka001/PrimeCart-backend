const express = require('express');
const cors = require('cors');
const { sequelize } = require("./models");
const app = express();

// Import Routes
const authRoutes = require("./routes/auth");

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// Mount Routes
app.use("/api/auth", authRoutes); 


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));