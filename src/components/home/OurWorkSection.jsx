import { motion } from "framer-motion";
import { Baby, HeartHandshake, BookOpenCheck, HandHelping, GraduationCap, Smartphone } from "lucide-react";

const services = [
  {
    icon: Baby,
    title: "Orphan Support",
    description: "Providing shelter, education, and nurturing care for orphaned children around the world.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HeartHandshake,
    title: "Old Age Care",
    description: "Ensuring our elders live with dignity through comprehensive care and companionship programs.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: BookOpenCheck,
    title: "Religious Awareness",
    description: "Conducting programs and events to deepen understanding of Islamic teachings and Imam Mahdi (A.S.).",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HandHelping,
    title: "Community Services",
    description: "Organizing food distribution, medical camps, and welfare drives for underserved communities.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: GraduationCap,
    title: "Educational Support",
    description: "Scholarships, tutoring, and skill development programs for youth and aspiring learners.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Smartphone,
    title: "Digital Platform",
    description: "The Zahoor App — connecting the community with Majalis, Islamic resources, and services.",
    color: "bg-accent/10 text-accent",
  },
];

export default function OurWorkSection() {
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
            What We Do
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Work & Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Through faith and dedication, we serve communities across the globe with programs that uplift, educate, and inspire.
          </p>
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