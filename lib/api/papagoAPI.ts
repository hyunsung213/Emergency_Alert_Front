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
  const random = Math.random();
  if (random < 0.001) {
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
  } else {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
    return "This is a very long sentence that is being used as a placeholder for testing the translation functionality of the Papago API integration in this TypeScript project, and it should help ensure that the system can handle longer text inputs without any issues or errors."; // Placeholder for actual translation
  }
}
