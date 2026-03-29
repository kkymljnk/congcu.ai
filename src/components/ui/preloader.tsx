"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Khóa thanh cuộn để người dùng tập trung thưởng thức Cinematic Intro trong 2.5 giây
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Mở lại thanh cuộn
      document.body.style.overflow = "auto";
    }, 2800); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#000000] text-white"
        >
          {/* Cụm lõi phát sáng ở giữa */}
          <div className="relative flex flex-col items-center">
            
            {/* Thanh năng lượng quét ngang */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "250px", opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute top-1/2 -translate-y-1/2"
            />
            
            {/* Chữ thương hiệu từ bóng tối hiện lên */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "15px", filter: "blur(10px)" }}
              animate={{ opacity: 1, letterSpacing: "2px", filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
              className="text-3xl md:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              CONGCU.AI
            </motion.h1>

            {/* Subtitle nháy Loading mã code hacker */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-xs text-zinc-500 tracking-[0.5em] uppercase mt-4 font-mono font-medium"
            >
              Initializing Core...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
