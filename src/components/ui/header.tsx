"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GhostLogo } from "@/components/ui/GhostLogo";
import { useLanguage } from "@/components/ui/LanguageContext";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header id="app-navbar" className="fixed inset-x-0 top-0 z-[100] bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none pb-8 transition-opacity duration-500">
      {/* Toggle: peer để điều khiển overlay & aside */}
      <input
        id="nav-toggle"
        type="checkbox"
        className="peer hidden"
        defaultChecked={false}
        suppressHydrationWarning
        autoComplete="off"
      />

      {/* NAV (gradient seamlessly fading, pointer events auto since header is none) */}
      <nav
        className="mx-auto max-w-7xl h-20 px-4 sm:px-6 lg:px-8 flex items-center pointer-events-auto"
        style={{ fontWeight: 400 }}
      >
        {/* Logo trái */}
        <Link href="/" className="flex items-center gap-1 shrink-0 group transition-transform duration-300 hover:scale-105 active:scale-95">
          <GhostLogo className="text-foreground w-7 h-auto transition-colors" />
          <div className="flex font-[var(--font-ft-regola)] tracking-tight text-[1.3rem] leading-none whitespace-nowrap select-none font-extrabold uppercase transition-colors">
            <span className="text-foreground">
              CONGCU
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 animate-text-gradient bg-clip-text text-transparent">
              .AI
            </span>
          </div>
        </Link>

        <ul className="ml-auto hidden lg:flex items-center gap-8 text-foreground/90 font-normal">
          <li><a href="#features" className="hover:text-foreground transition">{t('features')}</a></li>
          <li><a href="#pricing"  className="hover:text-foreground transition">{t('pricing')}</a></li>
          <li><a href="#contact"  className="hover:text-foreground transition">{t('contact')}</a></li>
        </ul>

        <div className="ml-4 hidden lg:flex items-center gap-3">

          {mounted && (
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="flex items-center justify-center w-9 h-9 rounded-full ring-1 ring-border bg-background hover:bg-muted transition-colors font-bold text-sm shrink-0"
              aria-label="Toggle Language"
            >
              {lang === 'en' ? 'VI' : 'EN'}
            </button>
          )}
        </div>

        <label
          htmlFor="nav-toggle"
          aria-label="Open menu"
          aria-controls="mobile-panel"
          className="ml-auto lg:ml-3 inline-flex lg:hidden items-center justify-center
                     w-10 h-10 text-white/90 opacity-80 hover:opacity-100 transition-opacity font-normal"
        >
          <span className="text-xl leading-none">≡</span>
        </label>
      </nav>

      {/* Overlay (sibling của input peer) */}
      <div className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[1px]
                      hidden peer-checked:block z-[900] pointer-events-auto" />

      <aside
        id="mobile-panel"
        className="
          lg:hidden fixed top-0 right-0 h-screen w-72 translate-x-full peer-checked:translate-x-0
          transition-transform duration-300 bg-[#0B0B0B]/80 backdrop-blur-3xl
          border-l border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]
          z-[1000] overflow-y-auto overscroll-contain pointer-events-auto
        "
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-[#0B0B0B]/60 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-1 group transition-transform duration-300 hover:scale-105 active:scale-95">
            <GhostLogo className="text-foreground w-6 h-auto transition-colors" />
            <div className="flex font-[var(--font-ft-regola)] text-[1.1rem] leading-none whitespace-nowrap font-extrabold tracking-tight uppercase transition-colors">
              <span className="text-foreground">
                CONGCU
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 animate-text-gradient bg-clip-text text-transparent">
                .AI
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
                className="flex items-center justify-center w-9 h-9 rounded-full ring-1 ring-border bg-background hover:bg-muted transition-colors font-bold text-sm shrink-0"
                aria-label="Toggle Language"
              >
                {lang === 'en' ? 'VI' : 'EN'}
              </button>
            )}
            <label
              htmlFor="nav-toggle"
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-9 h-9 text-foreground/80 opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90" aria-hidden="true">
                <path d="M6 6l12 12M18 6l-12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </label>
          </div>
        </div>

        <ul className="px-4 py-4 space-y-2 text-white/90 font-normal">
          <li><a href="#features" className="flex items-center gap-3 py-3 px-2 opacity-70 hover:opacity-100 transition-opacity"><span className="text-base">Features</span></a></li>
          <li><a href="#pricing"  className="flex items-center gap-3 py-3 px-2 opacity-70 hover:opacity-100 transition-opacity"><span className="text-base">Pricing</span></a></li>
          <li><a href="#contact"  className="flex items-center gap-3 py-3 px-2 opacity-70 hover:opacity-100 transition-opacity"><span className="text-base">Contact</span></a></li>
        </ul>

      </aside>
    </header>
  );
}
