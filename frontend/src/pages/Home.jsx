/* Home page - wraps existing landing sections (unchanged) */
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import AppDownload from '../components/AppDownload';
import WaitlistSignup from '../components/WaitlistSignup';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <AppDownload />
      <WaitlistSignup />
    </>
  );
}
