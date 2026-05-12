import Admin from "../models/admin.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";
const allowCrossSiteCookies = process.env.COOKIE_SAMESITE === "none";

function authCookieOptions() {
  return {
    httpOnly: true,
    secure: allowCrossSiteCookies || isProduction,
    sameSite: allowCrossSiteCookies ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  };
}

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
});
  }

  const token = generateToken(admin._id);

  res.cookie("token", token, authCookieOptions());

 res.json({
  success: true,
  message: "Login successful",
  admin: {
    id: admin._id,
    email: admin.email
  }
});
};

export const verifyAdmin = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("email");
    if (!admin) return res.status(401).json({ success: false });
    res.json({ success: true, admin: { id: admin._id, email: admin.email } });
  } catch {
    res.status(401).json({ success: false });
  }
};

export const logoutAdmin = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: allowCrossSiteCookies || isProduction,
    sameSite: allowCrossSiteCookies ? "none" : "strict",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
};
