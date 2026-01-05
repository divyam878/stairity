import HeroSection from "./components/HeroSection";
import OurCulture from "./components/OurCulture";
import OpenRoles from "./components/OpenRoles";
import CTA from "./components/CTA";
import Faq from "./components/Faq";
export const metadata = {
  title: "Careers - Join Our Team of Creative Developers & Designers",
  description:
    "Explore exciting career opportunities with our web design, development, and digital marketing team. Join a culture that values creativity, innovation, and growth while building impactful digital experiences for global clients.",
};

export default function Career() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <OurCulture />
      <OpenRoles />
      <CTA />
      <Faq />
    </main>
  );
}
