import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { yPercent: -100, duration: 0.6, ease: 'power3.inOut', onComplete });
      },
    });
    tl.to(progressRef.current, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' });
    tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.4');
    tl.to({}, { duration: 0.2 });
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] bg-black text-[#FFC83D] flex flex-col items-center justify-center pointer-events-none px-4">
      <div className="overflow-hidden mb-6 md:mb-8">
        <h1 ref={textRef} className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest opacity-0 translate-y-10 text-center">Loading</h1>
      </div>
      <div className="w-48 sm:w-56 md:w-80 lg:w-96 h-3 md:h-4 border-2 border-[#FFC83D] p-0.5 md:p-1 rounded-full relative">
        <div ref={progressRef} className="h-full bg-[#FF4D5A] w-full rounded-full origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  );
}
