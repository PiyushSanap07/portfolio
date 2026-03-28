import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Characters for the matrix rain (Katakana, Latin, Numerics)
    const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const fontSize = 16;
    let columns = width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Translucent white background to create trail effect
      ctx.fillStyle = 'rgba(245, 245, 245, 0.15)'; // #F5F5F5 equivalent
      ctx.fillRect(0, 0, width, height);

      // Vibrant colors from the portfolio's Neo-Brutalist palette
      const customBlue = 'rgba(77, 163, 255, 0.8)'; // #4DA3FF 
      const customRed = 'rgba(255, 77, 90, 0.9)';   // #FF4D5A

      ctx.font = 'bold ' + fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to the top randomly
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const newColumns = width / fontSize;
      if (newColumns > columns) {
        for (let x = columns; x < newColumns; x++) {
          drops[x] = 1;
        }
      }
      columns = newColumns;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
    />
  );
};

export default MatrixRain;
