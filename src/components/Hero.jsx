import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MatrixRain from './MatrixRain';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const photoRef = useRef(null);
  const buzzwordsRef = useRef([]);
  const [flipped, setFlipped] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    const chars = headlineRef.current?.querySelectorAll('.char');
    if (chars) tl.from(chars, { y: 60, scale: 0.3, opacity: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(2)' });
    tl.from('.hello-badge', { scale: 0, rotation: -10, duration: 0.4, ease: 'back.out(3)' }, '-=0.4');
    tl.from('.hero-desc', { y: 20, scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    tl.from('.stat-pill', { scale: 0, opacity: 0, duration: 0.3, stagger: 0.06, ease: 'back.out(3)' }, '-=0.2');
    tl.from('.hero-btn', { x: -30, scale: 0.8, opacity: 0, duration: 0.35, stagger: 0.07, ease: 'back.out(2)' }, '-=0.2');
    tl.from(photoRef.current, { x: 60, scale: 0.7, opacity: 0, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.4');
    tl.from(buzzwordsRef.current, { scale: 0, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'back.out(3)' }, '-=0.2');
  }, { scope: sectionRef });

  const handleCharTap = useCallback((e) => {
    const el = e.currentTarget;
    gsap.fromTo(el,
      { scale: 1, color: '', y: 0 },
      { scale: 1.35, y: -18, color: '#FF4D5A', duration: 0.15, ease: 'power2.out', onComplete: () => gsap.to(el, { scale: 1, y: 0, color: '', duration: 0.35, ease: 'bounce.out' }) }
    );
  }, []);

  const handleBuzzTap = useCallback((i) => {
    const el = buzzwordsRef.current[i];
    if (!el) return;
    gsap.fromTo(el,
      { scale: 1 },
      { scale: 1.25, duration: 0.12, ease: 'power2.out', onComplete: () => gsap.to(el, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' }) }
    );
  }, []);

  const handleStatTap = useCallback((e) => {
    gsap.fromTo(e.currentTarget,
      { scale: 1 },
      { scale: 1.18, duration: 0.1, ease: 'power2.out', onComplete: () => gsap.to(e.currentTarget, { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.4)' }) }
    );
  }, []);

  const buzzwords = [
    { text: 'Cloud', color: 'bg-[#FF4D5A] text-white', info: 'AWS • GCP • Vercel' },
    { text: 'AI/ML', color: 'bg-black text-white', info: 'TensorFlow • NLP' },
    { text: 'Docker', color: 'bg-[#FFC83D] text-black', info: 'Containers • CI/CD' },
    { text: 'TypeScript', color: 'bg-[#4DA3FF] text-white', info: 'Type-safe JS' },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#F5F5F5]">
      <MatrixRain />

      {/* Buzzwords - absolute on desktop only */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden hidden lg:block">
        {buzzwords.map((bw, i) => (
          <div
            key={i}
            ref={(el) => (buzzwordsRef.current[i] = el)}
            className={`absolute ${bw.color} px-3 py-1.5 border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] font-bold text-xs uppercase tracking-wider pointer-events-auto cursor-pointer select-none`}
            style={{
              top: i < 2 ? `${15 + i * 12}%` : 'auto',
              bottom: i >= 2 ? `${25 + (i - 2) * 12}%` : 'auto',
              left: i % 2 === 0 ? '2%' : 'auto',
              right: i % 2 === 1 ? '8%' : 'auto',
              transform: `rotate(${i % 2 === 0 ? -4 : 3}deg)`,
            }}
            onClick={() => handleBuzzTap(i)}
            data-hover
          >
            <span className="relative">
              {bw.text}
              <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[9px] text-black font-bold px-2 py-0.5 rounded border border-black">
                {bw.info}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="px-5 sm:px-8 md:px-12 max-w-7xl mx-auto w-full relative z-10 pt-6 pb-4 sm:py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 sm:gap-10 lg:gap-16 max-w-6xl mx-auto">

          {/* Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl order-2 lg:order-1">

            <div className="hello-badge inline-block bg-[#FF4D5A] text-white px-4 py-1.5 sm:px-5 sm:py-2 border-[3px] border-black shadow-[4px_4px_0px_#000] font-black text-sm sm:text-base md:text-lg -rotate-2 mb-4 uppercase tracking-wide">
              HELLO, I AM
            </div>

            <h1 ref={headlineRef} className="font-black uppercase tracking-tighter leading-[0.9] mb-1 md:mb-2" style={{ fontSize: 'clamp(3rem, 14vw, 8rem)' }}>
              <div className="overflow-hidden pb-1 md:pb-2">
                {'PIYUSH'.split('').map((char, i) => (
                  <span key={i} className="char inline-block cursor-pointer" onClick={handleCharTap}>{char}</span>
                ))}
              </div>
              <div className="overflow-hidden pb-1 md:pb-2 mt-1">
                {'SANAP'.split('').map((char, i) => (
                  <span key={i} className="char inline-block text-transparent cursor-pointer" style={{ WebkitTextStroke: '2.5px black' }} onClick={handleCharTap}>{char}</span>
                ))}
              </div>
            </h1>

            <p className="hero-desc text-sm sm:text-base md:text-lg text-gray-800 font-medium mb-0.5 sm:mb-1.5 leading-relaxed max-w-md">
              An engineer obsessed with building <strong className="text-black bg-[#FFC83D] px-2 py-0.5">bold</strong>, scalable, and high-performance digital experiences.
            </p>

            {/* Stat Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-1.5 sm:mb-3 justify-center lg:justify-start">
              {[
                { num: '10+', label: 'Projects', color: 'bg-[#4DA3FF] text-white' },
                { num: '5+', label: 'Awards', color: 'bg-[#FF4D5A] text-white' },
                { num: '3+', label: 'Orgs', color: 'bg-[#FFC83D] text-black' },
              ].map((stat, i) => (
                <div key={i} className={`stat-pill ${stat.color} px-4 py-1.5 border-[3px] border-black rounded-full font-black text-xs sm:text-sm shadow-[3px_3px_0px_#000] cursor-pointer select-none`} onClick={handleStatTap} data-hover>
                  {stat.num} {stat.label}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full sm:w-auto mb-2 sm:mb-4 lg:mb-0">
              <a onClick={() => window.lenis?.scrollTo('#projects')} className="hero-btn cursor-pointer text-center px-6 py-3 sm:px-8 sm:py-4 bg-black text-white font-black text-sm sm:text-base md:text-lg uppercase tracking-wider rounded-xl border-4 border-black shadow-[6px_6px_0px_#FFC83D] sm:shadow-[8px_8px_0px_#FFC83D] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#4DA3FF] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#4DA3FF] transition-all" data-hover>View Work</a>
              <a onClick={() => window.lenis?.scrollTo('#contact')} className="hero-btn cursor-pointer text-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-black text-sm sm:text-base md:text-lg uppercase tracking-wider rounded-xl border-4 border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#FF4D5A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_#FF4D5A] transition-all" data-hover>Contact</a>
            </div>

            {/* Mobile buzzwords - below buttons, extends content down to fill gap */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:hidden mt-0 sm:mt-1">
              {buzzwords.map((bw, i) => (
                <div key={i} ref={(el) => (buzzwordsRef.current[i] = el)} className={`${bw.color} px-3 py-1 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] font-bold text-[11px] uppercase tracking-wider cursor-pointer select-none`} onClick={() => handleBuzzTap(i)} data-hover>
                  {bw.text}
                </div>
              ))}
              {/* Extra tech tags on mobile to fill space */}
              <div className="bg-[#F5F5F5] text-black px-3 py-1 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] font-bold text-[11px] uppercase tracking-wider cursor-pointer select-none" data-hover>REST APIs</div>
              <div className="bg-white text-black px-3 py-1 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] font-bold text-[11px] uppercase tracking-wider cursor-pointer select-none" data-hover>Git</div>
              <div className="bg-[#4DA3FF] text-white px-3 py-1 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] font-bold text-[11px] uppercase tracking-wider cursor-pointer select-none" data-hover>MongoDB</div>
            </div>
          </div>

          {/* Photo with CSS flip */}
          <div ref={photoRef} className="flex-shrink-0 order-1 lg:order-2 cursor-pointer" data-hover onClick={() => setFlipped(p => !p)}>
            <div className="w-44 sm:w-56 md:w-72 lg:w-80 aspect-[3/4] relative" style={{ perspective: '800px' }}>
              <div className="w-full h-full relative transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                {/* Front */}
                <div className="absolute inset-0 bg-white p-2.5 sm:p-3 border-4 border-black rounded-2xl sm:rounded-3xl shadow-[8px_8px_0px_#FFC83D] sm:shadow-[12px_12px_0px_#FFC83D] rotate-[2deg] sm:rotate-[3deg] flex flex-col items-center group" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="w-full h-full bg-black border-2 border-black rounded-xl sm:rounded-2xl overflow-hidden relative">
                    <img src="https://res.cloudinary.com/dl8nhul9t/image/upload/v1774710240/profile_vwiqgi.jpg" alt="Piyush" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500 ease-out" onError={(e) => { e.target.onerror = null; e.target.src = '/profile.jpg'; }} />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-max">
                       <span className="bg-white text-black px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-full border-2 border-black shadow-[2px_2px_0px_#FF4D5A] animate-pulse">
                         Tap to flip
                       </span>
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-black p-3 sm:p-5 border-4 border-black rounded-2xl sm:rounded-3xl shadow-[8px_8px_0px_#FFC83D] sm:shadow-[12px_12px_0px_#FFC83D] flex flex-col justify-center text-white rotate-[2deg] sm:rotate-[3deg]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <div className="flex flex-col h-full justify-between w-full">
                    <div className="text-center mt-2 sm:mt-1">
                      <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#FFC83D] uppercase leading-none">Quick Stats</div>
                    </div>
                    <div className="w-full space-y-2 sm:space-y-3 px-1 sm:px-2 flex-grow flex flex-col justify-center">
                      {[
                        { label: 'Experience', value: '1+ Yr', color: '#4DA3FF' },
                        { label: 'Projects', value: '10+', color: '#FF4D5A' },
                        { label: 'Hackathons', value: '10+', color: '#FFC83D' },
                        { label: 'Stack', value: 'Full-Stack + AI', color: '#4DA3FF' },
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-white/30 pb-1.5">
                          <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 uppercase font-bold tracking-wide">{s.label}</span>
                          <span className="text-[10px] sm:text-xs md:text-sm font-black whitespace-nowrap pl-2" style={{ color: s.color }}>{s.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mb-1 sm:mb-0">
                      <div className="text-[10px] sm:text-xs text-gray-500 font-medium animate-pulse">Tap to flip back</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
