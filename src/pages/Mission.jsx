import MissionVisionSection from "../components/home/MissionVisionSection";
import { motion } from "framer-motion";

export default function Mission() {
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
              Our Purpose
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Mission & Vision
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Guided by faith and driven by purpose, we strive to create a world where every individual 
              has access to spiritual knowledge, community support, and the means to live with dignity.
            </p>
          </motion.div>
        </div>
      </section>

      <MissionVisionSection />

      {/* Goals */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Our Strategic Goals</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Expand Global Outreach", desc: "Establish presence in 100+ countries by 2030, connecting Shia communities worldwide." },
              { num: "02", title: "Empower Through Education", desc: "Provide 10,000+ scholarships and educational resources to underprivileged youth." },
              { num: "03", title: "Digital Community Building", desc: "Grow the Zahoor App to 1 million users, creating the largest digital Shia platform." },
              { num: "04", title: "Sustainable Welfare Programs", desc: "Build self-sustaining orphan care and elderly support facilities in 20+ regions." },
            ].map((goal, i) => (
              <motion.div
                key={goal.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 bg-card rounded-xl border border-border"
              >
                <span className="font-heading text-4xl font-bold text-primary/20">{goal.num}</span>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{goal.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{goal.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}