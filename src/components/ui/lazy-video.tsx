"use client";

import React, { useRef, useState, useEffect } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function LazyVideo({ src, className, ...props }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Ép Cloudinary tự động nén định dạng và giới hạn độ phân giải ngang ở 1080p để tránh GPU quá tải khi render gallery
  const optimizedSrc = src.includes('cloudinary.com') && !src.includes('q_auto') 
    ? src.replace('/upload/', '/upload/q_auto,f_auto,c_limit,w_1080/') 
    : src;

  // Tự động rọc khung hình xuất sắc nhất ở mốc 30% thời lượng video (thay vì giây đầu tiên hay bị tối đen) làm Poster
  const posterUrl = optimizedSrc.includes('cloudinary.com')
    ? optimizedSrc.replace('/upload/', '/upload/so_30p/').replace(/\.(mp4|webm|mov)$/i, '.jpg')
    : optimizedSrc.replace(/\.(mp4|webm|mov)$/i, '.jpg');

  useEffect(() => {
    // 1. Observer: Tải Source Video khi cuộn tới gần
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldLoad) {
          setShouldLoad(true);
        }
      },
      { rootMargin: "300px" }
    );

    if (containerRef.current) {
      loadObserver.observe(containerRef.current);
    }
    return () => loadObserver.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    // 2. Chế độ Tự Động Play dành riêng cho Điện thoại / Tablet (Không dùng được chuột hover)
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    
    if (!isTouchDevice) return; // Nếu là máy tính thì hủy bỏ, giao lại cho sự kiện hover chuột

    const mobilePlayObserver = new IntersectionObserver(([entry]) => {
        // Tự động play nếu video cuộn lọt thỏm vào giữa màn hình được ít nhất 40% diện tích
        if (entry.isIntersecting) {
            setIsHovered(true);
        } else {
            // Lúc vuốt qua luôn thì dừng phát hình ngay lập tức để tiết kiệm Pin cho điện thoại
            setIsHovered(false);
        }
      }, { threshold: 0.4 } 
    );
    
    if (containerRef.current) {
      mobilePlayObserver.observe(containerRef.current);
    }
    return () => mobilePlayObserver.disconnect();
  }, []);

  // Handler chính: Xử lý kích hoạt Video thực tế (Chạy chung cho cả Hover máy tính và AutoMobile)
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 150); // Delay 150ms để chống báo Play liên tục khi lướt chuột nhanh ngang qua thẻ
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative bg-[#050505] cursor-pointer group/video ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {shouldLoad ? (
        <>
          <video
            ref={videoRef}
            src={optimizedSrc}
            poster={posterUrl}
            loop
            muted
            playsInline
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata" // Chỉ tải trước độ dài/kích thước, tuyệt đối không tải nội dung video cho đến khi Play
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
            {...props}
          />
          {/* Lớp Overlay Poster tĩnh siêu nhẹ để chống chớp đen trứ danh của Chromium khi tab-switch */}
          <div 
             className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
             style={{ backgroundImage: `url(${posterUrl})` }}
          />
        </>
      ) : (
        /* Vòng loading mờ ảo chống giật trong lúc đợi load thẻ video */
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-8 h-8 border-2 border-white/5 border-t-white/30 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
