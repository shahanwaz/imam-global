import { useOutletContext } from "react-router-dom";
import OurWorkSection from "../components/home/OurWorkSection";
import { motion } from "framer-motion";

export default function OurWork() {
  const { t } = useOutletContext();
  return (
    <div>
      <section className="bg-primary/5 islamic-pattern py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              {t.ourWork.badge}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{t.ourWork.heading}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.ourWork.subtext}</p>
          </motion.div>
        </div>
      </section>
      <OurWorkSection t={t} />
    </div>
  );
}