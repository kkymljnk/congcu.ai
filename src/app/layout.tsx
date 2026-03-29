import "./globals.css";
import type { Metadata, Viewport } from "next";
import { inter, outfit } from "./fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/ui/LanguageContext";
import { SecurityWrapper } from "@/components/ui/SecurityWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import { encodeImageUrl } from "@/utils/imageObfuscator";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.domain,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.images.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.images.ogImage],
    creator: "@congcuai",
  },
  icons: {
    icon: siteConfig.images.favicon,
    shortcut: siteConfig.images.favicon,
    apple: siteConfig.images.favicon,
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* preload obfuscated routes */}
        <link rel="preload" href={encodeImageUrl(siteConfig.images.logoLight)} as="image" />
        <link rel="preload" href={encodeImageUrl(siteConfig.images.heroBackground)} as="image" />
      </head>
      <body className="antialiased font-[var(--font-inter)] transition-colors duration-300 overflow-x-hidden">
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SecurityWrapper>
              <SmoothScroll>
                {children}
              </SmoothScroll>
            </SecurityWrapper>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>

  );
}
