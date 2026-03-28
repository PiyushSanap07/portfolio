import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [isHovered, setIsHovered] = useState(false);

   useEffect(() => {
      const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
      const handleMouseOver = (e) => {
         if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) setIsHovered(true);
         else setIsHovered(false);
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseOver);
      return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseover', handleMouseOver); };
   }, []);

   return (
      <motion.div
         className="hidden md:block fixed top-0 left-0 w-5 h-5 border border-orange-500/50 rounded-full pointer-events-none z-[9999] mix-blend-difference custom-cursor"
         animate={{ x: position.x - 10, y: position.y - 10, scale: isHovered ? 2.5 : 1, backgroundColor: isHovered ? 'rgba(255, 69, 0, 0.2)' : 'transparent', borderColor: isHovered ? 'transparent' : 'rgba(255, 69, 0, 0.5)' }}
         transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
   );
};

export default CustomCursor;
