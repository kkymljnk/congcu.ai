"use client";

import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";
import { useEffect } from "react";

export function GhostLogo({ className = "" }: { className?: string }) {
  // Mouse tracking for eyes
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200, mass: 0.5 });

  const eyeControls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xOffset = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      const yOffset = (e.clientY / window.innerHeight) * 2 - 1; // -1 to 1
      
      mouseX.set(xOffset * 2.5); // Max movement 2.5px
      mouseY.set(yOffset * 1.5 - 0.5); // Max movement 1.5px, slightly shifted up
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const blink = async () => {
      await eyeControls.start({ scaleY: 0.1, transition: { duration: 0.05 } });
      await eyeControls.start({ scaleY: 1, transition: { duration: 0.08 } });
      
      // Random wait between 2s and 6s
      const nextBlink = Math.random() * 4000 + 2000;
      timeoutId = setTimeout(blink, nextBlink);
    };

    timeoutId = setTimeout(blink, 2000);
    return () => clearTimeout(timeoutId);
  }, [eyeControls]);

  return (
    <motion.svg 
      width="31" 
      height="18" 
      viewBox="0 0 31 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      {/* Ghost Body */}
      <path 
        d="M15.3379 0C6.86622 0 -0.002217 6.99928 5.36811e-07 15.6307H3.91838C3.91838 9.16211 8.99062 3.91764 15.3379 3.91764C21.6853 3.91764 26.7575 9.16211 26.7575 15.6307H30.6759C30.6774 6.99928 23.8089 0 15.3379 0Z" 
        fill="currentColor" 
      />
      
      {/* Eyes Group wrapped in motion to move around */}
      <motion.g style={{ x: smoothX, y: smoothY }}>
        {/* Blinking Group */}
        <motion.g animate={eyeControls} style={{ transformOrigin: "15px 13px" }}>
          {/* Eye 1 */}
          <path 
            d="M11.2631 15.9989C12.9863 15.9989 14.3832 14.602 14.3832 12.8789C14.3832 11.1557 12.9863 9.75879 11.2631 9.75879C9.53997 9.75879 8.14307 11.1557 8.14307 12.8789C8.14307 14.602 9.53997 15.9989 11.2631 15.9989Z" 
            fill="currentColor" 
          />
          {/* Eye 2 */}
          <path 
            d="M19.4162 15.9989C21.1394 15.9989 22.5363 14.602 22.5363 12.8789C22.5363 11.1557 21.1394 9.75879 19.4162 9.75879C17.693 9.75879 16.2961 11.1557 16.2961 12.8789C16.2961 14.602 17.693 15.9989 19.4162 15.9989Z" 
            fill="currentColor" 
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}
