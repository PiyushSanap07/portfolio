import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const navLinks = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Projects", link: "/projects" },
  { name: "Experience", link: "/experience" },
  { name: "Achievements", link: "/achievements" },
  { name: "Contact", link: "/contact" },
];

const NavbarContainer = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => { setVisible(latest > 100); });

  return (
    <motion.div ref={ref} className={cn("fixed inset-x-0 top-0 md:top-4 z-40 w-full", className)}>
      {React.Children.map(children, (child) => React.isValidElement(child) ? React.cloneElement(child, { visible }) : child)}
    </motion.div>
  );
};

const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        boxShadow: visible ? "0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 2px rgba(0, 0, 0, 1)" : "none",
        width: visible ? "fit-content" : "100%",
        y: visible ? 0 : 0,
        backgroundColor: visible ? "rgba(245, 245, 245, 0.95)" : "rgba(245, 245, 245, 1)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-6 py-2 lg:flex gap-12 border-0",
        visible && "border-2 border-black",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const NavItems = ({ items, className, onItemClick }) => {
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  return (
    <motion.div onMouseLeave={() => setHovered(null)} className={cn("hidden flex-row items-center justify-center space-x-2 text-sm font-medium text-black transition duration-200 lg:flex lg:space-x-2", className)}>
      {items.map((item, idx) => {
        const isActive = location.pathname === item.link;
        return (
          <Link onMouseEnter={() => setHovered(idx)} onClick={onItemClick} className={cn("relative px-4 py-2 text-black font-bold uppercase transition-colors", isActive ? "text-[#FF4D5A]" : "")} key={`link-${idx}`} to={item.link}>
            {hovered === idx && <motion.div layoutId="hovered" className="absolute inset-0 h-full w-full rounded-full bg-[#FFC83D]/30 border border-black" />}
            <span className="relative z-20">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};

const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        boxShadow: visible ? "0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 2px rgba(0, 0, 0, 1)" : "none",
        width: visible ? "92%" : "100%",
        paddingRight: visible ? "16px" : "16px",
        paddingLeft: visible ? "16px" : "16px",
        borderRadius: visible ? "16px" : "0px",
        y: visible ? 0 : 0,
        backgroundColor: "rgba(245, 245, 245, 0.98)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between px-4 py-2 lg:hidden border-0",
        visible && "border-2 border-black",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const MobileNavHeader = ({ children, className }) => (
  <div className={cn("flex w-full flex-row items-center justify-between py-1", className)}>{children}</div>
);

const MobileNavMenu = ({ children, className, isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className={cn("w-full flex flex-col items-start justify-start gap-2 rounded-xl bg-[#F5F5F5] px-2 py-4 border-2 border-black overflow-hidden", className)}>
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const MobileNavToggle = ({ isOpen, onClick }) => (
  isOpen
    ? <FaTimes size={22} className="text-black cursor-pointer" onClick={onClick} />
    : <FaBars size={22} className="text-black cursor-pointer" onClick={onClick} />
);

const NavbarLogo = () => (
  <Link to="/" className="relative z-20 flex items-center space-x-1 px-2 py-1 text-xl md:text-2xl font-black text-black">
    <span>Piyush</span>
    <span className="text-[#FF4D5A]">.</span>
  </Link>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative w-full">
      <NavbarContainer>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navLinks} />
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen}>
            {navLinks.map((item, idx) => {
              const isActive = location.pathname === item.link;
              return (
                <Link key={`mobile-link-${idx}`} to={item.link} onClick={() => setIsMobileMenuOpen(false)} className={cn("relative text-black font-bold uppercase w-full px-3 py-2 rounded-lg hover:bg-[#FFC83D]/20 transition-colors", isActive ? "text-[#FF4D5A] bg-[#FFC83D]/10" : "")}>
                  <span className="block">{item.name}</span>
                </Link>
              );
            })}
          </MobileNavMenu>
        </MobileNav>
      </NavbarContainer>
    </div>
  );
}
