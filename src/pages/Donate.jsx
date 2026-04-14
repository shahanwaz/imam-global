import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Users, Shield, Lock, Globe, ChevronDown,
  AlertTriangle, Star, Zap, BadgeCheck, TrendingUp,
  Baby, GraduationCap, HeartHandshake
} from "lucide-react";
import DonationTypeSelector from "../components/donate/DonationTypeSelector";
import ZakatKhumsCalculator from "../components/donate/ZakatKhumsCalculator";
import DonationReceipt from "../components/donate/DonationReceipt";

// ── Currency config ──────────────────────────────────────────────────────────
const CURRENCIES = {
  USD: { symbol: "$",   code: "USD", name: "US Dollar",        baseAmounts: [10, 25, 50, 100, 250, 500] },
  INR: { symbol: "₹",  code: "INR", name: "Indian Rupee",      baseAmounts: [100, 500, 1000, 2500, 5000, 10000] },
  PKR: { symbol: "₨",  code: "PKR", name: "Pakistani Rupee",   baseAmounts: [500, 1000, 2500, 5000, 10000, 25000] },
  IRR: { symbol: "﷼",  code: "IRR", name: "Iranian Toman",     baseAmounts: [50000, 100000, 250000, 500000, 1000000, 2500000] },
  AED: { symbol: "د.إ",code: "AED", name: "UAE Dirham",        baseAmounts: [25, 50, 100, 250, 500, 1000] },
  GBP: { symbol: "£",  code: "GBP", name: "British Pound",     baseAmounts: [10, 20, 50, 100, 200, 500] },
};

const COUNTRY_TO_CURRENCY = {
  IN: "INR", PK: "PKR", IR: "IRR", AE: "AED", GB: "GBP",
  US: "USD", CA: "USD", AU: "USD",
};

// ── Campaigns ────────────────────────────────────────────────────────────────
const CAMPAIGNS = [
  { id: "orphan",    icon: Baby,          title: "Orphan Support",           description: "Shelter, education & love for orphaned children.", image: "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/972b0f496_generated_22536eea.png",  raised: 78, urgent: false },
  { id: "oldage",   icon: HeartHandshake, title: "Old Age Care",              description: "Dignity & companionship for our elders.",          image: "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/4f18ad0c6_generated_c2191887.png",  raised: 55, urgent: false },
  { id: "education",icon: GraduationCap,  title: "Education Fund",            description: "Scholarships for underserved students.",           image: "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/56b46b3c1_generated_c0392487.png",  raised: 62, urgent: false },
  { id: "iran",     icon: AlertTriangle,  title: "Emergency Relief — Iran 🇮🇷",description: "Urgent aid for families in crisis.",              image: "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/04624a34b_Gemini_Generated_Image_uz3neyuz3neyuz3n.png", raised: 34, urgent: true },
];

const IMPACT_STATS = [
  { number: "50,000+", label: "People Helped",     icon: Users },
  { number: "$2M+",    label: "Funds Raised",       icon: TrendingUp },
  { number: "12",      label: "Active Campaigns",   icon: Zap },
  { number: "50+",     label: "Countries Reached",  icon: Globe },
];

const TRUST_BADGES = [
  { icon: Lock,       label: "SSL Secured" },
  { icon: Shield,     label: "256-bit Encryption" },
  { icon: BadgeCheck, label: "Verified NGO" },
  { icon: Star,       label: "Trusted by 10K+" },
];

