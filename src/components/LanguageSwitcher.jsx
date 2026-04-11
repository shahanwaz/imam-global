import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { languages } from "../lib/translations";

export default function LanguageSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:block">{current.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-primary/5 ${
                l.code === lang ? "bg-primary/5 text-primary font-semibold" : "text-foreground"
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}