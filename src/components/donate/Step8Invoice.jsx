import { motion } from "framer-motion";
import { Download, Mail, Home, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useState } from "react";

const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", GBP: "£", AED: "AED" };

function generateInvoiceHTML(data, transactionId) {
  const symbol = CURRENCY_SYMBOLS[data.currency] || "$";
  const amount = data.customAmount || data.amount;
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>IMAM NGO – Donation Receipt</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 40px; background: #f9fafb; color: #1a1a1a; }
    .card { background: #fff; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { text-align: center; border-bottom: 2px solid #158a5c; padding-bottom: 24px; margin-bottom: 24px; }
    .logo { font-size: 28px; font-weight: 800; color: #158a5c; }
    .subtitle { color: #6b7280; font-size: 13px; margin-top: 4px; }
    .badge { display: inline-block; background: #158a5c; color: #fff; padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 8px; }
    table { width: 100%; border-collapse: collapse; }
    tr td { padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    tr td:first-child { color: #6b7280; }
    tr td:last-child { font-weight: 600; text-align: right; }
    .total-row td { font-size: 18px; font-weight: 800; color: #158a5c; border-bottom: none; padding-top: 16px; }
    .footer { margin-top: 28px; text-align: center; color: #9ca3af; font-size: 12px; }
    .verified { color: #158a5c; font-weight: 700; text-align: center; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">🕌 IMAM NGO</div>
      <div class="subtitle">Imam Mahdi Awareness Mission</div>
      <div class="badge">Donation Receipt</div>
    </div>
    <table>
      <tr><td>Receipt No.</td><td>${transactionId}</td></tr>
      <tr><td>Date</td><td>${date}</td></tr>
      <tr><td>Donor Name</td><td>${data.name}</td></tr>
      <tr><td>Email</td><td>${data.email}</td></tr>
      <tr><td>Mobile</td><td>${data.mobile}</td></tr>
      <tr><td>Country</td><td>${data.country || "—"}</td></tr>
      <tr><td>Donation Type</td><td>${data.donationType}</td></tr>
      <tr><td>Currency</td><td>${data.currency}</td></tr>
      <tr class="total-row"><td>Total Amount</td><td>${symbol}${amount}</td></tr>
    </table>
    <p class="verified">✅ Payment Verified & Confirmed</p>
    <div class="footer">
      <p>Thank you for your generous contribution. JazakAllah Khair!</p>
      <p>This is an auto-generated receipt. For queries: contact@imamngo.org</p>
    </div>
  </div>
</body>
</html>`;
}

export default function Step8Invoice({ data, transactionId }) {
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  const downloadInvoice = () => {
    const html = generateInvoiceHTML(data, transactionId);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `IMAM-Donation-${transactionId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendEmailCopy = async () => {
    setSending(true);
    try {
      const symbol = CURRENCY_SYMBOLS[data.currency] || "$";
      const amount = data.customAmount || data.amount;
      await base44.integrations.Core.SendEmail({
        to: data.email,
        subject: `Your Donation Receipt – IMAM NGO (${transactionId})`,
        body: `Dear ${data.name},\n\nThank you for your ${data.donationType} donation of ${symbol}${amount}.\n\nTransaction ID: ${transactionId}\nDate: ${new Date().toLocaleDateString()}\n\nJazakAllah Khair!\n\nIMAM NGO`,
      });
      setEmailSent(true);
    } catch {
      alert("Failed to send email. Please try again.");
    }
    setSending(false);
  };

  const symbol = CURRENCY_SYMBOLS[data.currency] || "$";
  const amount = data.customAmount || data.amount;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-9 h-9 text-primary" />
      </div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Invoice Ready</h2>
      <p className="text-muted-foreground mb-6">Download or email your donation receipt.</p>

      {/* Receipt preview */}
      <div className="bg-secondary/40 rounded-2xl border border-border p-5 text-left mb-6">
        <div className="flex items-center gap-3 mb-4 border-b border-border pb-4">
          <span className="text-2xl">🕌</span>
          <div>
            <p className="font-heading font-bold text-foreground">IMAM NGO</p>
            <p className="text-xs text-muted-foreground">Imam Mahdi Awareness Mission</p>
          </div>
          <span className="ml-auto px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-semibold">Receipt</span>
        </div>
        <div className="space-y-2 text-sm">
          {[
            ["Donor", data.name],
            ["Email", data.email],
            ["Type", data.donationType],
            ["Amount", `${symbol}${amount} ${data.currency}`],
            ["Transaction ID", transactionId],
            ["Date", new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-semibold text-foreground break-all max-w-[55%] text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={downloadInvoice} className="flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">
          <Download className="w-4 h-4" /> Download Receipt
        </button>
        <button onClick={sendEmailCopy} disabled={sending || emailSent} className="flex items-center justify-center gap-2 py-3 border-2 border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all disabled:opacity-60">
          <Mail className="w-4 h-4" />
          {emailSent ? "Email Sent ✓" : sending ? "Sending..." : "Email a Copy"}
        </button>
        <Link to="/" className="flex items-center justify-center gap-2 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/70 transition-all">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </motion.div>
  );
}