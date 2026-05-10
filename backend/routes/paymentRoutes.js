import express from "express";
import { initiatePayment, getPayments } from "../controllers/paymentController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/initiate", initiatePayment);
router.get("/", protectAdmin, getPayments);

// /api/payments/notify is registered directly in app.js (before CSRF middleware)
// so it is intentionally absent here.

export default router;
