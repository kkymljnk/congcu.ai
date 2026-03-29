"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Chỉ kích hoạt trên Desktop (những thiết bị sử dụng chuột vật lý)
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    setIsVisible(true);

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Nhận diện trạng thái Hover nếu trúng thẻ Link, Nút, hoặc Thẻ Video Gallery
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.group\\/video') || 
        target.closest('.group\\/gallery')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", mouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", mouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          body, a, button, .cursor-pointer {
            cursor: none !important;
          }
        }
      `}} />

      {/* Vòng sáng vệ tinh đuổi theo (Aura Ring) chạy mượt bằng lò xo Physics (Spring) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9999] border border-white/20 mix-blend-screen shadow-[0_0_20px_rgba(255,255,255,0.4)] flex justify-center items-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(255,255,255,0.05)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      >
        {isHovering && (
           <span className="text-[10px] font-bold text-white tracking-widest uppercase opacity-90 drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
             FOCUS
           </span>
        )}
      </motion.div>
      
      {/* Lõi tâm của con trỏ (Trùm ngay chóc đúng tọa độ chuột tức thì) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] shadow-[0_0_10px_white]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1, // Tâm biến mất khi Hover
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
    </>
  );
}
