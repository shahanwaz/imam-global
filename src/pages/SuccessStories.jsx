import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import StoryCard from "../components/stories/StoryCard";
import { Search } from "lucide-react";

const CATEGORIES = ["all", "Article", "Interview", "Photo Gallery", "Impact Report"];

export default function SuccessStories() {
  const { t } = useOutletContext();
  const s = t.stories;

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: () => base44.entities.SuccessStory.filter({ published: true }, "-created_date", 50),
  });

  const filtered = stories.filter((story) => {
    const matchesSearch =
      !search ||
      story.title?.toLowerCase().includes(search.toLowerCase()) ||
      story.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || story.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered.filter((s) => s.featured);
  const all = filtered.filter((s) => !s.featured);

  const categoryLabel = (cat) => {
    const map = {
      all: s.categories?.all || "All",
      Article: s.categories?.article || "Article",
      Interview: s.categories?.interview || "Interview",
      "Photo Gallery": s.categories?.gallery || "Photo Gallery",
      "Impact Report": s.categories?.report || "Impact Report",
    };
    return map[cat] || cat;
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-primary/5 islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              {s.badge}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5">{s.heading}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{s.subtext}</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-background sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={s.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-primary"
                }`}
              >
                {categoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-secondary animate-pulse h-80" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">{s.noFound}</p>
            <p className="text-muted-foreground text-sm mt-2">{s.noFoundSubtext}</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <div className="mb-16">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-8">{s.featured}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featured.map((story, i) => (
                    <StoryCard key={story.id} story={story} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* All Stories */}
            {all.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-8">{s.allStories}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {all.map((story, i) => (
                    <StoryCard key={story.id} story={story} index={i} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}