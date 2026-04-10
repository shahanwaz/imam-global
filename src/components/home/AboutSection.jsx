import { motion } from "framer-motion";
import { Globe, Users, Heart, BookOpen } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Vision",
    description: "Reaching communities worldwide to spread awareness and provide support across borders.",
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Empowering local communities through education, welfare, and spiritual guidance programs.",
  },
  {
    icon: Heart,
    title: "Humanitarian Aid",
    description: "Providing essential support to orphans, elderly, and underprivileged families with dignity.",
  },
  {
    icon: BookOpen,
    title: "Knowledge & Awareness",
    description: "Spreading the message of Imam Mahdi (A.S.) through education and digital platforms.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              About Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Who We Are
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              <strong className="text-foreground">IMAM</strong> (Imam Mahdi Awareness Mission) is a global non-profit organization 
              dedicated to spreading the awareness of Imam Mahdi (A.S.), supporting the underprivileged, 
              and building a connected, compassionate Shia community worldwide.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Founded on the principles of faith, service, and unity, we work tirelessly to uplift communities 
              through welfare programs, educational initiatives, and spiritual guidance. Our digital platform, 
              the <strong className="text-primary">Zahoor App</strong>, connects millions with Islamic resources, 
              scholarly knowledge, and community services.
            </p>
            <div className="inline-block px-6 py-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-accent-foreground font-heading italic text-lg">
                "Serving Humanity in the Light of Imam (A.S.)"
              </p>
            </div>
          </motion.div>

          {/* Right Grid */}
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