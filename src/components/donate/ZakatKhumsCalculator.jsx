import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronDown, ChevronUp } from "lucide-react";

function InputField({ label, value, onChange, symbol }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{symbol}</span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="0"
          className="w-full pl-8 pr-3 py-2.5 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
        />
      </div>
    </div>
  );
}

export default function ZakatKhumsCalculator({ donationType, currency, onUseAmount }) {
  const [open, setOpen] = useState(false);

  // Zakat fields
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [business, setBusiness] = useState("");
  const [liabilities, setLiabilities] = useState("");

  // Khums field
  const [savings, setSavings] = useState("");

  const sym = currency.symbol;

  const zakatableAssets = (Number(cash) || 0) + (Number(gold) || 0) + (Number(silver) || 0) + (Number(business) || 0);
  const zakatNet = Math.max(0, zakatableAssets - (Number(liabilities) || 0));
  const zakatDue = Math.round(zakatNet * 0.025);

  const khums = Math.round((Number(savings) || 0) * 0.20);

  const result = donationType === "zakat" ? zakatDue : khums;
  const hasResult = result > 0;

  if (donationType !== "zakat" && donationType !== "khums") return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-accent/5 border border-accent/30 rounded-2xl overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-accent" />
          <span className="font-semibold text-foreground text-sm">
            {donationType === "zakat" ? "Zakat Calculator" : "Khums Calculator"}
          </span>
          <span className="text-xs text-muted-foreground">— calculate your due</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 pb-5"
          >
            {donationType === "zakat" ? (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground mb-3">Enter your assets to calculate 2.5% Zakat</p>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Cash & Savings" value={cash} onChange={setCash} symbol={sym} />
                  <InputField label="Gold Value" value={gold} onChange={setGold} symbol={sym} />
                  <InputField label="Silver Value" value={silver} onChange={setSilver} symbol={sym} />
                  <InputField label="Business Assets" value={business} onChange={setBusiness} symbol={sym} />
                </div>
                <InputField label="Liabilities / Debts" value={liabilities} onChange={setLiabilities} symbol={sym} />
                <div className="bg-card rounded-xl p-4 border border-border mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Total Zakatable</span>
                    <span className="font-semibold text-foreground">{sym}{zakatNet.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Zakat Due (2.5%)</span>
                    <span className="font-bold text-primary text-base">{sym}{zakatDue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground mb-3">Enter your annual savings to calculate 20% Khums</p>
                <InputField label="Annual Net Savings" value={savings} onChange={setSavings} symbol={sym} />
                <div className="bg-card rounded-xl p-4 border border-border mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Khums Due (20%)</span>
                    <span className="font-bold text-primary text-base">{sym}{khums.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {hasResult && (
              <motion.button
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                type="button"
                onClick={() => onUseAmount(result)}
                className="mt-4 w-full py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:bg-accent/90 transition-all"
              >
                Use {sym}{result.toLocaleString()} as Donation Amount
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}