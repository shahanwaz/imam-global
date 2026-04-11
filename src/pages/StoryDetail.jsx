import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import SocialShare from "../components/stories/SocialShare";
import StoryCard from "../components/stories/StoryCard";
import { ArrowLeft, Clock, User, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";

export default function StoryDetail() {
  const { id } = useParams();
  const [galleryIndex, setGalleryIndex] = useState(0);

  const { data: story, isLoading } = useQuery({
    queryKey: ["success-story", id],
    queryFn: async () => {
      const results = await base44.entities.SuccessStory.filter({ id });
      return results[0] || null;
    },
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related-stories", story?.category],
    enabled: !!story,
    queryFn: () =>
      base44.entities.SuccessStory.filter({ published: true, category: story.category }, "-created_date", 4),
  });

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 space-y-4">
        <div className="h-10 bg-secondary rounded animate-pulse w-2/3" />
        <div className="h-72 bg-secondary rounded-2xl animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-4 bg-secondary rounded animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-3">Story not found</h2>
        <Link to="/stories" className="text-primary font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Stories
        </Link>
      </div>
    );
  }

  const galleryImages = story.gallery_images || [];

  return (
    <div>
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <Link to="/stories" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Success Stories
        </Link>
      </div>

      {/* Cover */}
      {story.cover_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden h-72 md:h-96 shadow-lg">
            <img src={story.cover_image} alt={story.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {/* Meta */}
          <div className="flex flex-wrap gap-3 items-center mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">{story.category}</span>
            {story.featured && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">⭐ Featured</span>}
            {story.read_time && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {story.read_time} min read
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {new Date(story.created_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">{story.title}</h1>
          <p className="text-muted-foreground text-xl leading-relaxed mb-8 border-l-4 border-primary pl-5 italic">{story.excerpt}</p>

          {/* Author */}
          {story.author_name && (
            <div className="flex items-center gap-3 mb-10 pb-8 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{story.author_name}</p>
                {story.author_role && <p className="text-muted-foreground text-sm">{story.author_role}</p>}
              </div>
            </div>
          )}

          {/* Content */}
          {story.content && (
            <div className="prose prose-lg max-w-none mb-12 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>h2]:font-heading [&>h2]:text-foreground [&>h3]:font-heading [&>h3]:text-foreground [&>strong]:text-foreground [&>a]:text-primary">
              <ReactMarkdown>{story.content}</ReactMarkdown>
            </div>
          )}

          {/* Photo Gallery */}
          {galleryImages.length > 0 && (
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Photo Gallery</h2>
              <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
                <img src={galleryImages[galleryIndex]} alt={`Gallery ${galleryIndex + 1}`} className="w-full h-72 md:h-96 object-cover" />
                <button
                  onClick={() => setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setGalleryIndex((i) => (i + 1) % galleryImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                  {galleryIndex + 1} / {galleryImages.length}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {galleryImages.map((img, i) => (
                  <button key={i} onClick={() => setGalleryIndex(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === galleryIndex ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {story.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {story.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full border border-border">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* Social Share */}
          <div className="py-8 border-t border-b border-border mb-14">
            <p className="font-semibold text-foreground mb-4">Found this story inspiring? Share it!</p>
            <SocialShare title={story.title} url={pageUrl} />
          </div>
        </motion.div>
      </article>

      {/* Related */}
      {related.filter((r) => r.id !== story.id).length > 0 && (
        <section className="py-16 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">More {story.category}s</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related
                .filter((r) => r.id !== story.id)
                .slice(0, 3)
                .map((r, i) => <StoryCard key={r.id} story={r} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}