// =====================================================================
// QrPayment.jsx  -  the UPI / QR code payment box (used on Checkout).
// This is a DEMO: no real payment is processed.
// =====================================================================
import { formatPrice } from "../utils/money.js";
import "./QrPayment.css";

export default function QrPayment({ amount }) {
  return (
    <div className="qr-payment">
      {/* QR CODE PLACEHOLDER
          To use your real QR code: put your image in the public/images folder and
          replace the <div className="qr-placeholder"> below with
              <img src="/images/upi-qr.png" alt="UPI QR code" className="qr-image" />  */}
      <img src="/images/upi-qr.png" alt="UPI QR code" className="qr-image" />

      <div className="qr-details">
        <p className="qr-amount">Pay {formatPrice(amount)}</p>
        <p className="qr-hint">Scan with any UPI app (GPay, PhonePe, Paytm), then click the button below.</p>
        <p className="qr-upi">UPI ID: princedhillon@ybl</p>
      </div>
    </div>
  );
}