function generateTxnId() {
  return "IMAM-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export default function Donate() {
  const { t } = useOutletContext();

  // Currency
  const [currency, setCurrency] = useState(CURRENCIES.USD);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(true);

  // Donation
  const [donationType, setDonationType] = useState("sadqa");
  const [selectedCampaign, setSelectedCampaign] = useState("orphan");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  // Form
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Auto-detect currency
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const cur = COUNTRY_TO_CURRENCY[data.country_code] || "USD";
        setCurrency(CURRENCIES[cur]);
        setForm(prev => ({ ...prev, country: data.country_name || "" }));
      } catch { /* default USD */ }
      finally { setDetectingLocation(false); }
    })();
  }, []);

  // Reset amount when currency changes
  useEffect(() => {
    setSelectedAmount(currency.baseAmounts[1]);
    setCustomAmount("");
  }, [currency]);

  const displayAmount = customAmount || selectedAmount || 0;

  const handleDonate = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    setTimeout(() => {
      setReceiptData({
        donor: form,
        amount: displayAmount,
        currency,
        donationType,
        campaign: CAMPAIGNS.find(c => c.id === selectedCampaign)?.title || selectedCampaign,
        txnId: generateTxnId(),
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      });
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background" dir="ltr">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-primary overflow-hidden py-20 lg:py-28 islamic-pattern">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/40 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
              Support Our Cause
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Make a Difference<br />
              <span className="text-accent">Around the World</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
              Your generosity transforms lives. Support orphans, elderly care, education, and emergency relief globally — with full Islamic donation types.
            </p>
            <div className="flex flex-wrap gap-4">
              {IMPACT_STATS.slice(0, 2).map((s) => (
                <div key={s.label} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                  <s.icon className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-bold text-white text-lg leading-none">{s.number}</p>
                    <p className="text-white/60 text-xs">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT STATS ─────────────────────────────────────────────────── */}
      <section className="py-14 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border text-center shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-heading text-2xl font-bold text-foreground">{stat.number}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPAIGNS ────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">Active Causes</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Choose Your Cause</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Every cause matters. Select what resonates with your heart.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAMPAIGNS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedCampaign(c.id)}
                  className={`relative bg-card rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 ${selectedCampaign === c.id ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
                  {c.urgent && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">URGENT</span>
                    </div>
                  )}
                  {selectedCampaign === c.id && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      </div>
                    </div>
                  )}
                  <div className="h-40 overflow-hidden">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${c.urgent ? "bg-red-100" : "bg-primary/10"}`}>
                      <Icon className={`w-5 h-5 ${c.urgent ? "text-red-600" : "text-primary"}`} />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2 text-sm">{c.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">{c.description}</p>
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{c.raised}% raised</span><span>Goal</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full transition-all ${c.urgent ? "bg-red-500" : "bg-primary"}`} style={{ width: `${c.raised}%` }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY IRAN ───────────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://media.base44.com/images/public/69d8d0da330a3411105d20d1/04624a34b_Gemini_Generated_Image_uz3neyuz3neyuz3n.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#239f40]" /><div className="flex-1 bg-white" /><div className="flex-1 bg-[#da0000]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center gap-2 px-4 py-1.5 bg-red-600/90 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5" /> Emergency Appeal
                </span>
                <span className="text-3xl">🇮🇷</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Stand with Iran<br />in This Critical Time
              </h2>
              <p className="text-white/85 text-lg leading-relaxed mb-3">
                Thousands of families are suffering. Your contribution can bring relief, warmth, and hope.
              </p>
              <p className="text-white/65 text-base leading-relaxed mb-8">
                Every act of giving is an act of humanity. Support affected communities with food, medical aid, and shelter.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                {[{ n: "10,000+", l: "Families Affected" }, { n: "Urgent", l: "Medical Aid Needed" }, { n: "100%", l: "Goes to Relief" }].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="font-heading text-2xl font-bold text-white">{s.n}</p>
                    <p className="text-white/60 text-xs uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => { setSelectedCampaign("iran"); document.getElementById("donate-form")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:scale-105">
                  <Heart className="w-5 h-5" /> Donate Now
                </button>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DONATE FORM ──────────────────────────────────────────────────── */}
      <section id="donate-form" className="py-20 lg:py-28 bg-secondary/30 islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">Donate Securely</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Complete Your Donation</h2>
            <p className="text-muted-foreground text-lg">Your support is 100% secure and reaches those in need.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {receiptData ? (
              <motion.div key="receipt" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <DonationReceipt data={receiptData} />
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

                {/* ── LEFT PANEL ── */}
                <div className="lg:col-span-2 space-y-5">

                  {/* Currency Selector */}
                  <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
                    <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-primary" /> Your Currency
                    </h3>
                    {detectingLocation ? (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Detecting location...
                      </div>
                    ) : (
                      <div className="relative">
                        <button onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all text-sm">
                          <span className="font-semibold text-foreground">{currency.symbol} {currency.code} — {currency.name}</span>
                          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showCurrencyMenu ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {showCurrencyMenu && (
                            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                              className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-30 overflow-hidden">
                              {Object.values(CURRENCIES).map((cur) => (
                                <button key={cur.code} onClick={() => { setCurrency(cur); setShowCurrencyMenu(false); }}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary/5 transition-colors text-left ${currency.code === cur.code ? "bg-primary/10 text-primary font-semibold" : "text-foreground"}`}>
                                  <span className="font-bold w-8">{cur.symbol}</span>
                                  <span>{cur.code} — {cur.name}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Amount Selector */}
                  <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
                    <h3 className="font-heading font-semibold text-foreground mb-3 text-sm">Select Amount</h3>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {currency.baseAmounts.map((amt) => (
                        <button key={amt} type="button"
                          onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                          className={`py-2.5 px-1 rounded-lg font-semibold text-xs transition-all ${selectedAmount === amt && !customAmount ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-foreground hover:bg-primary/10 border border-border"}`}>
                          {currency.symbol}{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Custom Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">{currency.symbol}</span>
                        <input type="number" value={customAmount}
                          onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-4 py-2.5 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-0.5">Selected Cause</p>
                      <p className="font-semibold text-primary text-sm">{CAMPAIGNS.find(c => c.id === selectedCampaign)?.title}</p>
                    </div>
                  </div>

                  {/* Zakat / Khums Calculator */}
                  <ZakatKhumsCalculator
                    donationType={donationType}
                    currency={currency}
                    onUseAmount={(amt) => { setCustomAmount(String(amt)); setSelectedAmount(null); }}
                  />

                  {/* Trust Badges */}
                  <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
                    <h3 className="font-heading font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" /> Secure & Trusted
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {TRUST_BADGES.map((b) => (
                        <div key={b.label} className="flex items-center gap-2 bg-secondary/80 rounded-lg px-3 py-2">
                          <b.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{b.label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-center">100% reaches those in need</p>
                  </div>
                </div>

                {/* ── RIGHT PANEL: FORM ── */}
                <form onSubmit={handleDonate} className="lg:col-span-3 bg-card rounded-2xl p-8 border border-border shadow-sm space-y-6">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-1">Your Donation</h3>
                    <p className="text-muted-foreground text-sm">No login required. Secure & confidential.</p>
                  </div>

                  {/* Donation Type */}
                  <DonationTypeSelector selected={donationType} onSelect={setDonationType} />

                  {/* Personal Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Your Details</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          placeholder="Your name"
                          className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                        <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Phone <span className="text-muted-foreground text-xs">(optional)</span></label>
                        <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                          placeholder="+1 234 567 890"
                          className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                        <input type="text" value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                          placeholder="Auto-detected"
                          className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Message <span className="text-muted-foreground text-xs">(optional)</span></label>
                      <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        rows={3} placeholder="Share why you're donating..."
                        className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm resize-none" />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Payment Method</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["💳 Card", "🏦 Net Banking", "📱 UPI"].map((m) => (
                        <div key={m} className="flex items-center justify-center bg-secondary border border-border rounded-lg py-2.5 text-xs font-medium text-muted-foreground">
                          {m}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">Razorpay (India) & Stripe (Global) — coming soon</p>
                  </div>

                  {/* Summary + Submit */}
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Donation Type</span>
                      <span className="font-semibold capitalize text-foreground">{donationType}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Cause</span>
                      <span className="font-semibold text-foreground text-right max-w-[180px]">{CAMPAIGNS.find(c => c.id === selectedCampaign)?.title}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold mt-2 border-t border-primary/20 pt-2">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">{currency.symbol}{Number(displayAmount).toLocaleString()} {currency.code}</span>
                    </div>
                  </div>

                  <button type="submit" disabled={submitting}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70">
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Heart className="w-5 h-5" />
                    )}
                    {submitting ? "Processing..." : `Donate ${currency.symbol}${Number(displayAmount).toLocaleString()} ${currency.code}`}
                  </button>
                  <p className="text-center text-muted-foreground text-xs">🔒 Secure. No login required. Receipt auto-generated.</p>
                </form>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── IMPACT ───────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">See the Difference You Make</h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto">Every donation, big or small, creates real change.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { amount: currency.baseAmounts[0], desc: "Feeds a child for a week" },
              { amount: currency.baseAmounts[1], desc: "Supports an orphan for a month" },
              { amount: currency.baseAmounts[2], desc: "Provides medical aid to a family" },
              { amount: currency.baseAmounts[4], desc: "Funds a student's education" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
                <p className="font-heading text-3xl font-bold text-accent mb-2">{currency.symbol}{item.amount.toLocaleString()}</p>
                <p className="text-white/75 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Your Trust Is Our Foundation</h2>
            <p className="text-muted-foreground mb-8">We are committed to full transparency, accountability, and dignity in every act of service.</p>
            <div className="flex flex-wrap justify-center gap-5 mb-6">
              {TRUST_BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-2 bg-card border border-border rounded-xl px-5 py-3 shadow-sm">
                  <b.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{b.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">IMAM NGO operates with full transparency. All funds are audited and 100% directed to the designated cause.</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}