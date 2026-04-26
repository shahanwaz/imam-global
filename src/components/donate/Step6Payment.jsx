import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Shield } from "lucide-react";

const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", GBP: "£", AED: "AED" };

export default function Step6Payment({ data, onSuccess, onFailure, onBack }) {
  const [processing, setProcessing] = useState(false);
  const symbol = CURRENCY_SYMBOLS[data.currency] || "$";
  const amount = data.customAmount || data.amount;

  // Simulate payment processing (replace with actual Razorpay/Stripe integration)
  const handlePay = async () => {
    setProcessing(true);
    // Simulate async payment
    await new Promise((r) => setTimeout(r, 2000));
    // For demo: generate a fake transaction ID
    const txnId = "TXN" + Date.now();
    // 90% success simulation
    if (Math.random() > 0.1) {
      onSuccess(txnId);
    } else {
      onFailure();
    }
    setProcessing(false);
  };

  const isIndia = data.currency === "INR";

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Payment</h2>
      <p className="text-muted-foreground mb-6">Complete your secure donation of <span className="font-bold text-primary">{symbol}{amount}</span></p>

      <div className="space-y-3 mb-6">
        <div className={`p-4 rounded-xl border-2 flex items-center gap-4 ${isIndia ? "border-primary bg-primary/5" : "border-border"}`}>
          <img src="https://razorpay.com/favicon.ico" alt="Razorpay" className="w-8 h-8 object-contain" />
          <div>
            <p className="font-semibold text-foreground">Razorpay <span className="text-xs text-muted-foreground">(India)</span></p>
            <p className="text-xs text-muted-foreground">UPI, Cards, NetBanking, Wallets</p>
          </div>
          {isIndia && <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
        </div>

        <div className={`p-4 rounded-xl border-2 flex items-center gap-4 ${!isIndia ? "border-primary bg-primary/5" : "border-border"}`}>
          <CreditCard className="w-8 h-8 text-blue-600" />
          <div>
            <p className="font-semibold text-foreground">Stripe <span className="text-xs text-muted-foreground">(International)</span></p>
            <p className="text-xs text-muted-foreground">Visa, Mastercard, Apple Pay</p>
          </div>
          {!isIndia && <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 p-3 bg-secondary/50 rounded-lg">
        <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
        <span>Your payment is 256-bit encrypted and secure. We never store your card details.</span>
      </div>

      <button
        onClick={handlePay}
        disabled={processing}
        className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center justify-center gap-3 shadow-lg shadow-primary/30"
      >
        {processing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay ${symbol}${amount}`
        )}
      </button>

      <button onClick={onBack} disabled={processing} className="w-full mt-3 py-3 border-2 border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all text-sm disabled:opacity-40">
        ← Back
      </button>

      <p className="text-xs text-center text-muted-foreground mt-4">
        Payment integration for Razorpay & Stripe will be live soon.
      </p>
    </motion.div>
  );
}