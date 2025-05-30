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

export const koreanRegionsMap = new Map([
  [
    "서울특별시",
    {
      name: {
        en: "Seoul",
        ja: "ソウル",
        zh: "首尔",
      },
      subregions: {
        en: [
          "Gangnam District",
          "Gangdong District",
          "Gangbuk District",
          "Gangseo District",
          "Gwanak District",
          "Gwangjin District",
          "Guro District",
          "Geumcheon District",
          "Nowon District",
          "Dobong District",
          "Dongdaemun District",
          "Dongjak District",
          "Mapo District",
          "Seodaemun District",
          "Seocho District",
          "Seongdong District",
          "Seongbuk District",
          "Songpa District",
          "Yangcheon District",
          "Yeongdeungpo District",
          "Yongsan District",
          "Eunpyeong District",
          "Jongno District",
          "Jung District",
          "Jungnang District",
        ],
        ja: [
          "江南区",
          "江東区",
          "江北区",
          "江西区",
          "冠岳区",
          "光真区",
          "九老区",
          "衿川区",
          "蘆原区",
          "道峰区",
          "東大門区",
          "東作区",
          "麻浦区",
          "西大門区",
          "西草区",
          "成東区",
          "成北区",
          "松坡区",
          "陽川区",
          "永登浦区",
          "龍山区",
          "恩平区",
          "鍾路区",
          "中区",
          "中浪区",
        ],
        zh: [
          "江南区",
          "江东区",
          "江北区",
          "江西区",
          "冠岳区",
          "光真区",
          "九老区",
          "衿川区",
          "蘆原区",
          "道峰区",
          "东大门区",
          "东作区",
          "麻浦区",
          "西大门区",
          "西草区",
          "成东区",
          "成北区",
          "松坡区",
          "阳川区",
          "永登浦区",
          "龙山区",
          "恩平区",
          "钟路区",
          "中区",
          "中浪区",
        ],
      },
    },
  ],
  [
    "부산광역시",
    {
      name: {
        en: "Busan",
        ja: "釜山",
        zh: "釜山",
      },
      subregions: {
        en: [
          "Gangseo District",
          "Geumjeong District",
          "Nam District",
          "Dong District",
          "Dongnae District",
          "Busanjin District",
          "Buk District",
          "Sasang District",
          "Saha District",
          "Seogu District",
          "Suyeong District",
          "Yeonje District",
          "Yeongdo District",
          "Jung District",
          "Haeundae District",
          "Gijang County",
        ],
        ja: [
          "江西区",
          "金井区",
          "南区",
          "東区",
          "東来区",
          "釜山鎮区",
          "北区",
          "沙上区",
          "沙河区",
          "西区",
          "水泳区",
          "連濟区",
          "永登区",
          "中区",
          "海雲台区",
          "機張郡",
        ],
        zh: [
          "江西区",
          "金井区",
          "南区",
          "东区",
          "东来区",
          "釜山镇区",
          "北区",
          "沙上区",
          "沙河区",
          "西区",
          "水泳区",
          "延济区",
          "永登区",
          "中区",
          "海云台区",
          "机张郡",
        ],
      },
    },
  ],
  [
    "대구광역시",
    {
      name: {
        en: "Daegu",
        ja: "大邱",
        zh: "大邱",
      },
      subregions: {
        en: [
          "Nam District",
          "Dalseo District",
          "Dong District",
          "Buk District",
          "Seo District",
          "Suseong District",
          "Jung District",
          "Dalseong County",
        ],
        ja: [
          "南区",
          "達西区",
          "東区",
          "北区",
          "西区",
          "水星区",
          "中区",
          "達成郡",
        ],
        zh: [
          "南区",
          "达西区",
          "东区",
          "北区",
          "西区",
          "水星区",
          "中区",
          "达成郡",
        ],
      },
    },
  ],
  [
    "인천광역시",
    {
      name: {
        en: "Incheon",
        ja: "インチョン",
        zh: "仁川",
      },
      subregions: {
        en: [
          "Gyeyang District",
          "Namdong District",
          "Dong District",
          "Michuhol District",
          "Bupyeong District",
          "Seogu District",
          "Yeonsu District",
          "Jung District",
          "Ganghwa County",
          "Ongjin County",
        ],
        ja: [
          "계양区",
          "南洞区",
          "東区",
          "美丘区",
          "富平区",
          "西区",
          "延寿区",
          "中区",
          "江華郡",
          "翁津郡",
        ],
        zh: [
          "桂阳区",
          "南洞区",
          "东区",
          "美丘区",
          "富平区",
          "西区",
          "延寿区",
          "中区",
          "江华郡",
          "翁津郡",
        ],
      },
    },
  ],
  [
    "광주광역시",
    {
      name: {
        en: "Gwangju",
        ja: "光州",
        zh: "光州",
      },
      subregions: {
        en: [
          "Gwangsan District",
          "Nam District",
          "Dong District",
          "Buk District",
          "Seo District",
        ],
        ja: ["光山区", "南区", "東区", "北区", "西区"],
        zh: ["光山区", "南区", "东区", "北区", "西区"],
      },
    },
  ],
  [
    "대전광역시",
    {
      name: {
        en: "Daejeon",
        ja: "大田",
        zh: "大田",
      },
      subregions: {
        en: [
          "Daedeok District",
          "Dong District",
          "Seo District",
          "Yuseong District",
          "Jung District",
        ],
        ja: ["大德区", "東区", "西区", "儒城区", "中区"],
        zh: ["大德区", "东区", "西区", "儒城区", "中区"],
      },
    },
  ],
  [
    "울산광역시",
    {
      name: {
        en: "Ulsan",
        ja: "蔚山",
        zh: "蔚山",
      },
      subregions: {
        en: [
          "Nam District",
          "Dong District",
          "Buk District",
          "Jung District",
          "Ulju County",
        ],
        ja: ["南区", "東区", "北区", "中区", "蔚州郡"],
        zh: ["南区", "东区", "北区", "中区", "蔚州郡"],
      },
    },
  ],
  [
    "세종특별자치시",
    {
      name: {
        en: "Sejong",
        ja: "世宗",
        zh: "世宗",
      },
      subregions: {
        en: ["Sejong"],
        ja: ["世宗"],
        zh: ["世宗"],
      },
    },
  ],
  [
    "경기도",
    {
      name: {
        en: "Gyeonggi Province",
        ja: "京畿道",
        zh: "京畿道",
      },
      subregions: {
        en: [
          "Goyang City",
          "Gwacheon City",
          "Gwangmyeong City",
          "Gwangju City",
          "Guri City",
          "Gunpo City",
          "Gimpo City",
          "Namyangju City",
          "Dongducheon City",
          "Bucheon City",
          "Seongnam City",
          "Suwon City",
          "Siheung City",
          "Ansan City",
          "Anseong City",
          "Anyang City",
          "Yangju City",
          "Yeoju City",
          "Osan City",
          "Yongin City",
          "Uiwang City",
          "Uijeongbu City",
          "Icheon City",
          "Paju City",
          "Pyeongtaek City",
          "Pocheon City",
          "Hanam City",
          "Hwaseong City",
          "Gapyeong County",
          "Yangpyeong County",
          "Yeoncheon County",
        ],
        ja: [
          "高陽市",
          "果川市",
          "光明市",
          "光州市",
          "九里市",
          "軍浦市",
          "金浦市",
          "南楊州市",
          "東豆川市",
          "富川市",
          "城南市",
          "水原市",
          "始興市",
          "安山市",
          "安城市",
          "安養市",
          "楊州市",
          "驪州市",
          "烏山市",
          "龍仁市",
          "議政府市",
          "議政府市",
          "利川市",
          "坡州市",
          "平澤市",
          "抱川市",
          "哈南市",
          "化成市",
          "加平郡",
          "楊平郡",
          "延川郡",
        ],
        zh: [
          "高阳市",
          "果川市",
          "光明市",
          "光州市",
          "九里市",
          "军浦市",
          "金浦市",
          "南杨州市",
          "东豆川市",
          "富川市",
          "城南市",
          "水原市",
          "始兴市",
          "安山市",
          "安城市",
          "安阳市",
          "杨州市",
          "丽州市",
          "乌山市",
          "龙仁市",
          "议政府市",
          "议政府市",
          "利川市",
          "坡州市",
          "平泽市",
          "抱川市",
          "哈南市",
          "化成市",
          "加平郡",
          "杨平郡",
          "延川郡",
        ],
      },
    },
  ],
  [
    "강원도",
    {
      name: {
        en: "Gangwon Province",
        ja: "江原道",
        zh: "江原道",
      },
      subregions: {
        en: [
          "Gangneung City",
          "Donghae City",
          "Samcheok City",
          "Sokcho City",
          "Wonju City",
          "Chuncheon City",
          "Taebaek City",
          "Goseong County",
          "Yanggu County",
          "Yangyang County",
          "Yeongwol County",
          "Inje County",
          "Jeongseon County",
          "Cheorwon County",
          "Pyeongchang County",
          "Hongcheon County",
          "Hwacheon County",
          "Hoengseong County",
        ],
        ja: [
          "江陵市",
          "東海市",
          "三陟市",
          "束草市",
          "原州市",
          "春川市",
          "太白市",
          "高城郡",
          "楊九郡",
          "楊陽郡",
          "永華郡",
          "麟蹄郡",
          "禎善郡",
          "鐵原郡",
          "平昌郡",
          "洪川郡",
          "華川郡",
          "橫城郡",
        ],
        zh: [
          "江陵市",
          "东海市",
          "三陟市",
          "束草市",
          "原州市",
          "春川市",
          "太白市",
          "高城郡",
          "杨九郡",
          "杨阳郡",
          "永华郡",
          "麟蹄郡",
          "征善郡",
          "铁原郡",
          "平昌郡",
          "洪川郡",
          "华川郡",
          "横城郡",
        ],
      },
    },
  ],
  [
    "충청북도",
    {
      name: {
        en: "Chungcheongbuk Province",
        ja: "忠清北道",
        zh: "忠清北道",
      },
      subregions: {
        en: [
          "Jecheon City",
          "Cheongju City",
          "Chungju City",
          "Goesan County",
          "Danyang County",
          "Boeun County",
          "Yeongdong County",
          "Okcheon County",
          "Eumseong County",
          "Jeungpyeong County",
          "Jincheon County",
        ],
        ja: [
          "堤川市",
          "清州市",
          "忠州市",
          "槐山郡",
          "丹陽郡",
          "報恩郡",
          "永東郡",
          "沃川郡",
          "音聲郡",
          "增平郡",
          "鎭川郡",
        ],
        zh: [
          "堤川市",
          "清州市",
          "忠州市",
          "槐山郡",
          "丹阳郡",
          "报恩郡",
          "永东郡",
          "沃川郡",
          "音声郡",
          "增平郡",
          "镇川郡",
        ],
      },
    },
  ],
  [
    "충청남도",
    {
      name: {
        en: "Chungcheongnam Province",
        ja: "忠清南道",
        zh: "忠清南道",
      },
      subregions: {
        en: [
          "Gyeryong City",
          "Gongju City",
          "Nonsan City",
          "Dangjin City",
          "Boryeong City",
          "Seosan City",
          "Asan City",
          "Cheonan City",
          "Geumsan County",
          "Buyeo County",
          "Seocheon County",
          "Yesan County",
          "Cheongyang County",
          "Taean County",
          "Hongseong County",
        ],
        ja: [
          "鷄龍市",
          "公州市",
          "論山市",
          "唐津市",
          "保寧市",
          "瑞山市",
          "牙山市",
          "天安市",
          "錦山郡",
          "扶餘郡",
          "瑞川郡",
          "禎祥郡",
          "泰安郡",
          "洪城郡",
        ],
        zh: [
          "鸡龙市",
          "公州市",
          "论山市",
          "唐津市",
          "保宁市",
          "瑞山市",
          "牙山市",
          "天安市",
          "锦山郡",
          "扶余郡",
          "瑞川郡",
          "禎祥郡",
          "泰安郡",
          "洪城郡",
        ],
      },
    },
  ],
  [
    "전라북도",
    {
      name: {
        en: "Jeollabuk Province",
        ja: "全羅北道",
        zh: "全罗北道",
      },
      subregions: {
        en: [
          "Gunsan City",
          "Gimje City",
          "Namwon City",
          "Iksan City",
          "Jeonju City",
          "Jeongeup City",
          "Gochang County",
          "Muju County",
          "Buan County",
          "Sunchang County",
          "Wanju County",
          "Imsil County",
          "Jangsu County",
          "Jinan County",
          "Jangjin County",
        ],
        ja: [
          "群山市",
          "金堤市",
          "南原市",
          "益山市",
          "全州市",
          "井邑市",
          "古昌郡",
          "務州郡",
          "扶安郡",
          "順昌郡",
          "完州郡",
          "臨邑郡",
          "長水郡",
          "鎭安郡",
          "長津郡",
        ],
        zh: [
          "群山市",
          "金堤市",
          "南原市",
          "益山市",
          "全州市",
          "井邑市",
          "古昌郡",
          "务州郡",
          "扶安郡",
          "顺昌郡",
          "完州郡",
          "临邑郡",
          "长水郡",
          "镇安郡",
          "长津郡",
        ],
      },
    },
  ],
  [
    "전라남도",
    {
      name: {
        en: "Jeollanam Province",
        ja: "全羅南道",
        zh: "全罗南道",
      },
      subregions: {
        en: [
          "Gwangyang City",
          "Naju City",
          "Mokpo City",
          "Suncheon City",
          "Yeosu City",
          "Gangjin County",
          "Goheung County",
          "Gokseong County",
          "Gurye County",
          "Damyang County",
          "Muan County",
          "Boseong County",
          "Sinan County",
          "Yeonggwang County",
          "Yeongam County",
          "Wando County",
          "Jangseong County",
          "Jangheung County",
          "Jindo County",
        ],
        ja: [
          "光陽市",
          "羅州市",
          "木浦市",
          "順天市",
          "麗水市",
          "康津郡",
          "高興郡",
          "谷城郡",
          "求禮郡",
          "潭陽郡",
          "務安郡",
          "寶城郡",
          "新安郡",
          "靈光郡",
          "靈岩郡",
          "完島郡",
          "長城郡",
          "長興郡",
          "珍島郡",
        ],
        zh: [
          "光阳市",
          "罗州市",
          "木浦市",
          "顺天市",
          "丽水市",
          "康津郡",
          "高兴郡",
          "谷城郡",
          "求礼郡",
          "潭阳郡",
          "务安郡",
          "宝城郡",
          "新安郡",
          "灵光郡",
          "灵岩郡",
          "完岛郡",
          "长城郡",
          "长兴郡",
          "珍岛郡",
        ],
      },
    },
  ],
  [
    "경상북도",
    {
      name: {
        en: "Gyeongsangbuk Province",
        ja: "慶尚北道",
        zh: "庆尚北道",
      },
      subregions: {
        en: [
          "Gyeongsan City",
          "Gyeongju City",
          "Gumi City",
          "Gimcheon City",
          "Mungyeong City",
          "Sangju City",
          "Andong City",
          "Yeongju City",
          "Yeongcheon City",
          "Pohang City",
          "Goryeong County",
          "Gunwi County",
          "Bonghwa County",
          "Seongju County",
          "Yeongdeok County",
          "Yeongyang County",
          "Yechon County",
          "Ulleung County",
          "Uljin County",
          "Uiseong County",
          "Cheongdo County",
          "Cheongsong County",
          "Chilgok County",
        ],
        ja: [
          "慶山市",
          "慶州市",
          "龜尾市",
          "金泉市",
          "聞慶市",
          "尙州市",
          "安東市",
          "永州市",
          "永川市",
          "浦項市",
          "高靈郡",
          "軍威郡",
          "奉化郡",
          "星州郡",
          "永德郡",
          "永陽郡",
          "禮川郡",
          "鬱陵郡",
          "蔚珍郡",
          "義城郡",
          "淸道郡",
          "靑松郡",
          "七谷郡",
        ],
        zh: [
          "庆山市",
          "庆州市",
          "龟尾市",
          "金泉市",
          "闻庆市",
          "尚州市",
          "安东市",
          "永州市",
          "永川县",
          "浦项市",
          "高灵郡",
          "军威郡",
          "奉化郡",
          "星州郡",
          "永德郡",
          "永阳郡",
          "礼川郡",
          "蔚陵郡",
          "蔚珍郡",
          "义城郡",
          "清道郡",
          "青松郡",
          "七谷郡",
        ],
      },
    },
  ],
  [
    "경상남도",
    {
      name: {
        en: "Gyeongsangnam Province",
        ja: "慶尚南道",
        zh: "庆尚南道",
      },
      subregions: {
        en: [
          "Geoje City",
          "Gimhae City",
          "Miryang City",
          "Sacheon City",
          "Yangsan City",
          "Jinju City",
          "Changwon City",
          "Tongyeong City",
          "Geochang County",
          "Goseong County",
          "Namhae County",
          "Sancheong County",
          "Uiryeong County",
          "Changnyeong County",
          "Hadong County",
          "Haman County",
          "Hamyang County",
          "Hapcheon County",
        ],
        ja: [
          "巨濟市",
          "金海市",
          "密陽市",
          "沙泉市",
          "梁山市",
          "晋州市",
          "昌原市",
          "統營市",
          "居昌郡",
          "高城郡",
          "南海郡",
          "山清郡",
          "義鄉郡",
          "昌寧郡",
          "河東郡",
          "咸安郡",
          "咸陽郡",
          "合川郡",
        ],
        zh: [
          "巨济市",
          "金海市",
          "密阳市",
          "沙泉市",
          "梁山市",
          "晋州市",
          "昌原市",
          "统营市",
          "居昌郡",
          "高城郡",
          "南海郡",
          "山清郡",
          "义乡郡",
          "昌宁郡",
          "河东郡",
          "咸安郡",
          "咸阳郡",
          "合川郡",
        ],
      },
    },
  ],
  [
    "제주특별자치도",
    {
      name: {
        en: "Jeju",
        ja: "済州",
        zh: "济州",
      },
      subregions: {
        en: ["Jeju City", "Seogwipo City"],
        ja: ["済州市", "西帰浦市"],
        zh: ["济州市", "西归浦市"],
      },
    },
  ],
  [
    "전국",
    {
      name: {
        en: "Nationwide",
        ja: "全国",
        zh: "全国",
      },
      subregions: {
        en: [],
        ja: [],
        zh: [],
      },
    },
  ],
]);

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
    loadingAlerts: "Loading disaster alerts...",
    errorSubtext: "Please restart the app or check your internet connection",
    noActiveAlerts: "No active disaster alerts",
    noRegionalAlerts: "No active disaster alerts for the region",
    noNationalAlerts: "No active nationwide disaster alerts",
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
    화산폭발: "Volcanic Eruption",
    비상사태: "State of Emergency",
    민방공: "Civil Defense",
    기타: "Other",
    행동요령: "Guidelines",
    재난별: "By Disaster Type",
    안전행동요령별: "By Safety Guidelines",
    가스안전행동요령: "Gas Safety Guidelines",
    난방안전행동요령: "Heating Safety Guidelines",
    단수안전행동요령: "Water Supply Disruption Safety Guidelines",
    물놀이안전행동요령: "Water Activity Safety Guidelines",
    산행안전행동요령: "Hiking Safety Guidelines",
    승강장안전행동요령: "Platform Safety Guidelines",
    식중독안전행동요령: "Food Poisoning Safety Guidelines",
    식품안전행동요령: "Food Safety Guidelines",
    자전거안전행동요령: "Bicycle Safety Guidelines",
    전기안전행동요령: "Electrical Safety Guidelines",

    // Emergency levels
    안전안내: "Safety Information",
    긴급재난: "Urgent Disaster",
    위급재난: "Critical Emergency",
    위급: "Critical",
    긴급: "Urgent",
    안전: "Safety",
    알림: "Notice",
    주의: "Caution",
    // Region picker translations
    전체: "All",
    selectRegion: "Select Region",
    done: "Done",
    seoul: "Seoul",
    busan: "Busan",
    daegu: "Daegu",
    incheon: "Incheon",
    gwangju: "Gwangju",
    daejeon: "Daejeon",
    ulsan: "Ulsan",
    sejong: "Sejong",
    gyeonggi: "Gyeonggi Province",
    gangwon: "Gangwon Province",
    chungbuk: "North Chungcheong Province",
    chungnam: "South Chungcheong Province",
    jeonbuk: "North Jeolla Province",
    jeonnam: "South Jeolla Province",
    gyeongbuk: "North Gyeongsang Province",
    gyeongnam: "South Gyeongsang Province",
    jeju: "Jeju Island",
    currentLocation: "Current Location",
    //Weather info
    todayWeather: "Today's Weather",
    loadingWeather: "Loading weather information...",
    pleaseWait: "Please wait a moment",
    weatherLoadError: "Unable to load weather information",
    preparingWeatherData: "Preparing weather data...",
    humidity: "Humidity",
    minMaxTemp: "Min/Max",
    precipitationProb: "Precipitation",
    windSpeed: "Wind Speed",
    precipitation: "Rainfall",
    snowfall: "Snowfall",
    wind: "Wind",
    windDirection: "Wind Direction",
    clear: "Clear",
    partlyCloudy: "Partly Cloudy",
    cloudy: "Cloudy",
    none: "None",
    rain: "Rain",
    rainSnow: "Rain/Snow",
    snow: "Snow",
    shower: "Shower",
    drizzle: "Drizzle",
    snowRainDrops: "Rain/Snow Flurries",
    snowFlurry: "Snow Flurries",
    north: "North",
    northEast: "Northeast",
    east: "East",
    southEast: "Southeast",
    south: "South",
    southWest: "Southwest",
    west: "West",
    northWest: "Northwest",
    noInfo: "No Information",
    heavy: "Heavy",
    light: "Light",

    disasterInfo: "Disaster Information",

    emergencyCall: "Emergency Call (119)",
    emergencyCallConfirm: "Emergency Call",
    emergencyCallMessage: "Do you want to make an emergency call to 119?",
    call: "Call",
    ok: "OK",
    cannotMakeCall: "Cannot make phone call",
    callError: "Error occurred while making the call",
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
    loadingAlerts: "재난 경보를 불러오는 중...",
    errorSubtext: "앱을 다시 시작하시거나 인터넷 연결을 확인해주세요.",
    noActiveAlerts: "현재 활성화된 재난 경보가 없습니다",
    noRegionalAlerts: "지역에 활성화된 재난 경보가 없습니다.",
    noNationalAlerts: "전국에 활성화된 재난 경보가 없습니다.",
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
    화산폭발: "화산폭발",
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
    행동요령: "행동요령",
    재난별: "재난별",
    안전행동요령별: "안전행동요령별",
    가스안전행동요령: "가스안전행동요령",
    난방안전행동요령: "난방안전행동요령",
    단수안전행동요령: "단수안전행동요령",
    물놀이안전행동요령: "물놀이안전행동요령",
    산행안전행동요령: "산행안전행동요령",
    승강장안전행동요령: "승강장안전행동요령",
    식중독안전행동요령: "식중독안전행동요령",
    식품안전행동요령: "식품안전행동요령",
    자전거안전행동요령: "자전거안전행동요령",
    전기안전행동요령: "전기안전행동요령",
    // Region picker translations
    전체: "전체",
    selectRegion: "지역 선택",
    done: "완료",
    seoul: "서울특별시",
    busan: "부산광역시",
    daegu: "대구광역시",
    incheon: "인천광역시",
    gwangju: "광주광역시",
    daejeon: "대전광역시",
    ulsan: "울산광역시",
    sejong: "세종특별자치시",
    gyeonggi: "경기도",
    gangwon: "강원도",
    chungbuk: "충청북도",
    chungnam: "충청남도",
    jeonbuk: "전라북도",
    jeonnam: "전라남도",
    gyeongbuk: "경상북도",
    gyeongnam: "경상남도",
    jeju: "제주특별자치도",
    currentLocation: "현재 위치",

    //Weather info
    todayWeather: "오늘의 날씨",
    loadingWeather: "날씨 정보를 불러오는 중...",
    pleaseWait: "잠시만 기다려주세요",
    weatherLoadError: "날씨 정보를 불러올 수 없습니다",
    preparingWeatherData: "날씨 데이터 준비 중...",
    humidity: "습도",
    minMaxTemp: "최저/최고",
    precipitationProb: "강수확률",
    windSpeed: "풍속",
    precipitation: "강수량",
    snowfall: "적설량",
    wind: "바람",
    windDirection: "풍향",
    clear: "맑음",
    partlyCloudy: "구름 많음",
    cloudy: "흐림",
    none: "없음",
    rain: "비",
    rainSnow: "비/눈",
    snow: "눈",
    shower: "소나기",
    drizzle: "빗방울",
    snowRainDrops: "빗방울/눈날림",
    snowFlurry: "눈날림",
    north: "북",
    northEast: "북동",
    east: "동",
    southEast: "남동",
    south: "남",
    southWest: "남서",
    west: "서",
    northWest: "북서",
    noInfo: "정보 없음",
    heavy: "강",
    light: "약",

    disasterInfo: "재난 정보",

    emergencyCall: "긴급 전화 (119)",
    emergencyCallConfirm: "긴급 전화",
    emergencyCallMessage: "119에 긴급 전화를 걸겠습니까?",
    call: "전화",
    ok: "확인",
    cannotMakeCall: "전화를 걸 수 없습니다.",
    callError: "전화 연결 중 오류가 발생했습니다.",
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
    loadingAlerts: "災害警報を読み込んでいます...",
    errorSubtext: "アプリを再起動するか、インターネット接続を確認してください",
    noActiveAlerts: "現在アクティブな災害警報はありません",
    noRegionalAlerts: "{region}地域でアクティブな災害警報はありません",
    noNationalAlerts: "全国でアクティブな災害警報はありません",
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
    화산폭발: "火山噴火",
    가스: "ガス漏れ",
    AI: "AIシステム障害",
    화생방사고: "化学・生物・放射能事故",
    폭동: "暴動",
    테러: "テロ",
    비상사태: "非常事態",
    민방공: "民間防衛",
    기타: "その他",
    행동요령: "ガイドライン",
    재난별: "災害別",
    안전행동요령별: "安全行動要領別",
    가스안전행동요령: "ガス安全行動要領",
    난방안전행동요령: "暖房安全行動要領",
    단수안전행동요령: "断水安全行動要領",
    물놀이안전행동요령: "水遊び安全行動要領",
    산행안전행동요령: "登山安全行動要領",
    승강장안전행동요령: "乗降場安全行動要領",
    식중독안전행동요령: "食中毒安全行動要領",
    식품안전행동요령: "食品安全行動要領",
    자전거안전행동요령: "自転車安全行動要領",
    전기안전행동요령: "電気安全行動要領",

    // Emergency levels
    안전안내: "安全案内",
    긴급재난: "緊急災害",
    위급재난: "危急災害",
    위급: "危急",
    긴급: "緊急",
    안전: "安全",
    알림: "通知",
    주의: "注意",
    // Region picker translations
    전체: "全体",
    selectRegion: "地域を選択",
    done: "完了",
    seoul: "ソウル特別市",
    busan: "釜山広域市",
    daegu: "大邱広域市",
    incheon: "仁川広域市",
    gwangju: "光州広域市",
    daejeon: "大田広域市",
    ulsan: "蔚山広域市",
    sejong: "世宗特別自治市",
    gyeonggi: "京畿道",
    gangwon: "江原道",
    chungbuk: "忠清北道",
    chungnam: "忠清南道",
    jeonbuk: "全羅北道",
    jeonnam: "全羅南道",
    gyeongbuk: "慶尚北道",
    gyeongnam: "慶尚南道",
    jeju: "済州特別自治道",
    currentLocation: "現在位置",

    //Weather info
    todayWeather: "今日の天気",
    loadingWeather: "天気情報を読み込んでいます...",
    pleaseWait: "少々お待ちください",
    weatherLoadError: "天気情報を読み込めません",
    preparingWeatherData: "天気データを準備中...",
    humidity: "湿度",
    minMaxTemp: "最低/最高",
    precipitationProb: "降水確率",
    windSpeed: "風速",
    precipitation: "降水量",
    snowfall: "積雪量",
    wind: "風",
    windDirection: "風向",
    clear: "晴れ",
    partlyCloudy: "曇り時々晴れ",
    cloudy: "曇り",
    none: "なし",
    rain: "雨",
    rainSnow: "雨/雪",
    snow: "雪",
    shower: "にわか雨",
    drizzle: "小雨",
    snowRainDrops: "小雨/小雪",
    snowFlurry: "小雪",
    north: "北",
    northEast: "北東",
    east: "東",
    southEast: "南東",
    south: "南",
    southWest: "南西",
    west: "西",
    northWest: "北西",
    noInfo: "情報なし",
    heavy: "強い",
    light: "弱い",

    disasterInfo: "災害情報",
    emergencyCall: "緊急通報 (119)",
    emergencyCallConfirm: "緊急通報",
    emergencyCallMessage: "119に緊急通報しますか？",
    call: "通報",
    ok: "OK",
    cannotMakeCall: "通話できません",
    callError: "通話中にエラーが発生しました",
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
    loadingAlerts: "正在加载灾害警报...",
    errorSubtext: "请重新启动应用或检查您的互联网连接",
    noActiveAlerts: "目前没有活跃的灾害警报",
    noRegionalAlerts: "地区没有活跃的灾害警报",
    noNationalAlerts: "全国没有活跃的灾害警报",
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
    화산폭발: "火山爆发",
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
    행동요령: "指南",
    재난별: "按灾难类型",
    안전행동요령별: "按安全行动指南",
    가스안전행동요령: "煤气安全行动指南",
    난방안전행동요령: "供暖安全行动指南",
    단수안전행동요령: "断水安全行动指南",
    물놀이안전행동요령: "水上活动安全行动指南",
    산행안전행동요령: "登山安全行动指南",
    승강장안전행동요령: "站台安全行动指南",
    식중독안전행동요령: "食物中毒安全行动指南",
    식품안전행동요령: "食品安全行动指南",
    자전거안전행동요령: "自行车安全行动指南",
    전기안전행동요령: "用电安全行动指南",
    // Emergency levels
    안전안내: "安全指南",
    긴급재난: "紧急灾害",
    위급재난: "危急灾害",
    위급: "危急",
    긴급: "紧急",
    안전: "安全",
    알림: "通知",
    주의: "注意",
    // Region picker translations
    전체: "全部",
    selectRegion: "选择地区",
    done: "完成",
    seoul: "首尔特别市",
    busan: "釜山广域市",
    daegu: "大邱广域市",
    incheon: "仁川广域市",
    gwangju: "光州广域市",
    daejeon: "大田广域市",
    ulsan: "蔚山广域市",
    sejong: "世宗特别自治市",
    gyeonggi: "京畿道",
    gangwon: "江原道",
    chungbuk: "忠清北道",
    chungnam: "忠清南道",
    jeonbuk: "全罗北道",
    jeonnam: "全罗南道",
    gyeongbuk: "庆尚北道",
    gyeongnam: "庆尚南道",
    jeju: "济州特别自治道",
    currentLocation: "当前位置",

    //Weather info
    todayWeather: "今日天气",
    loadingWeather: "正在加载天气信息...",
    pleaseWait: "请稍等片刻",
    weatherLoadError: "无法加载天气信息",
    preparingWeatherData: "正在准备天气数据...",
    humidity: "湿度",
    minMaxTemp: "最低/最高",
    precipitationProb: "降水概率",
    windSpeed: "风速",
    precipitation: "降水量",
    snowfall: "积雪量",
    wind: "风",
    windDirection: "风向",
    clear: "晴朗",
    partlyCloudy: "多云",
    cloudy: "阴天",
    none: "无",
    rain: "雨",
    rainSnow: "雨夹雪",
    snow: "雪",
    shower: "阵雨",
    drizzle: "毛毛雨",
    snowRainDrops: "毛毛雨/飘雪",
    snowFlurry: "飘雪",
    north: "北",
    northEast: "东北",
    east: "东",
    southEast: "东南",
    south: "南",
    southWest: "西南",
    west: "西",
    northWest: "西北",
    noInfo: "无信息",
    heavy: "强",
    light: "弱",

    disasterInfo: "灾害信息",

    emergencyCall: "紧急电话 (119)",
    emergencyCallConfirm: "紧急电话",
    emergencyCallMessage: "您要拨打119紧急电话吗？",
    call: "拨打",
    ok: "确认",
    cannotMakeCall: "无法拨打电话",
    callError: "拨打电话时出错",
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
