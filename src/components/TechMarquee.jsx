export default function TechMarquee() {
  const techs = [
    { name: 'React', dot: '#FF4D5A' }, { name: 'Node.js', dot: '#4DA3FF' }, { name: 'Python', dot: '#FFC83D' }, { name: 'MongoDB', dot: '#FF4D5A' }, { name: 'AWS', dot: '#4DA3FF' }, { name: 'TypeScript', dot: '#FFC83D' }, { name: 'Docker', dot: '#FF4D5A' }, { name: 'GraphQL', dot: '#4DA3FF' }, { name: 'Next.js', dot: '#FFC83D' }, { name: 'PostgreSQL', dot: '#FF4D5A' },
  ];

  return (
    <div className="w-full">
      <div className="border-y-4 border-black py-3 md:py-5 bg-black">
        <div className="marquee-track whitespace-nowrap flex gap-6 md:gap-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-6 md:gap-10 items-center">
              {techs.map((tech, j) => (
                <span key={j}>
                  <span className="font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-widest text-white">{tech.name}</span>
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full inline-block flex-shrink-0 ml-4 md:ml-10" style={{ backgroundColor: tech.dot }}></span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
