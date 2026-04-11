import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function MissionVisionSection({ t }) {
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
            {t.mission.badge}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t.mission.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
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
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">{t.mission.missionTitle}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.mission.missionText}</p>
            <ul className="mt-6 space-y-3">
              {t.mission.missionPoints.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

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
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">{t.mission.visionTitle}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.mission.visionText}</p>
            <ul className="mt-6 space-y-3">
              {t.mission.visionPoints.map((item) => (
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