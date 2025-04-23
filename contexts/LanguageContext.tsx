import React, { createContext, useState, useEffect, useContext } from "react";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPapagoTranslation, Language } from "@/lib/api/papagoAPI";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
  t: (key: string, fallback?: string) => string;
  languageOptions: { value: Language; label: string }[];
  effectiveLanguage: Exclude<Language, "auto">;
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
    translating: "Translating...",
    translationFailed: "Translation failed",
    originText: "Original Text",
    translatedText: "Translated Text",
    alert: "Alert",
    weatherInfo: "Weather Information",
    region: "Region",
    nationwide: "Nationwide",
    disasterAlerts: "Disaster Alerts",
    translateAlerts: "Translate Alerts",
    // Disaster types
    notification: "Disaster Alert",
    태풍: "Typhoon",
    건조: "Dry Conditions",
    산불: "Wildfire",
    산사태: "Landslide",
    홍수: "Flood",
    호우: "Heavy Rain",
    폭염: "Heat Wave",
    안개: "Fog",
    풍랑: "High Waves",
    미세먼지: "Fine Dust",
    대조기: "Spring Tide",
    가뭄: "Drought",
    대설: "Heavy Snow",
    지진해일: "Tsunami",
    지진: "Earthquake",
    한파: "Cold Wave",
    황사: "Yellow Dust",
    강풍: "Strong Wind",
    교통통제: "Traffic Control",
    화재: "Fire",
    붕괴: "Collapse",
    폭발: "Explosion",
    교통사고: "Traffic Accident",
    환경오염사고: "Environmental Pollution",
    에너지: "Energy Crisis",
    통신: "Telecommunications",
    교통: "Transportation",
    금융: "Financial System",
    의료: "Medical System",
    수도: "Water Supply",
    전염병: "Epidemic",
    정전: "Power Outage",
    가스: "Gas Leak",
    AI: "AI System",
    화생방사고: "Chemical/Biological Accident",
    폭동: "Riot",
    테러: "Terrorism",
    비상사태: "State of Emergency",
    민방공: "Civil Defense",
    기타: "Other",
    // Emergency levels
    안전안내: "Safety Information",
    긴급재난: "Urgent Disaster",
    위급재난: "Critical Emergency",
    위급: "Critical",
    긴급: "Urgent",
    안전: "Safety",
    알림: "Notice",
    주의: "Caution",
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
    translating: "번역 중...",
    translationFailed: "번역 실패",
    originText: "원본 텍스트",
    translatedText: "번역된 텍스트",
    alert: "알림",
    weatherInfo: "날씨 정보",
    region: "지역",
    nationwide: "전국",
    disasterAlerts: "재난 경보",
    translateAlerts: "재난 경보 번역",
    // Disaster types
    notification: "재난 알림",
    태풍: "태풍",
    건조: "건조",
    산불: "산불",
    산사태: "산사태",
    홍수: "홍수",
    호우: "호우",
    폭염: "폭염",
    안개: "안개",
    풍랑: "풍랑",
    미세먼지: "미세먼지",
    대조기: "대조기",
    가뭄: "가뭄",
    대설: "대설",
    지진해일: "지진해일",
    지진: "지진",
    한파: "한파",
    황사: "황사",
    강풍: "강풍",
    교통통제: "교통통제",
    화재: "화재",
    붕괴: "붕괴",
    폭발: "폭발",
    교통사고: "교통사고",
    환경오염사고: "환경오염사고",
    에너지: "에너지",
    통신: "통신",
    교통: "교통",
    금융: "금융",
    의료: "의료",
    수도: "수도",
    전염병: "전염병",
    정전: "정전",
    가스: "가스",
    AI: "AI",
    화생방사고: "화생방 사고",
    폭동: "폭동",
    테러: "테러",
    비상사태: "비상사태",
    민방공: "민방공",
    기타: "기타",
    안전안내: "안전 안내",
    긴급재난: "긴급재난",
    위급재난: "위급재난",
    위급: "위급",
    긴급: "긴급",
    안전: "안전",
    알림: "알림",
    주의: "주의",
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
    translating: "翻訳中...",
    translationFailed: "翻訳に失敗しました",
    originText: "原文",
    translatedText: "翻訳されたテキスト",
    alert: "アラート",
    weatherInfo: "天気情報",
    region: "地域",
    nationwide: "全国",
    disasterAlerts: "災害警報",
    translateAlerts: "災害警報の翻訳",
    // Disaster types
    notification: "災害警報",
    태풍: "台風",
    건조: "乾燥",
    산불: "山火事",
    산사태: "地滑り",
    홍수: "洪水",
    호우: "豪雨",
    폭염: "熱波",
    안개: "霧",
    풍랑: "高波",
    미세먼지: "微細粉塵",
    대조기: "大潮",
    가뭄: "干ばつ",
    대설: "大雪",
    지진해일: "津波",
    지진: "地震",
    한파: "寒波",
    황사: "黄砂",
    강풍: "強風",
    교통통제: "交通規制",
    화재: "火災",
    붕괴: "崩壊",
    폭발: "爆発",
    교통사고: "交通事故",
    환경오염사고: "環境汚染事故",
    에너지: "エネルギー危機",
    통신: "通信障害",
    교통: "交通障害",
    금융: "金融システム障害",
    의료: "医療システム障害",
    수도: "水道障害",
    전염병: "感染症",
    정전: "停電",
    가스: "ガス漏れ",
    AI: "AIシステム障害",
    화생방사고: "化学・生物・放射能事故",
    폭동: "暴動",
    테러: "テロ",
    비상사태: "非常事態",
    민방공: "民間防衛",
    기타: "その他",
    // Emergency levels
    안전안내: "安全案内",
    긴급재난: "緊急災害",
    위급재난: "危急災害",
    위급: "危急",
    긴급: "緊急",
    안전: "安全",
    알림: "通知",
    주의: "注意",
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
    translating: "翻译中...",
    translationFailed: "翻译失败",
    originText: "原文",
    translatedText: "翻译文本",
    alert: "警报",
    weatherInfo: "天气信息",
    region: "地区",
    nationwide: "全国",
    disasterAlerts: "灾害警报",
    translateAlerts: "翻译灾害警报",
    // Disaster types
    // Disaster types
    notification: "灾害警报",
    태풍: "台风",
    건조: "干燥",
    산불: "山火",
    산사태: "山崩",
    홍수: "洪水",
    호우: "暴雨",
    폭염: "热浪",
    안개: "雾",
    풍랑: "风浪",
    미세먼지: "细颗粒物",
    대조기: "大潮",
    가뭄: "干旱",
    대설: "暴雪",
    지진해일: "海啸",
    지진: "地震",
    한파: "寒潮",
    황사: "黄沙",
    강풍: "强风",
    교통통제: "交通管制",
    화재: "火灾",
    붕괴: "坍塌",
    폭발: "爆炸",
    교통사고: "交通事故",
    환경오염사고: "环境污染事故",
    에너지: "能源危机",
    통신: "通信中断",
    교통: "交通中断",
    금융: "金融系统",
    의료: "医疗系统",
    수도: "供水系统",
    전염병: "传染病",
    정전: "停电",
    가스: "煤气泄漏",
    AI: "人工智能系统",
    화생방사고: "化学/生物/辐射事故",
    폭동: "暴乱",
    테러: "恐怖袭击",
    비상사태: "紧急状态",
    민방공: "民防",
    기타: "其他",
    // Emergency levels
    안전안내: "安全指南",
    긴급재난: "紧急灾害",
    위급재난: "危急灾害",
    위급: "危急",
    긴급: "紧急",
    안전: "安全",
    알림: "通知",
    주의: "注意",
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
  effectiveLanguage: "ko",
});

// Storage key
const LANGUAGE_STORAGE_KEY = "user_language_preference";
const TRANSLATION_CACHE_KEY = "translation_cache";

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("auto");
  const [isLoaded, setIsLoaded] = useState(false);
  const [translationCache, setTranslationCache] = useState<
    Record<string, { text: string; timestamp: number }>
  >({});
  const [isTranslating, setIsTranslating] = useState(false);

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

        // Load translation cache
        const cachedTranslations = await AsyncStorage.getItem(
          TRANSLATION_CACHE_KEY
        );
        if (cachedTranslations) {
          try {
            const parsedCache = JSON.parse(cachedTranslations);
            setTranslationCache(parsedCache);
          } catch (e) {
            console.error("Error parsing translation cache:", e);
            // If cache is corrupted, start with an empty cache
            setTranslationCache({});
          }
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

  // The current effective language
  const effectiveLanguage = getEffectiveLanguage();

  // Translation function for UI elements
  const t = (key: string, fallback = ""): string => {
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
        effectiveLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
