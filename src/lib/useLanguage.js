import { useState, useEffect } from "react";
import { translations } from "./translations";

const STORAGE_KEY = "imam_language";

export function useLanguage() {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "en";
  });

  useEffect(() => {
    const dir = translations[lang]?.dir || "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (code) => {
    localStorage.setItem(STORAGE_KEY, code);
    setLangState(code);
  };

  const t = translations[lang] || translations["en"];

  return { lang, setLang, t };
}