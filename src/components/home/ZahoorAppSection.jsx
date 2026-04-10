import { motion } from "framer-motion";
import { MessageCircle, Video, Sparkles, BookOpen, Star, Download } from "lucide-react";

const features = [
  { icon: MessageCircle, label: "Ask Questions" },
  { icon: Video, label: "Watch Majalis" },
  { icon: Sparkles, label: "Istikhara" },
  { icon: BookOpen, label: "Ejara Services" },
  { icon: Star, label: "Islamic Resources" },
];

export default function ZahoorAppSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              Our Digital Platform
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Zahoor — Digital Platform for Shia Community
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Your gateway to the global Shia community. Access Islamic knowledge, connect with scholars, 
              watch Majalis, seek Istikhara, and explore Ejara services — all in one powerful app.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
                >
                  <feature.icon className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-white text-sm font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="https://zahoorinc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download Zahoor App
            </a>
          </motion.div>

          {/* App Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/__generating__/img_e901da7e189d.png"
                alt="Zahoor App - Digital Platform for Shia Community"
                className="w-full h-auto"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
              <p className="font-bold text-lg">10K+</p>
              <p className="text-xs opacity-80">Active Users</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}