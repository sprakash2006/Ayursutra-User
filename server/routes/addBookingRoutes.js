import express from "express";
import { getTherapies, getDoctors, createBooking } from "../controllers/addBooking.js";

const router = express.Router();


router.get("/getTherapy", getTherapies);
router.get("/getDoctors", getDoctors);
router.post("/bookings", createBooking);

export default router;
