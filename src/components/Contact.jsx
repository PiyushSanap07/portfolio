import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const btnRef = useRef(null);
  const infoRef = useRef(null);
  const infoCardsRef = useRef([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', _honey: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useGSAP(() => {
    const st = { toggleActions: 'play none none reverse' };
    const title = sectionRef.current?.querySelector('.section-title');
    if (title) gsap.from(title, { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', ...st } });
    gsap.from(infoRef.current, { scale: 0.7, x: -50, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', ...st } });
    gsap.from(formRef.current, { scale: 0.7, x: 50, opacity: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', ...st } });
    infoCardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, { scale: 0.5, y: 15, opacity: 0, duration: 0.35, ease: 'back.out(3)', scrollTrigger: { trigger: card, start: 'top 92%', ...st }, delay: i * 0.08 });
    });
  }, { scope: sectionRef });

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email format';
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value })); if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' })); };
  const handleFocus = (e) => gsap.to(e.target, { borderColor: '#4DA3FF', borderWidth: '3px', duration: 0.2 });
  const handleBlur = (e) => gsap.to(e.target, { borderColor: '#000', borderWidth: '3px', duration: 0.2 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { gsap.to(formRef.current, { x: -5, duration: 0.05, repeat: 5, yoyo: true, ease: 'power2.inOut', onComplete: () => gsap.set(formRef.current, { x: 0 }) }); return; }
    if (formData._honey) return;
    setStatus('sending'); gsap.to(btnRef.current, { width: 60, borderRadius: 30, duration: 0.3 });
    try {
      // Email backend disabled temporarily
      // const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, subject: formData.subject, message: formData.message }) });
      // if (!res.ok) throw new Error('Failed to send');
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success'); gsap.to(btnRef.current, { width: 'auto', borderRadius: 12, duration: 0.3 }); setFormData({ name: '', email: '', phone: '', subject: '', message: '', _honey: '' }); setTimeout(() => setStatus('idle'), 4000);
    } catch { setStatus('error'); gsap.to(btnRef.current, { width: 'auto', borderRadius: 12, duration: 0.3 }); gsap.to(formRef.current, { x: -5, duration: 0.05, repeat: 5, yoyo: true, ease: 'power2.inOut', onComplete: () => gsap.set(formRef.current, { x: 0 }) }); setTimeout(() => setStatus('idle'), 4000); }
  };

  const inputClass = (field) => `w-full px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 thick-border rounded-md sm:rounded-lg md:rounded-xl bg-white font-medium outline-none transition-colors text-xs sm:text-sm ${errors[field] ? 'border-red' : ''}`;

  return (
    <section id="contact" ref={sectionRef} className="section-padding">
      <h2 className="section-title"><span className="highlight-red">Contact</span> me</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-4 sm:gap-6 lg:gap-10">
        <div ref={infoRef}>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 md:mb-8">Got a project idea, a question, or just want to say hi? I'd love to hear from you. Drop a message and I'll get back to you soon!</p>
          <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
            <div ref={(el) => (infoCardsRef.current[0] = el)} className="brutal-card p-2.5 sm:p-3 md:p-4 flex items-center gap-2.5 sm:gap-3 md:gap-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-blue rounded-md sm:rounded-lg md:rounded-xl thick-border flex items-center justify-center shrink-0"><svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg></div>
              <span className="font-semibold text-[10px] sm:text-xs md:text-sm break-all">piyushsanapnsk@gmail.com</span>
            </div>
            <div ref={(el) => (infoCardsRef.current[1] = el)} className="brutal-card p-2.5 sm:p-3 md:p-4 flex items-center gap-2.5 sm:gap-3 md:gap-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-yellow rounded-md sm:rounded-lg md:rounded-xl thick-border flex items-center justify-center shrink-0"><svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
              <span className="font-semibold text-xs sm:text-sm">India</span>
            </div>
          </div>
        </div>
        <div className="brutal-card p-3 sm:p-4 md:p-6 lg:p-8">
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 mb-2.5 sm:mb-3 md:mb-4">
              <div><label className="text-[10px] sm:text-xs md:text-sm font-bold mb-0.5 sm:mb-1 block">Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="Piyush Sanap" className={inputClass('name')} />{errors.name && <span className="text-red text-[9px] sm:text-[10px] md:text-xs font-bold mt-0.5 sm:mt-1 block">{errors.name}</span>}</div>
              <div><label className="text-[10px] sm:text-xs md:text-sm font-bold mb-0.5 sm:mb-1 block">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="hello@example.com" className={inputClass('email')} />{errors.email && <span className="text-red text-[9px] sm:text-[10px] md:text-xs font-bold mt-0.5 sm:mt-1 block">{errors.email}</span>}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 mb-2.5 sm:mb-3 md:mb-4">
              <div><label className="text-[10px] sm:text-xs md:text-sm font-bold mb-0.5 sm:mb-1 block">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="+91 98765 43210" className={inputClass('phone')} /></div>
              <div><label className="text-[10px] sm:text-xs md:text-sm font-bold mb-0.5 sm:mb-1 block">Subject</label><input type="text" name="subject" value={formData.subject} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="Project Inquiry" className={inputClass('subject')} /></div>
            </div>
            <div className="mb-3 sm:mb-4 md:mb-6"><label className="text-[10px] sm:text-xs md:text-sm font-bold mb-0.5 sm:mb-1 block">Message *</label><textarea name="message" value={formData.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} rows="3" placeholder="Tell me about your project..." className={`${inputClass('message')} resize-none`} />{errors.message && <span className="text-red text-[9px] sm:text-[10px] md:text-xs font-bold mt-0.5 sm:mt-1 block">{errors.message}</span>}</div>
            <input type="text" name="_honey" value={formData._honey} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />
            <button ref={btnRef} type="submit" disabled={status === 'sending'} className="brutal-btn brutal-btn-primary w-full justify-center disabled:opacity-70" data-hover>
              {status === 'idle' && 'Send message'}{status === 'sending' && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}{status === 'success' && <span className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>Sent!</span>}{status === 'error' && 'Failed. Try again.'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
