/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";

export const ShareToUnlock = ({
  src,
  imgTitle,
  title,
  content,
  description,
  hashtagText,
  shareUrlText,
}: {
  src: string | Blob | undefined;
  imgTitle: string;
  title: string;
  content: React.ReactNode;
  description: string;
  hashtagText: string;
  shareUrlText: string;
}) => {
  const [shared, setShared] = useState(false);
  const [hasCheckedShare, setHasCheckedShare] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [userLink, setUserLink] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasShared = localStorage.getItem("shared_post");
    if (hasShared === "true") setShared(true);
    setHasCheckedShare(true);
  }, []);

  const handleShare = () => {
    const encodedUrl = encodeURIComponent(shareUrlText);
    const hashtagWithHash = hashtagText.startsWith("#")
      ? hashtagText
      : `#${hashtagText}`;
    const encodedHashtag = encodeURIComponent(hashtagWithHash);
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&hashtag=${encodedHashtag}`;

    const popup = window.open(
      fbShareUrl,
      "fbShare",
      "width=1200,height=600,scrollbars=no"
    );
    if (!popup) {
      console.warn("Popup blocked or failed to open");
      return;
    }

    let popupClosed = false;
    const timer = setInterval(() => {
      if (popup.closed && !popupClosed) {
        popupClosed = true;
        clearInterval(timer);
        // show input after 3s
        setTimeout(() => {
          setShowInput(true);
        }, 3000);
      }
    }, 500);
  };

  const handleVerifyLink = () => {
    try {
      new URL(userLink);
      localStorage.setItem("shared_post", "true");
      setShared(true);
      setShowInput(false);
    } catch {
      alert("Invalid URL. Please enter a valid link.");
    }
  };

  if (!hasCheckedShare) return null;

  return (
    <div className="relative w-full h-70 z-9 rounded-2xl overflow-hidden">
      {/* Main image */}
      <div
        className={`relative transition-all duration-500 ${
          shared ? "opacity-100 blur-0" : "opacity-50 blur-sm"
        }`}
      >
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
               <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
               <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
               <p className="text-white/70 mb-6">{description}</p>
               <div className="text-white mb-6 max-h-[60vh] overflow-y-auto">{content}</div>
               <div className="flex justify-end">
                 <button onClick={() => setOpen(false)} className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">Close</button>
               </div>
             </div>
           </div>
        )}
      </div>

      {/* Locked overlay */}
      {!shared && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm gap-4 p-4">
          {!showInput ? (
            <button
              onClick={handleShare}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              🔁 Share to Unlock
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full max-w-xs">
              <input
                type="text"
                placeholder="Paste your shared post URL here"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userLink}
                onChange={(e) => setUserLink(e.target.value)}
              />
              <button
                onClick={handleVerifyLink}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl w-full transition-colors"
              >
                ✅ Verify
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
