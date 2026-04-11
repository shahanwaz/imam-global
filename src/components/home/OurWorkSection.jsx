import { motion } from "framer-motion";
import { Baby, HeartHandshake, BookOpenCheck, HandHelping, GraduationCap, Smartphone } from "lucide-react";

export default function OurWorkSection({ t }) {
  const services = [
    { icon: Baby, title: t.ourWork.orphan.title, description: t.ourWork.orphan.desc, color: "bg-primary/10 text-primary" },
    { icon: HeartHandshake, title: t.ourWork.oldAge.title, description: t.ourWork.oldAge.desc, color: "bg-accent/10 text-accent" },
    { icon: BookOpenCheck, title: t.ourWork.religious.title, description: t.ourWork.religious.desc, color: "bg-primary/10 text-primary" },
    { icon: HandHelping, title: t.ourWork.community.title, description: t.ourWork.community.desc, color: "bg-accent/10 text-accent" },
    { icon: GraduationCap, title: t.ourWork.education.title, description: t.ourWork.education.desc, color: "bg-primary/10 text-primary" },
    { icon: Smartphone, title: t.ourWork.digital.title, description: t.ourWork.digital.desc, color: "bg-accent/10 text-accent" },
  ];

  return (
    <section id="our-work" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            {t.ourWork.badge}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.ourWork.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.ourWork.subtext}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card rounded-xl p-7 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}