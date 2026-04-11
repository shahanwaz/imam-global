import { useState, useEffect } from "react";
import { translations } from "./translations";

const STORAGE_KEY = "imam_language";

async function detectLanguageByGeo() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const country = data.country_code;
    const middleEast = ["SA", "AE", "IQ", "IR", "KW", "BH", "QA", "OM", "YE", "JO", "LB", "SY", "EG", "MA", "DZ", "TN", "LY"];
    if (country === "IN") return "hi";
    if (middleEast.includes(country)) return "ar";
    if (country === "PK") return "ur";
    return "en";
  } catch {
    return "en";
  }
}

export function useLanguage() {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "en";
  });

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      detectLanguageByGeo().then((detected) => {
        setLangState(detected);
      });
    }
  }, []);

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