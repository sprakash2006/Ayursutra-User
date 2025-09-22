
import express from 'express';
import { getPatientById, updatePatient, getUserBookings, getUserRecords } from '../controllers/profileController.js';

const router = express.Router();

// GET patient by ID
router.get('/:userId', getPatientById);
router.put('/updatePatient/:id', updatePatient);
router.get("/userBookings/:userId", getUserBookings);
router.get("/userRecords/:userId", getUserRecords);

export default router;
