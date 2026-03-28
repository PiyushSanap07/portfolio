import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const footerLinks = [
  { label: 'Home', href: '#home' }, { label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Achievements', href: '#achievements' }, { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/PiyushSanap07', icon: <FaGithub size={20} /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/piyush-sanap-577855329', icon: <FaLinkedin size={20} /> },
  { label: 'Email', href: 'mailto:piyushsanapnsk@gmail.com', icon: <FaEnvelope size={18} /> },
];

export default function Footer() {
  const footerRef = useRef(null);
  const colsRef = useRef([]);

  useGSAP(() => {
    const st = { toggleActions: 'play none none reverse' };
    gsap.from(footerRef.current, { y: 30, opacity: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: footerRef.current, start: 'top 92%', ...st } });
    colsRef.current.forEach((col, i) => {
      if (!col) return;
      gsap.from(col, { scale: 0.8, y: 20, opacity: 0, duration: 0.4, ease: 'back.out(2)', scrollTrigger: { trigger: footerRef.current, start: 'top 92%', ...st }, delay: i * 0.08 });
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="mt-6 sm:mt-8 md:mt-12 border-t-4 border-black bg-[#111111] text-white">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-5 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1.2fr] gap-8 md:gap-12 lg:gap-16">

          {/* Brand */}
          <div ref={(el) => (colsRef.current[0] = el)}>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FFC83D] rounded-xl thick-border flex items-center justify-center shadow-[3px_3px_0px_white]">
                <span className="text-black font-black text-base sm:text-lg">P</span>
              </div>
              <span className="font-extrabold text-lg sm:text-xl md:text-2xl text-white uppercase tracking-tight">Piyush Sanap</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm md:pr-4">
              Full-stack developer & AI enthusiast building scalable applications that make an impact.
            </p>
          </div>

          {/* Quick Links */}
          <div ref={(el) => (colsRef.current[1] = el)}>
            <h4 className="font-extrabold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-white uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-1.5 sm:space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center text-gray-400 text-sm md:text-base font-bold hover:text-[#4DA3FF] hover:translate-x-2 transition-transform relative group w-fit no-underline py-1"
                  data-hover
                >
                  <span className="mr-3 text-[#FFC83D] opacity-0 group-hover:opacity-100 transition-opacity absolute -left-6">→</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div ref={(el) => (colsRef.current[2] = el)}>
            <h4 className="font-extrabold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-white uppercase tracking-wider">Connect</h4>
            <div className="flex flex-row md:flex-col gap-4 w-full">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start md:px-6 w-12 h-12 sm:w-14 sm:h-14 md:w-full md:h-auto md:py-4 rounded-xl bg-gray-800 text-white hover:bg-[#FFC83D] hover:text-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_#4DA3FF] border-2 border-transparent hover:border-black transition-all group"
                  title={social.label}
                  data-hover
                >
                  <span className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">{social.icon}</span>
                  <span className="hidden md:block ml-4 font-bold text-lg uppercase tracking-tight">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-5 border-t border-gray-800 flex items-center justify-center">
          <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-medium text-center">
            © {new Date().getFullYear()} Piyush Sanap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

