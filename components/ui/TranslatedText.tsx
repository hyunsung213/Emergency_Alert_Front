import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  TextStyle,
  StyleProp,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

interface TranslatedTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  showToggle?: boolean;
  initialMode?: "original" | "translated";
  numberOfLines?: number;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({
  text,
  style,
  showToggle = false,
  initialMode = "translated",
  numberOfLines,
}) => {
  const { t, effectiveLanguage } = useLanguage();
  const [showOriginal, setShowOriginal] = useState(initialMode === "original");
  const { translatedText, isTranslating, error } = useTranslation(text);

  // If language is Korean or there's an error, just show the original text
  if (effectiveLanguage === "ko" || error) {
    return (
      <Text style={style} numberOfLines={numberOfLines}>
        {text}
      </Text>
    );
  }

  const displayText = showOriginal ? text : translatedText;

  return (
    <Text
      style={[style, isTranslating && styles.fadedText]}
      numberOfLines={numberOfLines}
    >
      {displayText}
    </Text>
  );
};

const TranslatedTextView: React.FC<TranslatedTextProps> = ({
  text,
  style,
  showToggle = false,
  initialMode = "translated",
  numberOfLines,
}) => {
  const { t, effectiveLanguage } = useLanguage();
  const [showOriginal, setShowOriginal] = useState(initialMode === "original");
  const { translatedText, isTranslating, error } = useTranslation(text);

  // If language is Korean or there's an error, just show the original text
  if (effectiveLanguage === "ko" || error) {
    return (
      <Text style={[styles.text, style]} numberOfLines={numberOfLines}>
        {text}
      </Text>
    );
  }

  const displayText = showOriginal ? text : translatedText;

  return (
    <View style={styles.container}>
      {isTranslating && (
        <ActivityIndicator size="small" color="#0066cc" style={styles.loader} />
      )}

      <Text
        style={[styles.text, style, isTranslating && styles.fadedText]}
        numberOfLines={numberOfLines}
      >
        {displayText}
      </Text>

      {showToggle && text !== translatedText && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowOriginal(!showOriginal)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="translate" size={14} color="#666" />
          <Text style={styles.toggleText}>
            {showOriginal
              ? t("translatedText", "번역된 텍스트")
              : t("originText", "원본 텍스트")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  text: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  fadedText: {
    opacity: 0.7,
  },
  loader: {
    position: "absolute",
    right: 8,
    top: 4,
    zIndex: 1,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 6,
    paddingHorizontal: 10,
    marginTop: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
  toggleText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});

export { TranslatedTextView, TranslatedText };
