import apiClient from "./interfaces/apiClient";

// Define supported languages
export type Language = "ko" | "en" | "ja" | "zh" | "auto";

const PAPAGO_LANGUAGE_MAP: Record<Exclude<Language, "auto">, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-CN",
};

interface PapagoTranslationResponse {
  translatedText: string;
}

interface PapagoTranslationRequest {
  text: string;
  targetLang: Exclude<Language, "auto">;
}

export async function getPapagoTranslation(
  text: string,
  targetLang: Exclude<Language, "auto">
) {
  const request: PapagoTranslationRequest = {
    text,
    targetLang: PAPAGO_LANGUAGE_MAP[targetLang] as Exclude<Language, "auto">,
  };

  const data = await apiClient.post<
    PapagoTranslationResponse,
    PapagoTranslationRequest
  >("/papago-api/translate", {
    body: request,
  });

  return data.translatedText;
}
