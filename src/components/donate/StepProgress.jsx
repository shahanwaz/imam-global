import { Check } from "lucide-react";

const STEPS = [
  "Type",
  "Amount",
  "Details",
  "Verify",
  "Summary",
  "Payment",
];

export default function StepProgress({ currentStep }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* line behind */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-border z-0" />
        <div
          className="absolute left-0 top-5 h-0.5 bg-primary z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
        {STEPS.map((label, i) => {
          const step = i + 1;
          const done = currentStep > step;
          const active = currentStep === step;
          return (
            <div key={label} className="flex flex-col items-center z-10 gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  done
                    ? "bg-primary border-primary text-primary-foreground"
                    : active
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-background border-border text-muted-foreground"
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : step}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${active ? "text-primary" : done ? "text-primary/70" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}