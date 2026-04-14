import { motion } from "framer-motion";
import { CheckCircle, Download, Home } from "lucide-react";
import { Link } from "react-router-dom";

function generateReceiptHTML({ donor, amount, currency, donationType, campaign, txnId, date }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 40px; background: #f9fafb; color: #111; }
    .card { background: white; border-radius: 16px; padding: 40px; max-width: 560px; margin: auto; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { text-align: center; border-bottom: 2px solid #158a5c; padding-bottom: 24px; margin-bottom: 24px; }
    .logo { font-size: 28px; font-weight: bold; color: #158a5c; }
    .subtitle { color: #666; font-size: 13px; margin-top: 4px; }
    .badge { display: inline-block; background: #dcfce7; color: #158a5c; padding: 4px 16px; border-radius: 99px; font-size: 12px; font-weight: 600; margin-top: 8px; }
    .amount-box { background: linear-gradient(135deg, #158a5c, #0f6b47); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; color: white; }
    .amount-box .label { font-size: 13px; opacity: 0.8; }
    .amount-box .value { font-size: 40px; font-weight: bold; margin: 4px 0; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    .row .key { color: #888; }
    .row .val { font-weight: 600; }
    .footer { text-align: center; margin-top: 28px; font-size: 12px; color: #aaa; }
    .footer strong { color: #158a5c; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">IMAM</div>
      <div class="subtitle">Imam Mahdi Awareness Mission</div>
      <div class="badge">✓ Official Donation Receipt</div>
    </div>
    <div class="amount-box">
      <div class="label">Donation Amount</div>
      <div class="value">${currency.symbol}${Number(amount).toLocaleString()} ${currency.code}</div>
      <div class="label">${donationType.toUpperCase()}</div>
    </div>
    <div class="row"><span class="key">Donor Name</span><span class="val">${donor.name}</span></div>
    <div class="row"><span class="key">Email</span><span class="val">${donor.email}</span></div>
    <div class="row"><span class="key">Country</span><span class="val">${donor.country || "—"}</span></div>
    <div class="row"><span class="key">Campaign</span><span class="val">${campaign}</span></div>
    <div class="row"><span class="key">Donation Type</span><span class="val">${donationType}</span></div>
    <div class="row"><span class="key">Transaction ID</span><span class="val">${txnId}</span></div>
    <div class="row"><span class="key">Date</span><span class="val">${date}</span></div>
    <div class="footer">
      <p>JazakAllah Khair for your generous contribution 🤲</p>
      <p><strong>IMAM NGO</strong> • imam-mission.org • info@imam-mission.org</p>
      <p style="margin-top:8px; color:#ccc;">This is an official receipt. 100% of funds go to the designated cause.</p>
    </div>
  </div>
</body>
</html>`;
}

function downloadReceipt(data) {
  const html = generateReceiptHTML(data);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `IMAM_Donation_Receipt_${data.txnId}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DonationReceipt({ data }) {
  const { donor, amount, currency, donationType, campaign, txnId, date } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto"
    >
      <div className="bg-card rounded-2xl p-10 border border-border shadow-lg text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          JazakAllah Khair! 🤲
        </h3>
        <p className="text-muted-foreground mb-6">
          Your donation of <strong className="text-primary">{currency.symbol}{Number(amount).toLocaleString()} {currency.code}</strong> ({donationType}) has been recorded.
        </p>

        {/* Mini receipt preview */}
        <div className="bg-secondary/60 rounded-xl p-5 text-left mb-6 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Donor</span><span className="font-semibold">{donor.name}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Cause</span><span className="font-semibold">{campaign}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-semibold capitalize">{donationType}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Txn ID</span><span className="font-mono text-xs">{txnId}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{date}</span></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => downloadReceipt(data)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
          >
            <Download className="w-4 h-4" /> Download Receipt
          </button>
          <Link to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-all"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          A receipt has been saved. Payment integration coming soon.
        </p>
      </div>
    </motion.div>
  );
}