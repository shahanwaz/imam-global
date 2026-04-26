import { useState } from "react";
import { motion } from "framer-motion";

const CURRENCY_PRESETS = {
  INR: { symbol: "₹", amounts: [100, 500, 1000, 5000], min: 10 },
  USD: { symbol: "$", amounts: [10, 25, 50, 100], min: 5 },
  GBP: { symbol: "£", amounts: [10, 25, 50, 100], min: 5 },
  AED: { symbol: "AED", amounts: [25, 50, 100, 500], min: 10 },
  default: { symbol: "$", amounts: [10, 25, 50, 100], min: 5 },
};

export default function Step2Amount({ data, onUpdate, onNext, onBack }) {
  const [error, setError] = useState("");
  const currency = data.currency || "USD";
  const preset = CURRENCY_PRESETS[currency] || CURRENCY_PRESETS.default;
  const symbol = preset.symbol;

  const handleNext = () => {
    const amt = Number(data.customAmount || data.amount);
    if (!amt || amt < preset.min) {
      setError(`Minimum donation is ${symbol}${preset.min}`);
      return;
    }
    setError("");
    onUpdate({ amount: amt, customAmount: "" });
    onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Select Amount</h2>
      <p className="text-muted-foreground mb-1">
        Donating as: <span className="font-semibold text-primary">{data.donationType}</span>
      </p>
      <p className="text-muted-foreground text-sm mb-6">
        Currency: <span className="font-semibold text-foreground">{currency} ({symbol})</span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {preset.amounts.map((amt) => (
          <button
            key={amt}
            onClick={() => { onUpdate({ amount: amt, customAmount: "" }); setError(""); }}
            className={`py-3 rounded-xl border-2 font-bold text-lg transition-all ${
              data.amount === amt && !data.customAmount
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border hover:border-primary hover:text-primary"
            }`}
          >
            {symbol}{amt}
          </button>
        ))}
      </div>

      <div className="relative mb-2">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{symbol}</span>
        <input
          type="number"
          placeholder="Custom amount"
          value={data.customAmount || ""}
          onChange={(e) => { onUpdate({ customAmount: e.target.value, amount: null }); setError(""); }}
          className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20 mb-6">
        <p className="text-sm text-muted-foreground">Selected Amount</p>
        <p className="font-heading text-3xl font-bold text-primary">
          {symbol}{data.customAmount || data.amount || 0}
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 border-2 border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all">
          ← Back
        </button>
        <button onClick={handleNext} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">
          Next →
        </button>
      </div>
    </motion.div>
  );
}