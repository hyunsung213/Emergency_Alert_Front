const PAPAGO_CLIENT_ID = "lsfm8h958l";
const PAPAGO_CLIENT_SECRET = "hpoo3x6oiF1eey2RfQCgKpuV8l97aLuYQGYPMjin";

// Define supported languages
export type Language = "ko" | "en" | "ja" | "zh" | "auto";

const PAPAGO_LANGUAGE_MAP: Record<Exclude<Language, "auto">, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-CN",
};

export async function getPapagoTranslation(
  text: string,
  targetLang: Exclude<Language, "auto">
) {
  //   const response = await fetch(
  //     "https://papago.apigw.ntruss.com/nmt/v1/translation",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //         "X-NCP-APIGW-API-KEY-ID": PAPAGO_CLIENT_ID,
  //         "X-NCP-APIGW-API-KEY": PAPAGO_CLIENT_SECRET,
  //       },
  //       body: new URLSearchParams({
  //         source: "ko",
  //         target: PAPAGO_LANGUAGE_MAP[targetLang],
  //         text: text,
  //       }).toString(),
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error(`Papago API error: ${response.status}`);
  //   }

  //   const data = await response.json();

  //   return data.message.result.translatedText;
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
  return "This is a very long sentence that is being used as a placeholder for testing the translation functionality of the Papago API integration in this TypeScript project, and it should help ensure that the system can handle longer text inputs without any issues or errors."; // Placeholder for actual translation
}
