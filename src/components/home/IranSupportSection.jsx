import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, AlertTriangle } from "lucide-react";

export default function IranSupportSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://media.base44.com/images/public/69d8d0da330a3411105d20d1/04624a34b_Gemini_Generated_Image_uz3neyuz3neyuz3n.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60" />

      {/* Flag accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#239f40]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#da0000]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-2 px-4 py-1.5 bg-red-600/80 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                Emergency Appeal
              </span>
              <span className="text-2xl">🇮🇷</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Stand with Iran
            </h2>

            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-4">
              Support innocent lives and families affected during this critical time.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-10">
              Thousands of families are suffering. Your contribution — no matter how small — can bring relief, warmth, and hope to those who need it most. Every act of giving is an act of humanity.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { number: "10,000+", label: "Families Affected" },
                { number: "Urgent", label: "Medical Aid Needed" },
                { number: "100%", label: "Goes to Relief" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-2xl font-bold text-white">{stat.number}</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}