import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import AboutSection from "../components/home/AboutSection";
import MissionVisionSection from "../components/home/MissionVisionSection";

export default function About() {
  const { t } = useOutletContext();

  return (
    <div>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-primary/5 islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              {t.about.badge}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5">
              {t.about.heading}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t.about.p1}
            </p>
          </motion.div>
        </div>
      </section>

      <AboutSection t={t} />
      <MissionVisionSection t={t} />
    </div>
  );
}