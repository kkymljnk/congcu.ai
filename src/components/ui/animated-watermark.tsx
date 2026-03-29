import React from 'react';

export function AnimatedWatermark({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 525 74" 
      className={`w-full max-w-full h-auto drop-shadow-md ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient tĩnh nhưng đẹp, bỏ bớt animation chuyển màu để tránh ngốn CPU */}
        <linearGradient id="iconGradient" x1="0" y1="14" x2="101" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B084FF" />
          <stop offset="100%" stopColor="#4FD1C5" />
        </linearGradient>

        <linearGradient id="textGradient" x1="105" y1="10" x2="520" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>

      {/* ICON - Xóa filter mờ (feGaussianBlur) vì đây là tác nhân gây tuột FPS số 1 */}
      <g fill="url(#iconGradient)" opacity="0.6">
        <path d="M50.5683 13.8149C22.6387 13.8149 0 36.8923 0 65.3508H12.9193C12.9193 44.0234 29.643 26.7318 50.5708 26.7318C71.4985 26.7318 88.2222 44.0234 88.2222 65.3508H101.142C101.149 36.8923 78.5029 13.8149 50.5732 13.8149H50.5683Z" />
        <path d="M34.9935 46.5041L27.373 54.1246C26.1956 55.3019 26.1956 57.2108 27.373 58.3881L34.9935 66.0086C36.1708 67.186 38.0797 67.186 39.257 66.0086L46.8775 58.3881C48.0548 57.2108 48.0549 55.3019 46.8775 54.1246L39.257 46.5041C38.0797 45.3268 36.1708 45.3267 34.9935 46.5041Z" opacity="0.8" />
        <path d="M61.8831 46.5041L54.2626 54.1246C53.0853 55.3019 53.0853 57.2108 54.2626 58.3881L61.8832 66.0086C63.0605 67.186 64.9693 67.186 66.1466 66.0086L73.7672 58.3881C74.9445 57.2108 74.9445 55.3019 73.7672 54.1246L66.1467 46.5041C64.9693 45.3268 63.0605 45.3267 61.8831 46.5041Z" opacity="0.8" />
      </g>

      <text
        x="105"
        y="65"
        fill="url(#textGradient)"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="72"
        textLength="400"
        lengthAdjust="spacingAndGlyphs"
        fontWeight="500"
        letterSpacing="-1.6"
        opacity="0.45"
      >
        CONGCU.AI
      </text>
    </svg>
  );
}
