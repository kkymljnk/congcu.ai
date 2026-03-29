// app/lib/fonts.ts
import { Oswald } from "next/font/google";

export const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
  weight: ["300", "400", "500", "600", "700"], // Light 300 + Regular 400...
  preload: true,
});
