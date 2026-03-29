"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/ui/header";
import { galleryItems } from "./data";
import { Check, Copy, ChevronLeft, ChevronRight, Sparkles, Play } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/ui/LanguageContext";
import { encodeImageUrl } from "@/utils/imageObfuscator";
import React from "react";
import Image from "next/image";
import { AnimatedWatermark } from "@/components/ui/animated-watermark";
import { LazyVideo } from "@/components/ui/lazy-video";

export default function HomePage() {
  const { t } = useLanguage();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [displayItems, setDisplayItems] = useState(galleryItems);

  useEffect(() => {
    // Tự động xáo trộn ngẫu nhiên vị trí các Video mỗi khi người dùng F5 hoặc tải lại trang
    const shuffled = [...galleryItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDisplayItems(shuffled);
  }, []);


  const itemsPerPage = 999; // Tạm tắt phân trang theo yêu cầu bằng cách đẩy kịch trần
  const totalPages = Math.ceil(displayItems.length / itemsPerPage);
  const paginatedItems = displayItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const { scrollY } = useScroll();
  const opacityTransform = useTransform(scrollY, [0, 500, 800], [1, 1, 0]);
  const blurOpacityTransform = useTransform(scrollY, [0, 400], [0, 1]);

  const handleCopy = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col font-[var(--font-inter)] font-normal">
      {/* Navbar trong suốt */}
      <Header />

      {/* Main */}
      <main className="flex-1 transition-all duration-500 mt-4">
        {/* HERO */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Video nền */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              opacity: opacityTransform,
            }}
          >
            {/* HERO video (Có gắn Ref để tự động Pause khi lướt đi) */}
            <video
              ref={heroVideoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transform-gpu will-change-transform"
              style={{ backfaceVisibility: "hidden" }}
              poster="/brand/hero-poster.jpg"
            >
              <source src="/video/hero-1080.mp4" media="(min-width: 768px)" type="video/mp4" />
              <source src="/video/hero-720.mp4" media="(max-width: 767px)" type="video/mp4" />
            </video>

            {/* Overlay + gạch mờ dưới */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />

            {/* Scroll Overlay (Đã loại bỏ backdrop-blur-2xl tốn kém của CSS, thay bằng fade đen mượt mà) */}
            <motion.div 
              className="absolute inset-0 bg-black/80"
              style={{ opacity: blurOpacityTransform }}
            />
          </motion.div>

          {/* High-Performance Glowing Orbs (CSS tĩnh hoàn toàn để CPU không phải tính toán mỗi miligiây) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] pointer-events-none overflow-visible flex justify-center items-center opacity-30">
            <div className="absolute w-[400px] h-[400px]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0) 70%)" }} />
            <div className="absolute w-[450px] h-[450px] ml-32" style={{ background: "radial-gradient(circle, rgba(147,51,234,0.6) 0%, rgba(147,51,234,0) 70%)" }} />
            <div className="absolute w-[350px] h-[350px] -ml-32" style={{ background: "radial-gradient(circle, rgba(34,211,238,0.6) 0%, rgba(34,211,238,0) 70%)" }} />
          </div>



          {/* Hero Content - Premium Linear/Raycast Dark Aesthetic */}
          <div className="relative z-10 w-full min-h-[85vh] flex flex-col items-center justify-center mt-12 md:mt-20 mb-12 px-4 md:px-8 cursor-default overflow-hidden">
            
            {/* Subtle Precise Spotlight Background */}
            <div className="absolute inset-0 z-0 pointer-events-none flex flex-col items-center">
               {/* Soft radial glow instead of massive colored blur */}
               <div className="absolute top-0 w-[600px] h-[300px] bg-white/5 blur-[80px] rounded-[50%]"></div>
               {/* Dot grid subtle */}
               <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_30%,black,transparent)] opacity-50"></div>
            </div>

            {/* Typography Content */}
            <div className="flex flex-col items-center text-center max-w-5xl relative z-20 mt-8 md:mt-16">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex flex-col items-center justify-center w-full"
              >
                
                {/* GLASS ENGRAVING CSS */}
                <style dangerouslySetInnerHTML={{__html: `
                  .glass-engraving-text {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
                    background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    text-shadow: 0px 4px 20px rgba(0,0,0,0.5);
                  }
                  
                  .glass-engraving-ai {
                    color: transparent;
                    -webkit-text-stroke: 1.5px rgba(152, 150, 255, 0.8);
                    background: linear-gradient(180deg, rgba(152, 150, 255, 0.7) 0%, rgba(26, 136, 248, 0.2) 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    text-shadow: 0px 4px 30px rgba(152,150,255,0.4);
                  }
                `}} />

                {/* Line 1: Mascot Container and Headline Prefix */}
                <div className="relative z-20 mb-[-10px] sm:mb-[-15px]">
                  <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                    
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 flex shrink-0 items-center justify-center">
                      
                      {/* Aura Background (Đã tắt CSS Blur 40px tốn đồ họa, thay bằng Radial tĩnh mượt mà) */}
                      <motion.div
                        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.2, 0.9] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(26,136,248,0.6) 0%, rgba(255,0,128,0.4) 50%, rgba(0,0,0,0) 80%)" }}
                      />
                      
                      {/* Parallax Clone Trail */}
                      <motion.div
                        animate={{ x: [-15, 15, -15], y: [10, -10, 10], rotate: [0, -15, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
                      >
                        <img src="/aave/congcuai.svg?v=3" alt="" className="w-full h-full object-contain filter saturate-200 hue-rotate-30" />
                      </motion.div>

                      {/* Main Floating Mascot */}
                      <motion.div
                        animate={{ y: [-10, 10, -10], rotate: [-4, 4, -4] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full relative z-10"
                      >
                        <img src="/aave/congcuai.svg?v=3" alt="CongCu AI Mascot" className="w-full h-full object-contain filter saturate-200 contrast-125 drop-shadow-[0_20px_40px_rgba(26,136,248,0.8)]" />
                      </motion.div>
                      
                    </div>
                    
                    <span className="relative z-10 text-base sm:text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#1A88F8]/70 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                      {t('heroLine1')}
                    </span>
                  </div>
                </div>

                {/* Line 2: Main Dynamic Headline */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[75px] xl:text-[90px] font-black uppercase tracking-[0.15em] leading-[1.2] text-center w-full relative z-10 flex flex-col items-center mt-0">
                  <span className="relative z-20 whitespace-pre-wrap flex justify-center flex-wrap">
                    {/* Localization-safe word splitting for Duotone impact */}
                    {String(t('heroLine2')).toUpperCase().split('AI').map((part, index, array) => (
                      <React.Fragment key={index}>
                        {part && (
                          <span className="glass-engraving-text relative z-20 inline-block drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                            {part}
                          </span>
                        )}
                        {index < array.length - 1 && (
                          <span className="glass-engraving-ai relative z-30 inline-block mx-[0.1em] drop-shadow-[0_10px_30px_rgba(26,136,248,0.2)]">
                            AI
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </span>
                </h1>
                
              </motion.div>

              {/* BRAND NEW TEXT STYLE FOR THE SUBTITLE WITH EFFECTS */}
              <div className="mt-8 md:mt-10 relative flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 z-20">
                <div className="absolute -inset-x-8 -inset-y-2 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-md rounded-full pointer-events-none"></div>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative group cursor-default"
                >
                  <span className="relative text-lg md:text-xl font-light tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 block py-1">
                    {String(t('heroDesc1')).replace(/\./g, '').trim()}
                  </span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0, rotate: -45 }} 
                  animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                  transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                  className="hidden sm:flex items-center justify-center relative w-2 h-2 mx-1" 
                >
                   <div className="absolute inset-0 bg-white/60 blur-[4px] rounded-full animate-pulse" />
                   <div className="w-1.5 h-1.5 rounded-full bg-white z-10 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative group cursor-default"
                >
                  <span className="relative text-lg md:text-xl font-medium tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300 block py-1">
                    {String(t('heroDescBold')).replace(/\./g, '').trim()}
                  </span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0, rotate: -45 }} 
                  animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                  transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                  className="hidden sm:flex items-center justify-center relative w-2 h-2 mx-1" 
                >
                   <div className="absolute inset-0 bg-white/60 blur-[4px] rounded-full animate-pulse" />
                   <div className="w-1.5 h-1.5 rounded-full bg-white z-10 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="relative group cursor-default"
                >
                  <span className="relative text-lg md:text-xl font-light tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300 block py-1">
                    {String(t('heroDesc2')).replace(/\./g, '').trim()}
                  </span>
                </motion.div>
              </div>

              {/* Hero Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="mt-14 md:mt-16 relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
              >
                {/* Primary Linear Dark Button */}
                <div className="relative group w-[220px] sm:w-auto h-full flex justify-center">
                  {/* Outer Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-zinc-400/20 to-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  
                  <a 
                    href="https://market.congcu.ai" 
                    target="_blank" rel="noopener noreferrer"
                    className="relative w-full flex items-center justify-center px-8 sm:px-10 py-4 text-sm md:text-base font-bold text-zinc-300 uppercase tracking-widest transition-all bg-[#0a0a0a] border border-white/10 rounded-full group-hover:bg-[#151515] group-hover:text-white"
                  >
                    <span className="mr-3">{t('btnStart')}</span>
                    <svg className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                </div>

                {/* Secondary Transparent Glass Button */}
                <a
                  href="https://market.congcu.ai"
                  target="_blank" rel="noopener noreferrer"
                  className="group relative w-[220px] sm:w-auto flex items-center justify-center px-8 sm:px-10 py-4 text-sm md:text-base font-bold text-zinc-400 uppercase tracking-widest transition-all bg-transparent border border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 hover:text-white overflow-hidden shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                >
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] transition-transform duration-1000 group-hover:translate-x-[50%]" />
                  <span className="relative z-10 mr-3">{t('btnExplore')}</span>
                  <svg className="relative z-10 w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </a>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Đệm nhỏ dưới hero */}
        <div className="h-4 sm:h-6" />

        {/* GALLERY */}
        <section className="px-4 pb-12" id="gallery">
          {/* Dùng group/gallery để làm mờ toàn bộ bảng khi có 1 item được hover */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px] group/gallery">
            {paginatedItems.map((item) => {
              const isVideo = /\.(mp4|webm|mov)(\?.*)?$/i.test(item.src);
              
              return (
                <div
                  key={item.id}
                  // Cấu hình Spotlight mượt mà trên CPU mà không xài Javascript (framer-motion)
                  className={`group relative rounded-xl overflow-hidden bg-[#111] border border-white/5 ${item.rowSpan} transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:!z-20 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]`}
                >
                  {isVideo ? (
                    <LazyVideo
                      src={item.src}
                      className="absolute inset-0 w-full h-full select-none"
                    />
                  ) : (
                    <Image
                      src={encodeImageUrl(item.src)}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover pointer-events-none select-none transition-transform duration-700"
                      quality={75}
                    />
                  )}

                  {/* Lớp phủ đen xuất hiện khi hover các phần tử khác trong gallery, giúp làm mờ nhẹ mà không giảm opacity của thẻ gốc làm GPU quá tải */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 pointer-events-none transition-opacity duration-700 md:group-hover/gallery:opacity-100 md:group-hover:!opacity-0 z-[15]" />

                  {/* Lớp phủ shadow cho watermark */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 z-20" />
                  
                  {/* Watermark mờ ảo (Không dùng mix-blend-screen để cứu CPU yếu) */}
                  <div className="absolute bottom-4 left-4 w-28 md:w-36 pointer-events-none opacity-50 transition-all duration-700 group-hover:opacity-100 z-20">
                    <AnimatedWatermark />
                  </div>
                  
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-6 mt-16"
            >
              <button
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                disabled={currentPage === 1}
                className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/5 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {currentPage}
                </span>
                <span className="text-white/40 text-lg">/</span>
                <span className="text-white/60 text-lg font-medium">{totalPages}</span>
              </div>

              <button
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                disabled={currentPage === totalPages}
                className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/5 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </section>
      </main>

    </div>
  );
}

