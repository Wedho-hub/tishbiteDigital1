import crypto from "crypto";
import Payment from "../models/payment.js";
import {
  generateSignature,
  isValidPayFastIP,
  verifyItnWithPayFast,
  PAYFAST_URL,
} from "../utils/payfast.js";

const MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID;
const MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY;
const PASSPHRASE = process.env.PAYFAST_PASSPHRASE || null;
const BASE_URL = process.env.FRONTEND_URL || "https://tishbitedigital.co.za";
const BACKEND_URL = process.env.BACKEND_URL || "https://tishbitedigital.co.za";

/**
 * POST /api/payments/initiate
 * Creates a pending payment record and returns signed PayFast parameters.
 * The frontend uses these to construct a form and submit directly to PayFast.
 */
export async function initiatePayment(req, res, next) {
  try {
    const { firstName, lastName, email, phone, service, amount, paymentType } = req.body;

    if (!firstName || !lastName || !email || !service || !amount) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount." });
    }

    const internalRef = crypto.randomBytes(12).toString("hex");

    await Payment.create({
      internalRef,
      firstName,
      lastName,
      email,
      phone: phone || "",
      service,
      amount: parsedAmount,
      paymentType: paymentType || "once-off",
      status: "pending",
    });

    const pfData = {
      merchant_id: MERCHANT_ID,
      merchant_key: MERCHANT_KEY,
      return_url: `${BASE_URL}/payment/success?ref=${internalRef}`,
      cancel_url: `${BASE_URL}/payment/cancel?ref=${internalRef}`,
      notify_url: `${BACKEND_URL}/api/payments/notify`,
      name_first: firstName,
      name_last: lastName,
      email_address: email,
      ...(phone && { cell_number: phone }),
      m_payment_id: internalRef,
      amount: parsedAmount.toFixed(2),
      item_name: service,
      item_description: `${paymentType === "installment" ? "Installment payment" : "Once-off payment"} for ${service}`,
    };

    pfData.signature = generateSignature(pfData, PASSPHRASE);

    return res.status(200).json({
      pfUrl: PAYFAST_URL,
      params: pfData,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/payments/notify
 * PayFast ITN (Instant Transaction Notification) — server-to-server callback.
 * CSRF is intentionally bypassed for this endpoint.
 */
export async function handleItn(req, res) {
  try {
    const itnData = req.body;

    // 1. IP validation (warn in sandbox/dev)
    if (
      process.env.NODE_ENV === "production" &&
      !isValidPayFastIP(req)
    ) {
      console.warn("[PayFast ITN] Invalid source IP:", req.ip);
      return res.status(400).send("Invalid IP");
    }

    // 2. Verify with PayFast's server
    const isValid = await verifyItnWithPayFast(itnData);
    if (!isValid) {
      console.warn("[PayFast ITN] Failed PayFast server validation");
      return res.status(400).send("Invalid ITN");
    }

    // 3. Map status
    const statusMap = {
      COMPLETE: "complete",
      FAILED: "failed",
      PENDING: "pending",
      CANCELLED: "cancelled",
    };
    const newStatus = statusMap[itnData.payment_status] || "failed";

    // 4. Update payment record
    await Payment.findOneAndUpdate(
      { internalRef: itnData.m_payment_id },
      {
        status: newStatus,
        pfPaymentId: itnData.pf_payment_id,
        itnRaw: itnData,
      }
    );

    return res.status(200).send("OK");
  } catch (err) {
    console.error("[PayFast ITN] Error:", err);
    return res.status(500).send("Server error");
  }
}

/**
 * GET /api/payments
 * Admin: list all payments, newest first.
 */
export async function getPayments(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      Payment.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Payment.countDocuments(),
    ]);

    return res.json({ payments, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
}
