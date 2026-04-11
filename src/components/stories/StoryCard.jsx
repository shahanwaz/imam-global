import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, User, Tag, ArrowRight, Images } from "lucide-react";

const categoryColors = {
  "Article": "bg-primary/10 text-primary",
  "Interview": "bg-accent/10 text-accent-foreground",
  "Photo Gallery": "bg-purple-100 text-purple-700",
  "Impact Report": "bg-blue-100 text-blue-700",
};

export default function StoryCard({ story, index = 0 }) {
  const fallbackImage = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={story.cover_image || fallbackImage}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[story.category] || "bg-primary/10 text-primary"}`}>
            {story.category}
          </span>
          {story.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">⭐ Featured</span>
          )}
        </div>
        {story.category === "Photo Gallery" && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            <Images className="w-3 h-3" />
            {story.gallery_images?.length || 0} photos
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          {story.author_name && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> {story.author_name}
            </span>
          )}
          {story.read_time && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {story.read_time} min read
            </span>
          )}
        </div>

        <h3 className="font-heading font-bold text-lg text-foreground mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {story.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{story.excerpt}</p>

        {story.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {story.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded-full">
                <Tag className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/stories/${story.id}`}
          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all mt-auto"
        >
          Read Story <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}