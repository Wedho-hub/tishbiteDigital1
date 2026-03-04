import Admin from "../models/admin.js";
import { generateToken } from "../utils/generateToken.js";

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

export const logoutAdmin = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: allowCrossSiteCookies || isProduction,
    sameSite: allowCrossSiteCookies ? "none" : "strict",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
};
