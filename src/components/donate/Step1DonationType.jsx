import { motion } from "framer-motion";
import { Heart, Star, Coins, Gift } from "lucide-react";

const TYPES = [
  { id: "Sadqa", icon: Heart, color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200" },
  { id: "Zakat", icon: Star, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "Khums", icon: Coins, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  { id: "General Donation", icon: Gift, color: "text-primary", bg: "bg-primary/5", border: "border-primary/20" },
];

const LABELS = {
  Sadqa: { title: "Sadqa", desc: "Voluntary charity for the pleasure of Allah" },
  Zakat: { title: "Zakat", desc: "Obligatory almsgiving — 2.5% of savings" },
  Khums: { title: "Khums", desc: "20% of annual surplus savings" },
  "General Donation": { title: "General Donation", desc: "Support our mission and programs" },
};

export default function Step1DonationType({ data, onUpdate, onNext }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Select Donation Type</h2>
      <p className="text-muted-foreground mb-6">Choose the category that best describes your donation.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {TYPES.map(({ id, icon: Icon, color, bg, border }) => {
          const selected = data.donationType === id;
          return (
            <button
              key={id}
              onClick={() => onUpdate({ donationType: id })}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                selected
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : `${border} ${bg} hover:border-primary/50`
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${selected ? "bg-primary/10" : bg}`}>
                <Icon className={`w-5 h-5 ${selected ? "text-primary" : color}`} />
              </div>
              <p className={`font-semibold text-base ${selected ? "text-primary" : "text-foreground"}`}>{LABELS[id].title}</p>
              <p className="text-muted-foreground text-sm mt-1">{LABELS[id].desc}</p>
              {selected && (
                <div className="mt-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center ml-auto">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!data.donationType}
        className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </motion.div>
  );
}