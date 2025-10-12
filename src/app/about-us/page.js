import HeroSection from './components/HeroSection';
import OurVision from './components/OurVision';
import OurPurpose from './components/OurPurpose';
import CTA from './components/CTA';
import OurToolbox from './components/OurToolbox';
import JoinTeam from './components/JoinTeam';
import Faq from './components/Faq';
export const metadata = {
  title: 'About Us - Our Story & Mission',
  description: 'Learn about our team, values, and mission to deliver exceptional digital experiences that drive real results for our clients.',
};

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <OurVision />
      <OurPurpose />
      <CTA />
      <OurToolbox />
      <JoinTeam />
      <Faq />
      {/* Add other sections here as needed */}
    </main>
  );
}
