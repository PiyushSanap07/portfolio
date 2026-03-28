import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  useGSAP(() => {
    gsap.from(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.from(modalRef.current, { scale: 0.6, opacity: 0, y: 30, duration: 0.35, ease: 'back.out(2)' });
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  const handleClose = () => { gsap.to(overlayRef.current, { opacity: 0, duration: 0.15 }); gsap.to(modalRef.current, { scale: 0.7, opacity: 0, duration: 0.2, onComplete: onClose }); };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div ref={modalRef} className="relative bg-white thick-border-4 rounded-2xl sm:rounded-3xl hard-shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-5 md:p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 thick-border rounded-full flex items-center justify-center hover:bg-[#FF4D5A] hover:text-white transition-colors font-bold text-xs sm:text-sm" data-hover>✕</button>
        <div className="w-full h-24 sm:h-28 md:h-40 rounded-xl sm:rounded-2xl thick-border mb-4 sm:mb-5 flex items-center justify-center" style={{ background: project.color }}><span className="text-4xl sm:text-5xl md:text-6xl font-black text-white drop-shadow-md">{project.title[0]}</span></div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-2 sm:mb-3">{project.title}</h3>
        <p className="text-gray-800 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">{project.tech.map((t) => (<span key={t} className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold thick-border rounded-full bg-[#F5F5F5]">{t}</span>))}</div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <a href={project.live} className="brutal-btn brutal-btn-primary text-xs sm:text-sm justify-center" data-hover>🔗 Live Demo</a>
          <a href={project.github} className="brutal-btn brutal-btn-secondary text-xs sm:text-sm justify-center" data-hover>💻 GitHub</a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useGSAP(() => {
    const st = { toggleActions: 'play none none reverse' };
    const title = sectionRef.current?.querySelector('.section-title');
    if (title) gsap.from(title, { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', ...st } });
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, { scale: 0.4, y: 50, opacity: 0, rotation: i % 2 === 0 ? -6 : 6, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: card, start: 'top 95%', ...st } });
    });
  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} className="section-padding">
      <h2 className="section-title">Featured <span className="highlight-red">Projects</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {projects.map((project, i) => (
          <div key={project.id} ref={(el) => (cardsRef.current[i] = el)} onClick={() => setSelectedProject(project)} data-hover className="cursor-pointer">
            <div className="brutal-card overflow-hidden group rounded-2xl sm:rounded-3xl">
              <div className="h-20 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center transition-colors duration-300 group-hover:brightness-110" style={{ background: project.color }}>
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-md">{project.title[0]}</span>
              </div>
              <div className="p-3 sm:p-4 md:p-5">
                <h3 className="text-base sm:text-lg md:text-xl font-extrabold mb-1.5 sm:mb-2">{project.title}</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-800 mb-2 sm:mb-3 md:mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3 md:mb-4">
                  {project.tech.slice(0, 3).map((t) => (<span key={t} className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-[10px] md:text-xs font-bold thick-border rounded-full bg-[#F5F5F5]">{t}</span>))}
                  {project.tech.length > 3 && (<span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-[10px] md:text-xs font-bold thick-border rounded-full bg-[#FFC83D]">+{project.tech.length - 3}</span>)}
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <a href={project.live} className="px-2 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-bold bg-black text-white thick-border rounded-md sm:rounded-lg hover:bg-[#4DA3FF] transition-colors" onClick={(e) => e.stopPropagation()} data-hover>Live ↗</a>
                  <a href={project.github} className="px-2 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-bold bg-white text-black thick-border rounded-md sm:rounded-lg hover:bg-gray-100 transition-colors" onClick={(e) => e.stopPropagation()} data-hover>GitHub ↗</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
