import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
const isProduction = process.env.NODE_ENV === "production";

let hasStartedServer = false;
const startServer = () => {
  if (hasStartedServer) return;
  hasStartedServer = true;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

const connectToDatabase = async () => {
  if (!mongoUri) {
    console.error("MONGO_URI is not set. Database connection skipped.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
    return true;
  } catch (err) {
    console.error("DB connection failed", err);
    return false;
  }
};

const retryDatabaseConnectionInBackground = () => {
  if (!mongoUri) return;

  setInterval(async () => {
    if (mongoose.connection.readyState === 1) return;
    console.log("Retrying MongoDB connection...");
    await connectToDatabase();
  }, 30000);
};

const bootstrap = async () => {
  const isDbConnected = await connectToDatabase();

  if (!isDbConnected && !isProduction) {
    process.exit(1);
  }

  if (!isDbConnected && isProduction) {
    console.warn("Starting server in degraded mode (database unavailable).");
    retryDatabaseConnectionInBackground();
  }

  startServer();
};

bootstrap();
