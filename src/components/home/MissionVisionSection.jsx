import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function MissionVisionSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Our Purpose
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Mission & Vision
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 md:p-10 shadow-sm border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-primary/50" />
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Spread awareness about Imam Mahdi (A.S.), support humanity through welfare and education, 
              and build a connected, empowered Shia community that serves as a beacon of hope and compassion.
            </p>
            <ul className="mt-6 space-y-3">
              {["Spread spiritual awareness", "Support underprivileged communities", "Build global Shia unity", "Empower through education"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 md:p-10 shadow-sm border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-accent/50" />
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A unified global community guided by faith, knowledge, and service — where every individual 
              has access to spiritual guidance, basic necessities, and the strength of a caring community.
            </p>
            <ul className="mt-6 space-y-3">
              {["A united global Shia community", "Faith-driven humanitarian work", "Knowledge accessible to all", "Technology-powered outreach"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}