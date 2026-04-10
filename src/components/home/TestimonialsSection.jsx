import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "Community Member",
    text: "IMAM has transformed our community. The orphan support program gave my nephew a second chance at education and a brighter future.",
    rating: 5,
  },
  {
    name: "Fatima Zahra",
    role: "Volunteer",
    text: "Working with IMAM has been the most fulfilling experience. The dedication to serving humanity in the light of Imam (A.S.) is truly inspiring.",
    rating: 5,
  },
  {
    name: "Ali Raza",
    role: "Zahoor App User",
    text: "The Zahoor App is incredible. I can access Majalis, ask questions to scholars, and stay connected with the community from anywhere in the world.",
    rating: 5,
  },
];

const stats = [
  { number: "50+", label: "Countries Reached" },
  { number: "10,000+", label: "Families Supported" },
  { number: "500+", label: "Volunteers" },
  { number: "100+", label: "Programs Running" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-primary/5 rounded-2xl"
            >
              <p className="font-heading text-3xl md:text-4xl font-bold text-primary mb-1">{stat.number}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Community Voices
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What People Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border relative"
            >
              <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 relative z-10">"{t.text}"</p>
              <div>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}