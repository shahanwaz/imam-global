import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "../lib/useLanguage";

export default function Layout() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} t={t} />
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet context={{ lang, setLang, t }} />
      </main>
      <Footer t={t} />
    </div>
  );
}