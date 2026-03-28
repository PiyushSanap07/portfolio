import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const btnsRef = useRef([]);

  useGSAP(() => {
    const st = { toggleActions: 'play none none reverse' };
    const title = sectionRef.current?.querySelector('.section-title');
    if (title) gsap.from(title, { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', ...st } });
    gsap.from(imgRef.current, { scale: 0.3, opacity: 0, rotation: -15, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', ...st } });
    const lines = textRef.current?.querySelectorAll('.about-line');
    if (lines) gsap.from(lines, { scale: 0.85, opacity: 0, x: 40, duration: 0.4, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: textRef.current, start: 'top 75%', ...st } });
    btnsRef.current.forEach((btn, i) => {
      if (!btn) return;
      gsap.from(btn, { scale: 0.5, opacity: 0, y: 20, duration: 0.4, ease: 'back.out(3)', scrollTrigger: { trigger: textRef.current, start: 'top 70%', ...st }, delay: i * 0.1 });
    });
  }, { scope: sectionRef });

  const handleImgHover = () => gsap.to(imgRef.current, { rotate: 3, scale: 1.05, duration: 0.3, ease: 'power2.out' });
  const handleImgLeave = () => gsap.to(imgRef.current, { rotate: 0, scale: 1, duration: 0.3, ease: 'power2.out' });

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <h2 className="section-title">My <span className="highlight-yellow">story</span> as a developer</h2>
      <div className="flex flex-col items-center lg:grid lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr] gap-6 sm:gap-8 lg:gap-12">
        <div className="flex justify-center">
          <div ref={imgRef} onMouseEnter={handleImgHover} onMouseLeave={handleImgLeave} className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-64 xl:h-64 rounded-full thick-border-4 hard-shadow overflow-hidden bg-yellow flex items-center justify-center" data-hover>
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="98" fill="#FFC83D" /><circle cx="100" cy="85" r="45" fill="#F5D6B8" stroke="#000" strokeWidth="3" /><path d="M55 78 Q55 35 100 35 Q145 35 145 78 Q130 55 100 58 Q70 55 55 78Z" fill="#1A1A1A" stroke="#000" strokeWidth="2" /><ellipse cx="82" cy="82" rx="5" ry="6" fill="#000" /><ellipse cx="118" cy="82" rx="5" ry="6" fill="#000" /><path d="M85 100 Q100 115 115 100" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" /><path d="M70 95 Q75 125 100 132 Q125 125 130 95" fill="#1A1A1A" stroke="#000" strokeWidth="2" /><ellipse cx="100" cy="175" rx="55" ry="40" fill="#FF4D5A" stroke="#000" strokeWidth="3" /><circle cx="85" cy="168" r="4" fill="#FFC83D" /><circle cx="100" cy="162" r="4" fill="#FFC83D" /><circle cx="115" cy="168" r="4" fill="#FFC83D" />
            </svg>
          </div>
        </div>
        <div ref={textRef}>
          <div className="space-y-2.5 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
            <p className="about-line">I'm a <strong>full-stack developer</strong> with a deep passion for <strong>Artificial Intelligence</strong> and building things that matter.</p>
            <p className="about-line">I specialize in creating <span className="highlight-blue">scalable web applications</span> using modern technologies like React, Node.js, and various AI/ML tools.</p>
            <p className="about-line">From frontend to backend, databases to deployment — I love working across the entire stack to deliver polished, production-ready products.</p>
            <p className="about-line">When I'm not coding, you'll find me exploring new AI breakthroughs, participating in hackathons, or leading tech communities.</p>
          </div>
          <div className="mt-5 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
            <a ref={(el) => (btnsRef.current[0] = el)} href="#contact" className="brutal-btn brutal-btn-primary text-center justify-center" data-hover>
              <svg width="16" height="16" className="md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>
              Get in touch
            </a>
            <a ref={(el) => (btnsRef.current[1] = el)} href="#projects" className="brutal-btn brutal-btn-secondary text-center justify-center" data-hover>
              <svg width="16" height="16" className="md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              My story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
