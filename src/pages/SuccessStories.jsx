import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import StoryCard from "../components/stories/StoryCard";
import { Search, BookOpen } from "lucide-react";

const CATEGORIES = ["All", "Article", "Interview", "Photo Gallery", "Impact Report"];

export default function SuccessStories() {
  const { t } = useOutletContext();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: () => base44.entities.SuccessStory.filter({ published: true }, "-created_date", 50),
  });

  const filtered = stories.filter((s) => {
    const matchesCategory = activeCategory === "All" || s.category === activeCategory;
    const matchesSearch =
      !search ||
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      s.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      s.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = filtered.filter((s) => s.featured);
  const rest = filtered.filter((s) => !s.featured);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary/5 islamic-pattern py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Stories of Hope
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Success Stories
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Real stories of real people whose lives have been transformed through faith, service, and the compassion of our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-secondary rounded-full border border-border text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-secondary rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-muted-foreground mb-2">No stories found</h3>
              <p className="text-muted-foreground text-sm">Try a different search or category.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured.length > 0 && (
                <div className="mb-14">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="text-accent">⭐</span> Featured Stories
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {featured.map((story, i) => (
                      <StoryCard key={story.id} story={story} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Stories */}
              {rest.length > 0 && (
                <div>
                  {featured.length > 0 && (
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-6">All Stories</h2>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((story, i) => (
                      <StoryCard key={story.id} story={story} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}