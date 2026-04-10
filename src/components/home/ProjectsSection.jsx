import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    image: "/__generating__/img_cfdcdd3e08b4.png",
    title: "Food Distribution",
    description: "Regular food drives serving thousands of families in need across multiple regions.",
    tag: "Welfare",
  },
  {
    image: "/__generating__/img_36118c2effc3.png",
    title: "Majalis & Events",
    description: "Organizing spiritual gatherings, lectures, and community events throughout the year.",
    tag: "Spiritual",
  },
  {
    image: "/__generating__/img_d9ab452531af.png",
    title: "Educational Help",
    description: "Scholarship programs and educational resources for students in underserved communities.",
    tag: "Education",
  },
  {
    image: "/__generating__/img_b542928ac06d.png",
    title: "Community Outreach",
    description: "Door-to-door welfare initiatives and community engagement programs for lasting impact.",
    tag: "Community",
  },
];

export default function ProjectsSection() {
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
            Making a Difference
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projects & Initiatives
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our ongoing projects are transforming lives and building stronger communities worldwide.
          </p>
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {project.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All Projects <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}