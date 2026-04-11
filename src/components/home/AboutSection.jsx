import { motion } from "framer-motion";
import { Globe, Users, Heart, BookOpen } from "lucide-react";

export default function AboutSection({ t }) {
  const features = [
    { icon: Globe, title: t.about.features.global.title, description: t.about.features.global.desc },
    { icon: Users, title: t.about.features.community.title, description: t.about.features.community.desc },
    { icon: Heart, title: t.about.features.humanitarian.title, description: t.about.features.humanitarian.desc },
    { icon: BookOpen, title: t.about.features.knowledge.title, description: t.about.features.knowledge.desc },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              {t.about.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t.about.heading}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t.about.p1}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.about.p2}</p>
            <div className="inline-block px-6 py-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-accent-foreground font-heading italic text-lg">{t.about.quote}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}