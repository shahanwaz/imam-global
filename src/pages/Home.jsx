import HeroSlideshow from "../components/home/HeroSlideshow";
import AboutSection from "../components/home/AboutSection";
import MissionVisionSection from "../components/home/MissionVisionSection";
import OurWorkSection from "../components/home/OurWorkSection";
import ProjectsSection from "../components/home/ProjectsSection";
import ZahoorAppSection from "../components/home/ZahoorAppSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSlideshow />
      <AboutSection />
      <MissionVisionSection />
      <OurWorkSection />
      <ProjectsSection />
      <ZahoorAppSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}