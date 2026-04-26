import { motion } from "framer-motion";
import { Edit2 } from "lucide-react";

const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", GBP: "£", AED: "AED" };

export default function Step5Summary({ data, onNext, onBack, onEdit }) {
  const symbol = CURRENCY_SYMBOLS[data.currency] || "$";
  const amount = data.customAmount || data.amount;

  const rows = [
    { label: "Donation Type", value: data.donationType },
    { label: "Amount", value: `${symbol}${amount} ${data.currency}` },
    { label: "Full Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Mobile", value: data.mobile },
    { label: "Country", value: data.country },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Donation Summary</h2>
      <p className="text-muted-foreground mb-6">Please review your donation details before payment.</p>

      <div className="bg-secondary/40 rounded-2xl border border-border overflow-hidden mb-6">
        {rows.map(({ label, value }, i) => (
          <div key={label} className={`flex items-center justify-between px-5 py-3.5 ${i !== rows.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-muted-foreground text-sm">{label}</span>
            <span className="font-semibold text-foreground text-sm">{value || "—"}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Total to Pay</p>
          <p className="font-heading text-3xl font-bold text-primary">{symbol}{amount}</p>
        </div>
        <button onClick={() => onEdit(1)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 border border-border rounded-lg">
          <Edit2 className="w-3 h-3" /> Edit
        </button>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 border-2 border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all">
          ← Back
        </button>
        <button onClick={onNext} className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">
          Proceed to Pay →
        </button>
      </div>
    </motion.div>
  );
}