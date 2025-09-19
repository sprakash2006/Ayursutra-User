// routes/patientRoutes.js
import express from 'express';
import { getPatientById, updatePatient } from '../controllers/profileController.js';

const router = express.Router();

// GET patient by ID
router.get('/:userId', getPatientById);
router.put('/updatePatient/:id', updatePatient);

export default router;
