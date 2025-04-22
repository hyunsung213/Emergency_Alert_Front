import React, { createContext, useState, useEffect, useContext } from "react";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define supported languages
export type Language = "ko" | "en" | "ja" | "zh" | "auto";

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
  t: (key: string, fallback?: string) => string;
  // Language names for the selector
  languageOptions: { value: Language; label: string }[];
}

// Default translations
const translations: Record<string, Record<string, string>> = {
  en: {
    languageName: "English",
    appTitle: "Emergency Alert",
    settings: "Settings",
    language: "Language",
    autoDetect: "Auto (System)",
    korean: "Korean",
    english: "English",
    japanese: "Japanese",
    chinese: "Chinese",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    error: "Error",
    retry: "Retry",
    // Add more translations as needed
  },
  ko: {
    languageName: "한국어",
    appTitle: "긴급 재난 알림",
    settings: "설정",
    language: "언어",
    autoDetect: "자동 (시스템)",
    korean: "한국어",
    english: "영어",
    japanese: "일본어",
    chinese: "중국어",
    save: "저장",
    cancel: "취소",
    loading: "로딩 중...",
    error: "오류",
    retry: "재시도",
    // Add more translations as needed
  },
  ja: {
    languageName: "日本語",
    appTitle: "緊急アラート",
    settings: "設定",
    language: "言語",
    autoDetect: "自動 (システム)",
    korean: "韓国語",
    english: "英語",
    japanese: "日本語",
    chinese: "中国語",
    save: "保存",
    cancel: "キャンセル",
    loading: "読み込み中...",
    error: "エラー",
    retry: "再試行",
    // Add more translations as needed
  },
  zh: {
    languageName: "中文",
    appTitle: "紧急警报",
    settings: "设置",
    language: "语言",
    autoDetect: "自动 (系统)",
    korean: "韩语",
    english: "英语",
    japanese: "日语",
    chinese: "中文",
    save: "保存",
    cancel: "取消",
    loading: "加载中...",
    error: "错误",
    retry: "重试",
    // Add more translations as needed
  },
};

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: "auto",
  setLanguage: () => {},
  isRTL: false,
  t: (key: string, fallback = "") => fallback,
  languageOptions: [
    { value: "auto", label: "Auto (System)" },
    { value: "ko", label: "한국어" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
    { value: "zh", label: "中文" },
  ],
});

// Storage key
const LANGUAGE_STORAGE_KEY = "user_language_preference";

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("auto");
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize language from storage or device locale
  useEffect(() => {
    async function loadLanguagePreference() {
      try {
        const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (storedLanguage !== null && isValidLanguage(storedLanguage)) {
          setLanguageState(storedLanguage as Language);
        } else {
          // Default to system language or Korean if system language is not supported
          const deviceLanguage = Localization.locale.split("-")[0];
          setLanguageState(
            isValidLanguage(deviceLanguage)
              ? (deviceLanguage as Language)
              : "ko"
          );
        }
      } catch (error) {
        console.error("Failed to load language preference:", error);
        setLanguageState("ko");
      } finally {
        setIsLoaded(true);
      }
    }

    loadLanguagePreference();
  }, []);

  // Validate if a language code is supported
  function isValidLanguage(lang: string): boolean {
    return ["ko", "en", "ja", "zh", "auto"].includes(lang);
  }

  // Set language and save to storage
  const setLanguage = async (newLanguage: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  };

  // Get the effective language (resolves 'auto' to actual language code)
  const getEffectiveLanguage = (): Exclude<Language, "auto"> => {
    if (language === "auto") {
      const deviceLanguage = Localization.locale.split("-")[0];
      return isValidLanguage(deviceLanguage)
        ? (deviceLanguage as Exclude<Language, "auto">)
        : "ko";
    }
    return language as Exclude<Language, "auto">;
  };

  // Translation function
  const t = (key: string, fallback = ""): string => {
    const effectiveLanguage = getEffectiveLanguage();
    return translations[effectiveLanguage]?.[key] || fallback || key;
  };

  // Check if the current language is RTL (for future support of RTL languages)
  const isRTL = false; // None of our current languages are RTL

  // Language options for the selector
  const languageOptions: { value: Language; label: string }[] = [
    { value: "auto", label: t("autoDetect", "Auto (System)") },
    { value: "ko", label: t("korean", "한국어") },
    { value: "en", label: t("english", "English") },
    { value: "ja", label: t("japanese", "日本語") },
    { value: "zh", label: t("chinese", "中文") },
  ];

  // Wait until language is loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isRTL,
        t,
        languageOptions,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
