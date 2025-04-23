import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/ui/LanguageSelector";

export default function LanguageSettingsScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation();

  // Update the header title when language changes
  useEffect(() => {
    navigation.setOptions({
      title: t("language", "언어"),
    });
  }, [t, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.description}>
            {t(
              "languageDescription",
              "선호하는 언어를 선택하세요. 재난 알림 및 날씨 정보가 선택한 언어로 표시됩니다."
            )}
          </Text>

          <LanguageSelector />

          <Text style={styles.note}>
            {t(
              "languageNote",
              "참고: 일부 재난 경보는 번역 서비스를 통해 제공됩니다. 정확한 정보는 원본 한국어 메시지를 참조하세요."
            )}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 24,
  },
  note: {
    fontSize: 14,
    color: "#777",
    marginTop: 24,
    fontStyle: "italic",
    lineHeight: 20,
  },
});
