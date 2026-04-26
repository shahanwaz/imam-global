import { useState } from "react";
import { motion } from "framer-motion";

export default function Step3Details({ data, onUpdate, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!data.name?.trim()) errs.name = "Full name is required";
    if (!data.email?.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Invalid email format";
    if (!data.mobile?.trim()) errs.mobile = "Mobile number is required";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(data.mobile)) errs.mobile = "Invalid mobile number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const field = (key, label, type = "text", placeholder = "", optional = false) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label} {optional && <span className="text-muted-foreground font-normal">(optional)</span>}
      </label>
      <input
        type={type}
        value={data[key] || ""}
        onChange={(e) => { onUpdate({ [key]: e.target.value }); if (errors[key]) setErrors({ ...errors, [key]: "" }); }}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
          errors[key] ? "border-red-400 focus:border-red-400" : "border-border focus:border-primary"
        }`}
      />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Your Details</h2>
      <p className="text-muted-foreground mb-6">We need a few details to send your receipt.</p>

      <div className="space-y-4 mb-6">
        {field("name", "Full Name", "text", "Enter your full name")}
        {field("email", "Email Address", "email", "your@email.com")}
        {field("mobile", "Mobile Number", "tel", "+91 9876543210")}
        {field("address", "Address", "text", "Your address", true)}

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
          <input
            type="text"
            value={data.country || ""}
            readOnly
            className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm bg-secondary/50 text-muted-foreground cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground mt-1">Auto-detected from your location</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 border-2 border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all">
          ← Back
        </button>
        <button onClick={handleNext} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">
          Continue →
        </button>
      </div>
    </motion.div>
  );
}