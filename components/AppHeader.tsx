import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import LanguageSelector from "./ui/LanguageSelector";

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showLanguageSelector?: boolean;
  showSettings?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton = false,
  showLanguageSelector = true,
  showSettings = true,
}) => {
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Determine the header title
  const headerTitle = title || t("appTitle", "긴급 재난 알림");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={colorScheme === "dark" ? "light" : "light"} />
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} />
            </TouchableOpacity>
          )}
          <Text style={styles.title} numberOfLines={1}>
            {headerTitle}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          {showLanguageSelector && <LanguageSelector compact />}
          {showSettings && (
            <TouchableOpacity
              style={styles.iconButton}
              //   onPress={() => router.push("/settings")}
            >
              <MaterialIcons name="settings" size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    zIndex: 1000,
  },
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});

export default AppHeader;
