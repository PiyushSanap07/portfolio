import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { skills } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const colors = ['#FFC83D', '#4DA3FF', '#FF4D5A', '#F5F5F5'];

export default function Skills() {
  const sectionRef = useRef(null);
  const tagsRef = useRef([]);

  useGSAP(() => {
    const st = { toggleActions: 'play none none reverse' };
    const title = sectionRef.current?.querySelector('.section-title');
    if (title) gsap.from(title, { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', ...st } });
    tagsRef.current.forEach((tag, i) => {
      if (!tag) return;
      gsap.from(tag, { scale: 0, opacity: 0, rotation: i % 2 === 0 ? -10 : 10, duration: 0.35, ease: 'back.out(3)', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', ...st }, delay: i * 0.03 });
    });
    tagsRef.current.forEach((tag) => {
      if (!tag) return;
      gsap.to(tag, { y: -3 + Math.random() * 6 - 3, duration: 1.5 + Math.random() * 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 2 });
    });
  }, { scope: sectionRef });

  const handleHover = (i) => gsap.to(tagsRef.current[i], { rotate: 6, scale: 1.1, duration: 0.12, ease: 'power2.out', onComplete: () => gsap.to(tagsRef.current[i], { rotate: 0, scale: 1.05, duration: 0.15, ease: 'power2.out' }) });
  const handleLeave = (i) => gsap.to(tagsRef.current[i], { rotate: 0, scale: 1, duration: 0.25, ease: 'power2.out' });

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <h2 className="section-title">Skills & <span className="highlight-yellow">Technologies</span></h2>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-center max-w-3xl mx-auto">
        {skills.map((skill, i) => (
          <div key={skill} ref={(el) => (tagsRef.current[i] = el)} className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-3 font-bold text-[10px] sm:text-[11px] md:text-xs lg:text-sm thick-border rounded-md sm:rounded-lg md:rounded-2xl hard-shadow select-none" style={{ background: colors[i % colors.length] }} onMouseEnter={() => handleHover(i)} onMouseLeave={() => handleLeave(i)} data-hover>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
