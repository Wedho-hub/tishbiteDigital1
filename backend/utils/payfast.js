import crypto from "crypto";
import https from "https";

const PAYFAST_VALID_IPS = [
  "41.74.179.194",
  "41.74.179.195",
  "41.74.179.196",
  "41.74.179.197",
  "127.0.0.1",       // sandbox / local
  "::1",             // localhost IPv6
];

const isSandbox = process.env.PAYFAST_SANDBOX === "true";

export const PAYFAST_URL = isSandbox
  ? "https://sandbox.payfast.co.za/eng/process"
  : "https://www.payfast.co.za/eng/process";

const PAYFAST_VALIDATE_HOST = isSandbox
  ? "sandbox.payfast.co.za"
  : "www.payfast.co.za";

/**
 * Build a URL-encoded parameter string in the order the object keys are given.
 * Values are URL-encoded (space → +).
 */
function buildParamString(data, passphrase = null) {
  const pairs = Object.entries(data)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v)).replace(/%20/g, "+")}`);

  let str = pairs.join("&");

  if (passphrase) {
    str += `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}`;
  }

  return str;
}

/**
 * Generate an MD5 signature for the given PayFast parameters.
 * Pass the params in the exact order PayFast expects (same as the form).
 */
export function generateSignature(data, passphrase = null) {
  const paramStr = buildParamString(data, passphrase);
  return crypto.createHash("md5").update(paramStr).digest("hex");
}

/**
 * Check that the incoming ITN request originates from a known PayFast IP.
 */
export function isValidPayFastIP(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(",")[0].trim() : req.socket?.remoteAddress;
  return PAYFAST_VALID_IPS.includes(ip);
}

/**
 * Verify the ITN with PayFast's own validation endpoint.
 * Returns true if PayFast responds with "VALID".
 */
export function verifyItnWithPayFast(itnData) {
  return new Promise((resolve, reject) => {
    const body = buildParamString(itnData);

    const options = {
      hostname: PAYFAST_VALIDATE_HOST,
      port: 443,
      path: "/eng/query/validate",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve(data.trim() === "VALID"));
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}
