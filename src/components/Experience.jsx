import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { experience } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);

  useGSAP(() => {
    const st = { toggleActions: 'play none none reverse' };
    const title = sectionRef.current?.querySelector('.section-title');
    if (title) gsap.from(title, { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', ...st } });
    if (lineRef.current) gsap.from(lineRef.current, { scaleY: 0, transformOrigin: 'top', duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', ...st } });
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, { scale: 0.6, y: 30, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: card, start: 'top 88%', ...st } });
    });
    dotsRef.current.forEach((dot) => {
      if (!dot) return;
      gsap.from(dot, { scale: 0, duration: 0.3, ease: 'back.out(4)', scrollTrigger: { trigger: dot, start: 'top 88%', ...st } });
    });
  }, { scope: sectionRef });

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <h2 className="section-title">Work <span className="highlight-blue">Experience</span></h2>
      <div className="relative max-w-xl mx-auto">
        {/* Timeline line - centered on all screens */}
        <div ref={lineRef} className="absolute left-3 sm:left-4 md:left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-black rounded-full" />
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {experience.map((exp, i) => (
            <div key={i} ref={(el) => (cardsRef.current[i] = el)} className="relative pl-8 sm:pl-10 md:pl-12">
              {/* Timeline dot */}
              <div ref={(el) => (dotsRef.current[i] = el)} className="absolute left-1.5 sm:left-2 md:left-2 w-4 h-4 sm:w-5 sm:h-5 bg-blue thick-border rounded-full z-10">
                <div className="absolute inset-0 bg-blue rounded-full animate-ping opacity-30" />
              </div>
              {/* Card */}
              <div className="brutal-card p-3 sm:p-4 md:p-6 w-full">
                <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold bg-blue text-white thick-border rounded-full mb-2 sm:mb-3">{exp.period}</span>
                <h3 className="text-sm sm:text-base md:text-lg font-extrabold mb-0.5 sm:mb-1">{exp.role}</h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">{exp.company}</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {exp.description.map((desc, j) => (<li key={j} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm"><span className="w-1.5 h-1.5 bg-black rounded-full mt-1 sm:mt-1.5 shrink-0" />{desc}</li>))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
