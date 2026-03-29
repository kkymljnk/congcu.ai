"use client";

import React, { useEffect } from "react";

export function SecurityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Chống Right-Click (Chuột phải) toàn trang web
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Chống các phím tắt Developer Tools (F12, Ctrl+Shift+I, Ctrl+U) để mở Source Code
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u" || e.key === "S" || e.key === "s" || e.key === "P" || e.key === "p"))
      ) {
        e.preventDefault();
      }
    };

    // 3. Chống kéo thả hình ảnh (Drag & Drop) ra ngoài Desktop
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "IMG" || target.tagName === "A" || target.tagName === "SVG")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return <>{children}</>;
}
