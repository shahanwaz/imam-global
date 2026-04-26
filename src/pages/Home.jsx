import { useOutletContext } from "react-router-dom";
import HeroSlideshow from "../components/home/HeroSlideshow";
import AboutSection from "../components/home/AboutSection";
import MissionVisionSection from "../components/home/MissionVisionSection";
import OurWorkSection from "../components/home/OurWorkSection";
import ProjectsSection from "../components/home/ProjectsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";
import IranSupportSection from "../components/home/IranSupportSection";

export default function Home() {
  const { t } = useOutletContext();
  return (
    <div>
      <HeroSlideshow t={t} />
      <AboutSection t={t} />
      <MissionVisionSection t={t} />
      <OurWorkSection t={t} />
      <ProjectsSection t={t} />
      <TestimonialsSection t={t} />
      <IranSupportSection t={t} />
      <CTASection t={t} />
    </div>
  );
}