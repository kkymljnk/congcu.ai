"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "vi";

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    heroLine1: "I Build Custom",
    heroLine2: "AI Tools",
    heroDesc1: "For work. ",
    heroDescBold: "For ideas.",
    heroDesc2: " For everyone.",
    features: "Features",
    pricing: "Pricing",
    contact: "Contact",
    login: "Login",
    btnStart: "Start Connecting",
    btnExplore: "Contact",
  },
  vi: {
    heroLine1: "Thiết Kế & Xây Dựng",
    heroLine2: "Công Cụ AI",
    heroDesc1: "Cho công việc. ",
    heroDescBold: "Cho ý tưởng.",
    heroDesc2: " Cho mọi người.",
    features: "Tính năng",
    pricing: "Bảng giá",
    contact: "Liên hệ",
    login: "Đăng nhập",
    btnStart: "Start Connecting",
    btnExplore: "Contact",
  },
};

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lang") as Language;
    if (saved === "vi" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string) => {
    // Để giữ giao diện ổn định trước khi hydration trên SSR, fallback về default (en) hoặc chuỗi đang có
    if (!mounted) return translations["en"][key] || key;
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    return { lang: "en" as Language, setLang: () => {}, t: (k: string) => k };
  }
  return context;
}
