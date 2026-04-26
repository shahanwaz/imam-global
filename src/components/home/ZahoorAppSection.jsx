import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, BookOpen, Globe, HandHeart } from "lucide-react";

const featureIcons = [Heart, Users, BookOpen, Globe, HandHeart];

export default function ZahoorAppSection({ t }) {
  const section = t.communityOutreach || {
    badge: "Our Community Impact",
    heading: "Connecting Communities Through Service",
    text: "We connect communities worldwide through our welfare programs, educational initiatives, and spiritual guidance — bringing hope and support to those who need it most.",
    features: ["Welfare Programs", "Educational Support", "Spiritual Guidance", "Community Events", "Global Outreach"],
  };

  return (
    <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              {section.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {section.heading}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">{section.text}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {section.features.map((label, i) => {
                const Icon = featureIcons[i] || Heart;
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
                  >
                    <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-white text-sm font-medium">{label}</span>
                  </motion.div>
                );
              })}
            </div>

            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5" />
              {t.cta?.donate || "Donate Now"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: "Orphan Support", value: "2,000+", desc: "Children supported" },
                { icon: Users, label: "Elder Care", value: "500+", desc: "Elderly cared for" },
                { icon: BookOpen, label: "Education", value: "1,000+", desc: "Students helped" },
                { icon: Globe, label: "Global Reach", value: "50+", desc: "Countries reached" },
              ].map(({ icon: Icon, label, value, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="font-heading text-2xl font-bold text-white">{value}</p>
                  <p className="text-white/60 text-xs mt-1">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}