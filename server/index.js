import express from "express";
// import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/loginRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"
import addBookingRoutes from "./routes/addBookingRoutes.js"

// dotenv.config();
const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/patient', profileRoutes);
app.use("/api/addBookings", addBookingRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
