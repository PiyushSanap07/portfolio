import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { faqs } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);
  const iconRefs = useRef([]);
  const sectionRef = useRef(null);
  const faqItemsRef = useRef([]);

  useGSAP(() => {
    const title = sectionRef.current?.querySelector('.section-title');
    if (title) gsap.from(title, { x: -60, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });

    faqItemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.from(item, { x: 50, opacity: 0, duration: 0.4, ease: 'power2.out', scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none reverse' }, delay: i * 0.06 });
    });
  }, { scope: sectionRef });

  const toggle = (i) => {
    if (openIndex !== null && openIndex !== i) {
      gsap.to(answerRefs.current[openIndex], { height: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut' });
      gsap.to(iconRefs.current[openIndex], { rotate: 0, duration: 0.25, ease: 'power2.inOut' });
    }
    if (openIndex === i) {
      gsap.to(answerRefs.current[i], { height: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut' });
      gsap.to(iconRefs.current[i], { rotate: 0, duration: 0.25, ease: 'power2.inOut' });
      setOpenIndex(null);
    } else {
      const el = answerRefs.current[i];
      gsap.set(el, { height: 'auto', opacity: 1 });
      gsap.from(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(iconRefs.current[i], { rotate: 180, duration: 0.25, ease: 'power2.inOut' });
      setOpenIndex(i);
    }
  };

  return (
    <section id="faq" ref={sectionRef} className="section-padding">
      <h2 className="section-title text-center">Frequently <span className="highlight-red">Asked</span> Questions</h2>
      <div className="max-w-2xl mx-auto space-y-3 md:space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} ref={(el) => (faqItemsRef.current[i] = el)} className="brutal-card overflow-hidden">
            <button className="w-full px-4 py-3.5 md:px-6 md:py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm md:text-base gap-3" onClick={() => toggle(i)} data-hover>
              <span className="flex-1">{faq.question}</span>
              <span ref={(el) => (iconRefs.current[i] = el)} className="text-sm md:text-lg font-black shrink-0 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center thick-border rounded-full bg-[#FFC83D]">↓</span>
            </button>
            <div ref={(el) => (answerRefs.current[i] = el)} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
              <p className="px-4 pb-4 md:px-6 md:pb-5 text-xs md:text-sm text-gray-800 leading-relaxed border-t-2 border-dashed border-gray-200 pt-3">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
