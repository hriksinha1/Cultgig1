/* App.jsx - Main CultGig landing page, composes all sections */
import '@/App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AppDownload from './components/AppDownload';
import WaitlistSignup from './components/WaitlistSignup';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AppDownload />
      <WaitlistSignup />
      <Footer />
    </div>
  );
}

export default App;
