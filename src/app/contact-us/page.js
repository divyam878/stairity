import ContactHero from './components/ContactHero';
import SocialBar from './components/SocialBar';
import ContactForm from './components/ContactForm';
import ScheduleCall from './components/ScheduleCall';

export const metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Have a project in mind? Contact us for a free consultation. We help businesses build high-performing websites and digital experiences.',
};

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] relative">
      <div className="relative z-10">
        <ContactHero />
        <SocialBar />
        <ContactForm />
        <ScheduleCall />
      </div>
    </main>
  );
}
