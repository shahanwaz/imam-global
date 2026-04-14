import { motion } from "framer-motion";
import { Heart, Calculator, Star, Gift } from "lucide-react";

const DONATION_TYPES = [
  {
    id: "sadqa",
    icon: Heart,
    label: "Sadqa",
    arabic: "صدقة",
    desc: "Voluntary charity for any noble cause",
    color: "primary",
  },
  {
    id: "zakat",
    icon: Calculator,
    label: "Zakat",
    arabic: "زكاة",
    desc: "Obligatory 2.5% on eligible wealth",
    color: "accent",
  },
  {
    id: "khums",
    icon: Star,
    label: "Khums",
    arabic: "خمس",
    desc: "One-fifth (20%) of annual savings",
    color: "primary",
  },
  {
    id: "general",
    icon: Gift,
    label: "General",
    arabic: "عام",
    desc: "Support any of our active programs",
    color: "accent",
  },
];

export default function DonationTypeSelector({ selected, onSelect }) {
  return (
    <div>
      <h3 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">
        Select Donation Type
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {DONATION_TYPES.map((type, i) => {
          const Icon = type.icon;
          const isSelected = selected === type.id;
          return (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              type="button"
              onClick={() => onSelect(type.id)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className={`font-bold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>{type.label}</p>
              <p className="text-muted-foreground text-xs font-arabic">{type.arabic}</p>
              <p className="text-muted-foreground text-xs mt-1 leading-tight hidden sm:block">{type.desc}</p>
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export { DONATION_TYPES };