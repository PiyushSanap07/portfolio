import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Achievements() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const badgesRef = useRef([]);

  useGSAP(() => {
    const st = { toggleActions: 'play none none reverse' };
    const title = sectionRef.current?.querySelector('.section-title');
    if (title) gsap.from(title, { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', ...st } });
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, { scale: 0.4, y: 30, opacity: 0, rotation: i % 2 === 0 ? -8 : 8, duration: 0.55, ease: 'back.out(2)', scrollTrigger: { trigger: card, start: 'top 92%', ...st } });
    });
    badgesRef.current.forEach((badge, i) => {
      if (!badge) return;
      gsap.from(badge, { scale: 0, rotation: -20, duration: 0.35, ease: 'back.out(4)', scrollTrigger: { trigger: badge, start: 'top 95%', ...st }, delay: 0.15 });
    });
  }, { scope: sectionRef });

  const handleHover = (e, i) => { const card = cardsRef.current[i]; if (card) gsap.to(card, { scale: 1.03, rotation: 0, zIndex: 10, duration: 0.2, ease: 'power2.out' }); };
  const handleLeave = (i) => { const card = cardsRef.current[i]; if (card) gsap.to(card, { scale: 1, rotation: 0, zIndex: 1, duration: 0.3, ease: 'power2.out' }); };

  return (
    <section id="achievements" ref={sectionRef} className="section-padding py-6 sm:py-8 md:py-12 lg:py-20 relative">
      <h2 className="section-title text-center">
        <span className="bg-[#FF4D5A] text-white px-2.5 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1 inline-block rotate-2 shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] border-2 border-black text-base sm:text-lg md:text-3xl lg:text-5xl">Achievements</span> & Awards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto items-start">
        {achievements.map((ach, i) => {
          const isFeatured = i === 0;
          return (
            <div key={i} ref={(el) => (cardsRef.current[i] = el)} className={`border-3 sm:border-4 border-black p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-2xl shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] flex flex-col justify-between hover:shadow-[8px_8px_0px_#000] md:hover:shadow-[12px_12px_0px_#000] transition-shadow duration-300 relative overflow-hidden bg-white ${isFeatured ? 'md:col-span-2' : ''}`} onMouseEnter={(e) => handleHover(e, i)} onMouseLeave={() => handleLeave(i)} data-hover>
              <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-3 sm:border-4 border-black opacity-20" style={{ backgroundColor: ach.color }} />
              <div>
                <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-6">
                  <span className="text-2xl sm:text-3xl md:text-4xl">{ach.icon}</span>
                  <div ref={(el) => (badgesRef.current[i] = el)} className="px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5 font-black text-[9px] sm:text-[10px] md:text-sm border-2 border-black rounded-full shadow-[2px_2px_0px_#000]" style={{ backgroundColor: ach.color, color: ach.color === '#FFC83D' ? '#000' : '#fff' }}>
                    {ach.isWinner && <span className="mr-0.5 sm:mr-1">⭐</span>}{ach.badge}
                  </div>
                </div>
                <h3 className="font-black mb-1.5 sm:mb-2 text-sm sm:text-base md:text-xl">{ach.title}</h3>
                <p className="font-medium text-gray-700 leading-relaxed text-[10px] sm:text-xs md:text-sm">{ach.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
