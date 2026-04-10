import { motion } from "framer-motion";
import { Globe, Users, Heart, BookOpen, Target, Shield } from "lucide-react";

const values = [
  { icon: Heart, title: "Compassion", text: "We serve with love and empathy, treating every individual with dignity and respect." },
  { icon: Shield, title: "Integrity", text: "Transparency and honesty guide every action we take and every program we run." },
  { icon: Users, title: "Unity", text: "We bring together diverse communities under the shared values of faith and service." },
  { icon: Globe, title: "Global Reach", text: "Our mission transcends borders, connecting Shia communities worldwide." },
  { icon: BookOpen, title: "Knowledge", text: "We believe education and awareness are the foundations of positive change." },
  { icon: Target, title: "Impact", text: "Every initiative is designed to create lasting, measurable change in people's lives." },
];

export default function About() {
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
              About IMAM
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              About Us
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The Imam Mahdi Awareness Mission (IMAM) is a global non-profit organization committed to 
              spreading spiritual awareness, supporting the underprivileged, and fostering a connected Shia community worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Founded with a vision to unite the global Shia community, IMAM started as a small group of 
                dedicated individuals who believed in the transformative power of faith and service. Today, 
                we have grown into a worldwide organization reaching over 50 countries.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our work spans orphan care, elderly support, educational scholarships, community outreach, 
                and the development of the Zahoor App — a digital platform connecting the Shia community 
                with spiritual resources, scholars, and essential services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every program we run is guided by our commitment to serve humanity in the light of Imam (A.S.), 
                creating positive change that resonates across generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These principles guide everything we do at IMAM.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-7 shadow-sm border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}