/**
 * Persistent Logger Middleware
 * Uses morgan to log requests to a file for production debugging.
 * Logs are saved in logs/access.log.
 */
import morgan from "morgan";
import fs from "fs";
import path from "path";

const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

export const fileLogger = morgan("combined", {
  stream: fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" })
});
