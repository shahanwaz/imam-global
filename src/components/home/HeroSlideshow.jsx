import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Download } from "lucide-react";

const slideImages = [
  "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/02615dcc9_generated_07d1a733.png",
  "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/eec486c82_generated_6aa1f1ec.png",
  "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/657c8cfe2_generated_a367532c.png",
  "https://media.base44.com/images/public/69d8d0da330a3411105d20d1/04b5609d8_ChatGPTImageApr11202602_59_44PM.png",
];

export default function HeroSlideshow({ t }) {
  const [current, setCurrent] = useState(0);

  const slides = [
    { title: t.hero.slide1.title, subtitle: t.hero.slide1.subtitle },
    { title: t.hero.slide2.title, subtitle: t.hero.slide2.subtitle },
    { title: t.hero.slide3.title, subtitle: t.hero.slide3.subtitle },
    { title: t.hero.slide4.title, subtitle: t.hero.slide4.subtitle },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => setCurrent(index);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slideImages[current]}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-4 py-1.5 bg-accent/90 text-accent-foreground rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                {t.hero.badge}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                {slides[current].title}
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
                {slides[current].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                >
                  <Heart className="w-5 h-5" />
                  {t.hero.donateNow}
                </Link>
                <a
                  href="https://zahoorinc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/25 transition-all border border-white/20"
                >
                  <Download className="w-5 h-5" />
                  {t.hero.downloadApp}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-accent" : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}