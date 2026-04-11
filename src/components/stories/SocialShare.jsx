import { useState } from "react";
import { Share2, Link2, Check, Twitter, Facebook, MessageCircle } from "lucide-react";

export default function SocialShare({ title, url }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Twitter / X",
      icon: Twitter,
      color: "bg-black hover:bg-gray-800",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
        <Share2 className="w-4 h-4" />
        Share:
      </div>
      {shareLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          title={s.label}
          className={`w-9 h-9 rounded-full ${s.color} flex items-center justify-center text-white transition-transform hover:scale-110`}
        >
          <s.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        title="Copy link"
        className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 ${copied ? "bg-primary" : "bg-muted-foreground hover:bg-foreground"}`}
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
      {copied && <span className="text-xs text-primary font-medium">Link copied!</span>}
    </div>
  );
}