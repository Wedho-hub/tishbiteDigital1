import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./whatsappFloat.css";

const WHATSAPP_URL =
  "https://wa.me/27791684548?text=Hello%20Tishbite%20Digital,%20I%20want%20to%20get%20more%20clients%20online.";

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-float"
    aria-label="Chat with Tishbite Digital on WhatsApp"
  >
    <FaWhatsapp className="whatsapp-float-icon" aria-hidden="true" />
    <span className="whatsapp-float-text">Chat on WhatsApp</span>
  </a>
);

export default WhatsAppFloat;