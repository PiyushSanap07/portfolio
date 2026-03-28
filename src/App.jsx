import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Activities from './components/Activities';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import TechMarquee from './components/TechMarquee';

gsap.registerPlugin(ScrollTrigger);

// Wrapper for scrolling to top or target section on route change
function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Determine the target section based on path
    let target = 0;
    if (location.pathname === '/about') target = '#about';
    else if (location.pathname === '/projects') target = '#projects';
    else if (location.pathname === '/experience') target = '#experience';
    else if (location.pathname === '/achievements') target = '#achievements';
    else if (location.pathname === '/contact') target = '#contact';

    // Scroll gracefully through Lenis
    if (window.lenis) {
      // Delay slightly to ensure layout is ready
      setTimeout(() => {
         window.lenis.scrollTo(target, { immediate: false, offset: -100 });
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
    
    // Refresh GSAP ScrollTrigger so markers align with new page height
    setTimeout(() => {
      if (window.lenis) {
        window.lenis.resize(); // Force Lenis to measure new DOM height!
      }
      ScrollTrigger.refresh();
    }, 100);
  }, [location.pathname]);

  return (
    <main className="flex flex-col gap-5 sm:gap-6 md:gap-12 lg:gap-20 overflow-hidden pt-14 sm:pt-16 md:pt-20 lg:pt-24 min-h-screen">
      {children}
    </main>
  );
}

// Unified single-page component that contains every section
function FullPage() {
  return (
    <>
      <section id="home"><Hero /></section>
      <TechMarquee />
      <section id="about"><About /></section>
      <section id="projects"><Projects /></section>
      <section id="experience"><Experience /><Skills /></section>
      <section id="achievements"><Achievements /><Activities /></section>
      <section id="contact"><Contact /><FAQ /></section>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    window.lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, [isLoading]);

  return (
    <Router>
      <div className="font-sans bg-bg text-black min-h-screen selection:bg-[#FFC83D] selection:text-black">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        
        {!isLoading && (
          <>
            <CustomCursor />
            <ScrollProgress />
            <Navbar />

            <Routes>
              <Route path="/" element={<Layout><FullPage /></Layout>} />
              <Route path="/about" element={<Layout><FullPage /></Layout>} />
              <Route path="/projects" element={<Layout><FullPage /></Layout>} />
              <Route path="/experience" element={<Layout><FullPage /></Layout>} />
              <Route path="/achievements" element={<Layout><FullPage /></Layout>} />
              <Route path="/contact" element={<Layout><FullPage /></Layout>} />
            </Routes>

            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}
