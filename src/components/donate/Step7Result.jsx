import { motion } from "framer-motion";
import { CheckCircle, XCircle, Home, Download, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", GBP: "£", AED: "AED" };

export default function Step7Result({ data, transactionId, onRetry, onViewInvoice }) {
  const symbol = CURRENCY_SYMBOLS[data.currency] || "$";
  const amount = data.customAmount || data.amount;
  const success = !!transactionId;

  if (!success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <XCircle className="w-14 h-14 text-red-500" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Payment Failed</h2>
        <p className="text-muted-foreground mb-8">Something went wrong. Your payment could not be processed.</p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button onClick={onRetry} className="flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link to="/" className="flex items-center justify-center gap-2 py-3 border-2 border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all">
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5"
      >
        <CheckCircle className="w-14 h-14 text-green-500" />
      </motion.div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-1">JazakAllah Khair!</h2>
      <p className="text-muted-foreground mb-6">Your donation has been received successfully.</p>

      <div className="bg-secondary/50 rounded-2xl border border-border p-5 text-left mb-6">
        <div className="space-y-2">
          {[
            { label: "Donor", value: data.name },
            { label: "Donation Type", value: data.donationType },
            { label: "Amount", value: `${symbol}${amount} ${data.currency}` },
            { label: "Transaction ID", value: transactionId },
            { label: "Date", value: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-semibold text-foreground text-right max-w-[60%] break-all">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={onViewInvoice} className="flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">
          <Download className="w-4 h-4" /> Download Invoice
        </button>
        <Link to="/" className="flex items-center justify-center gap-2 py-3 border-2 border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all">
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </motion.div>
  );
}