import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, BookOpen, Home, CheckCircle } from "lucide-react";

const amounts = [10, 25, 50, 100, 250, 500];
const impactIcons = [Heart, Users, BookOpen, Home];

export default function Donate() {
  const { t } = useOutletContext();
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleDonate = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="bg-primary/5 islamic-pattern py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              {t.donate.badge}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{t.donate.heading}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.donate.subtext}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{t.donate.impactHeading}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.donate.impactSubtext}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {t.donate.impacts.map((item, i) => {
              const Icon = impactIcons[i];
              const color = i % 2 === 0 ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent";
              return (
                <motion.div key={item.amount} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border text-center shadow-sm">
                  <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className="font-heading text-2xl font-bold text-foreground mb-2">{item.amount}</p>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-2xl p-10 border border-border shadow-sm text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{t.donate.thankYou}</h3>
                <p className="text-muted-foreground mb-6">{t.donate.thankYouText}</p>
                <Link to="/" className="text-primary font-semibold hover:underline">{t.donate.returnHome}</Link>
              </motion.div>
            ) : (
              <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                onSubmit={handleDonate} className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{t.donate.formTitle}</h3>
                <p className="text-muted-foreground mb-8">{t.donate.formSubtext}</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {amounts.map((amount) => (
                    <button key={amount} type="button" onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                      className={`py-3 rounded-lg font-semibold transition-all ${selectedAmount === amount && !customAmount ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-foreground hover:bg-primary/10"}`}>
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-foreground mb-2">{t.donate.customLabel}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                    <input type="number" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      placeholder={t.donate.customPlaceholder}
                      className="w-full pl-8 pr-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  </div>
                </div>
                <button type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  {t.donate.donateCta} ${customAmount || selectedAmount || 0}
                </button>
                <p className="text-center text-muted-foreground text-xs mt-4">{t.donate.disclaimer}</p>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}