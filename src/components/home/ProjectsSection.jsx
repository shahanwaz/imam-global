import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProjectsSection({ t }) {
  const projects = [
    {
      image: "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/972b0f496_generated_22536eea.png",
      title: t.projects.food.title,
      description: t.projects.food.desc,
      tag: "Welfare",
    },
    {
      image: "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/4f18ad0c6_generated_c2191887.png",
      title: t.projects.majalis.title,
      description: t.projects.majalis.desc,
      tag: "Spiritual",
    },
    {
      image: "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/56b46b3c1_generated_c0392487.png",
      title: t.projects.educational.title,
      description: t.projects.educational.desc,
      tag: "Education",
    },
    {
      image: "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/7ec2390dd_generated_e809d24c.png",
      title: t.projects.outreach.title,
      description: t.projects.outreach.desc,
      tag: "Community",
    },
  ];

  return (
    <section id="projects" className="py-20 lg:py-28 bg-secondary/50 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            {t.projects.badge}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.projects.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.projects.subtext}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">{project.tag}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <Link to="/projects" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            {t.projects.viewAll} <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}