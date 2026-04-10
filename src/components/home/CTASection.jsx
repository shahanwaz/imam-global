import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/50 islamic-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Be Part of the Change
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Your support makes a difference. Whether through donations, volunteering, or spreading the word — 
            together, we can build a compassionate world guided by the light of Imam (A.S.).
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-xl font-bold text-lg hover:bg-primary/5 transition-all"
            >
              Get Involved <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}