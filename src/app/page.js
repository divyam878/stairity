import HeroSection from "./home/HeroSection";
import KeepCalm from "./home/KeepCalm";
import OurServices from "./home/OurServices";
import OurWork from "./home/OurWork";
import OurExpertise from "./home/OurExpertise";
import DesignExperience from "./home/DesignExperience";
import WhyUs from "./home/WhyUs";
import Clients from "./home/Clients";
import Calender from "./home/Calender";
import Industries from "./home/Industries";
import Faq from "./home/Faq";
export default function Home() {
  return (
    <main className="flex flex-col items-center w-full justify-center min-h-screen bg-white overflow-hidden">
      <HeroSection />
      <KeepCalm />
      <OurServices />
      <OurWork />
      <OurExpertise />
      <DesignExperience />
      <WhyUs />
      <Clients />
      <Industries />
      <Calender />
      <Faq />
    </main>
  );
}
