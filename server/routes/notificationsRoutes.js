import express from "express";
import { getNotificationsByPatient, markNotificationAsRead, markAllNotificationsAsRead } from "../controllers/notificationsController.js";

const router = express.Router();

// GET /api/notification/:userId
router.get("/:userId", getNotificationsByPatient);
router.patch("/read/:id", markNotificationAsRead);
router.patch("/read-all/:userId", markAllNotificationsAsRead);

export default router;
