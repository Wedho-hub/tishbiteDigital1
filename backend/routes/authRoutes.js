


import express from "express";
import { loginAdmin, logoutAdmin, verifyAdmin } from "../controllers/authController.js";

const router = express.Router();

router.get("/verify", verifyAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);


export default router;
