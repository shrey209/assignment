require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connection");
const userRoutes = require("./Routes/users");
const historyRoutes = require("./Routes/history");
const errorHandler = require("./Middlewares/errorHandler");
const logger = require("./Middlewares/logger");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/history", historyRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error Handling
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
