import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPapagoTranslation } from "@/lib/api/papagoAPI";

interface UseTranslationOptions {
  autoTranslate?: boolean;
  delayTranslation?: number;
}

export function useTranslation(
  originalText: string,
  options: UseTranslationOptions = {}
) {
  const { autoTranslate = true, delayTranslation = 0 } = options;
  const { effectiveLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState<string>(originalText);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const translate = useCallback(async () => {
    // Don't translate if the text is empty or language is Korean
    if (!originalText || effectiveLanguage === "ko") {
      setTranslatedText(originalText);
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const result = await getPapagoTranslation(
        originalText,
        effectiveLanguage
      );
      setTranslatedText(result);
    } catch (err) {
      console.error("Translation error:", err);
      setError(err instanceof Error ? err.message : "Translation failed");
      setTranslatedText(originalText); // Fallback to original text
    } finally {
      setIsTranslating(false);
    }
  }, [originalText, effectiveLanguage, delayTranslation]);

  // Translate automatically when the text or language changes
  useEffect(() => {
    if (autoTranslate) {
      translate();
    } else {
      setTranslatedText(originalText);
    }
  }, [originalText, effectiveLanguage, autoTranslate, translate]);

  return {
    translatedText,
    isTranslating: isTranslating,
    error,
    translate,
    originalText,
  };
}
