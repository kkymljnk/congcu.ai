/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export const UnlockPost = ({
  src,
  imgTitle,
  title,
  content,
  description,
}: {
  src: string | Blob | undefined;
  imgTitle: string;
  title: string;
  content: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="relative w-full h-70 z-9 rounded-2xl overflow-hidden hover:cursor-pointer group"
      >
        <img
          src={typeof src === "string" ? src : ""}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/60 text-white px-4 py-2 rounded-lg text-lg font-semibold">
            {imgTitle}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setOpen(false)} 
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-white/70 mb-6">{description}</p>
            <div className="text-white mb-6 max-h-[60vh] overflow-y-auto">{content}</div>
            <div className="flex justify-end">
              <button 
                onClick={() => setOpen(false)} 
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
