import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, BookOpen, Home, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const impactItems = [
  { icon: Heart, amount: "$25", description: "Feeds a family for a week", color: "bg-primary/10 text-primary" },
  { icon: Users, amount: "$50", description: "Supports an orphan for a month", color: "bg-accent/10 text-accent" },
  { icon: BookOpen, amount: "$100", description: "Provides educational materials for 10 students", color: "bg-primary/10 text-primary" },
  { icon: Home, amount: "$250", description: "Contributes to elderly care for a month", color: "bg-accent/10 text-accent" },
];

const amounts = [10, 25, 50, 100, 250, 500];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleDonate = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary/5 islamic-pattern py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Support Our Cause
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Make a Difference Today
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your generous donation helps us continue our mission of serving humanity. Every contribution, 
              no matter the size, creates a ripple of positive change in communities worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Your Impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how your donation translates into real-world impact.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {impactItems.map((item, i) => (
              <motion.div
                key={item.amount}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border text-center shadow-sm"
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <p className="font-heading text-2xl font-bold text-foreground mb-2">{item.amount}</p>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Donation Form */}
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-2xl p-10 border border-border shadow-sm text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your generous intention to donate ${customAmount || selectedAmount} has been noted. 
                  Payment integration will be available soon. JazakAllah Khair for your support!
                </p>
                <Link to="/" className="text-primary font-semibold hover:underline">
                  Return to Home
                </Link>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleDonate}
                className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-sm"
              >
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Choose Your Amount</h3>
                <p className="text-muted-foreground mb-8">Select a preset amount or enter a custom value.</p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                      className={`py-3 rounded-lg font-semibold transition-all ${
                        selectedAmount === amount && !customAmount
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-secondary text-foreground hover:bg-primary/10"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-foreground mb-2">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      placeholder="Enter amount"
                      className="w-full pl-8 pr-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Donate ${customAmount || selectedAmount || 0}
                </button>

                <p className="text-center text-muted-foreground text-xs mt-4">
                  Secure payment integration coming soon. Your generosity matters!
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}