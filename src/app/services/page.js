import HeroSection from "./components/HeroSection";
import OurServices from "./components/OurServices";
import OurWorking from "./components/OurWorking";
import OurBlogs from './components/OurBlogs';
import CTA from './components/CTA';
import Faq from './components/Faq';
export const metadata = {
  title: "Services - Web Design, Development & Digital Marketing Solutions",
  description:
    "Discover professional web design, web development, and digital marketing services that help businesses grow online. We create responsive websites, custom web apps, and result-driven digital strategies to boost visibility, engagement, and sales.",
};

export default function Services() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <HeroSection />
      <OurServices />
      <OurWorking />
      <OurBlogs />
      <CTA />
      <Faq /> 
    </main>
  );
}
