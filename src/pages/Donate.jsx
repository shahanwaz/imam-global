import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, CheckCircle } from "lucide-react";

const PRESET_AMOUNTS = [25, 50, 100, 250];

export default function Donate() {
  const { t } = useOutletContext();
  const d = t.donate;

  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const finalAmount = customAmount || selectedAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl shadow-xl p-10 max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">{d.thankYou}</h2>
          <p className="text-muted-foreground mb-8">{d.thankYouText}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            {d.returnHome}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-primary/5 islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              {d.heroBadge}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5">
              {d.heroHeading}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{d.heroSubtext}</p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{d.donateSectionHeading}</h2>

              {/* Amount selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-3">{d.selectAmount}</p>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                      className={`py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                        selectedAmount === amt && !customAmount
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder={d.enterAmount}
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={d.fullNameLabel}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="email"
                  placeholder={d.emailLabel}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <textarea
                  placeholder={d.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg"
                >
                  <Heart className="w-5 h-5" />
                  {d.donateCta} {finalAmount ? `$${finalAmount}` : ""}
                </button>
                <p className="text-xs text-muted-foreground text-center">{d.disclaimer}</p>
              </form>
            </motion.div>

            {/* Impact */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{d.impactHeading}</h2>
              <p className="text-muted-foreground mb-6">{d.impactSubtext}</p>
              <div className="space-y-4">
                {d.impacts.map((item) => (
                  <div key={item.amount} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-border">
                    <span className="font-heading text-xl font-bold text-primary w-16 flex-shrink-0">{item.amount}</span>
                    <span className="text-foreground text-sm">{item.description}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}