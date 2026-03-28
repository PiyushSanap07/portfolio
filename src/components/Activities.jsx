import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { coCurricular, extraCurricular } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Activities() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const activityCardsRef = useRef([]);
  const [activeTab, setActiveTab] = useState('co');
  const currentData = activeTab === 'co' ? coCurricular : extraCurricular;
  const folderColor = activeTab === 'co' ? '#4DA3FF' : '#FFC83D';

  useGSAP(() => {
    const st = { toggleActions: 'play none none reverse' };
    const title = sectionRef.current?.querySelector('.section-title');
    if (title) gsap.from(title, { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', ...st } });
    gsap.from(containerRef.current, { scale: 0.8, y: 50, opacity: 0, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', ...st } });

    // Animate each activity card on scroll
    activityCardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, { scale: 0.5, y: 30, opacity: 0, rotation: i % 2 === 0 ? -5 : 5, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: card, start: 'top 95%', ...st } });
    });
  }, { scope: sectionRef });

  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    gsap.to('.folder-content-item', { opacity: 0, scale: 0.7, y: -10, duration: 0.12, stagger: 0.02, onComplete: () => {
      setActiveTab(tab);
      setTimeout(() => { gsap.fromTo('.folder-content-item', { opacity: 0, scale: 0.5, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'back.out(2)' }); }, 50);
    }});
  };

  return (
    <section id="activities" ref={sectionRef} className="section-padding py-6 sm:py-8 md:py-12 lg:py-16">
      <h2 className="section-title text-center">My <span className="bg-[#FFC83D] text-black px-2.5 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1 inline-block -rotate-2 shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] border-2 border-black text-base sm:text-lg md:text-3xl lg:text-5xl">Activities</span></h2>
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <div className="flex px-1.5 sm:px-3 md:px-8 gap-1 sm:gap-1.5 md:gap-2 mb-[-3px] relative z-10 overflow-x-auto">
          <button onClick={() => handleTabSwitch('co')} className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-6 md:py-3 font-bold text-[10px] sm:text-xs md:text-sm lg:text-lg rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl border-l-3 border-t-3 border-r-3 sm:border-l-4 sm:border-t-4 sm:border-r-4 border-black transition-all whitespace-nowrap ${activeTab === 'co' ? 'bg-[#4DA3FF] text-white pt-2 pb-1.5 sm:pt-3 sm:pb-2 md:pt-5 md:pb-4 -mt-2' : 'bg-white text-gray-500 hover:bg-gray-100'}`} data-hover>Co-Curricular</button>
          <button onClick={() => handleTabSwitch('extra')} className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-6 md:py-3 font-bold text-[10px] sm:text-xs md:text-sm lg:text-lg rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl border-l-3 border-t-3 border-r-3 sm:border-l-4 sm:border-t-4 sm:border-r-4 border-black transition-all whitespace-nowrap ${activeTab === 'extra' ? 'bg-[#FFC83D] text-black pt-2 pb-1.5 sm:pt-3 sm:pb-2 md:pt-5 md:pb-4 -mt-2' : 'bg-white text-gray-500 hover:bg-gray-100'}`} data-hover>Extra-Curricular</button>
        </div>
        <div className="border-3 sm:border-4 border-black rounded-b-2xl sm:rounded-b-3xl rounded-tr-2xl sm:rounded-tr-3xl p-3 sm:p-4 md:p-8 lg:p-10 shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] md:shadow-[12px_12px_0px_#000] min-h-[180px] sm:min-h-[200px] md:min-h-[300px] transition-colors duration-300" style={{ backgroundColor: folderColor }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-6">
            {currentData.map((item, i) => (
              <div
                key={`${activeTab}-${i}`}
                ref={(el) => (activityCardsRef.current[i] = el)}
                className="folder-content-item bg-white border-3 sm:border-4 border-black p-2.5 sm:p-3 md:p-6 rounded-xl sm:rounded-2xl shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] sm:hover:shadow-[6px_6px_0px_#000] md:hover:shadow-[8px_8px_0px_#000] transition-all"
                data-hover
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#F5F5F5] border-2 border-black rounded-full flex items-center justify-center text-base sm:text-lg md:text-2xl mb-2 sm:mb-3 shadow-[2px_2px_0px_#000]">{item.icon}</div>
                <h3 className="text-sm sm:text-base md:text-xl font-black mb-0.5 sm:mb-1 md:mb-2">{item.title}</h3>
                <p className="font-medium text-gray-800 leading-relaxed border-t-2 border-dashed border-gray-300 pt-1.5 sm:pt-2 md:pt-3 mt-1.5 sm:mt-2 md:mt-3 text-[10px] sm:text-xs md:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
