import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import AppHeader from "@/components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "white" }} />
      <AppHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#00896f",
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            backgroundColor: "white", // 탭바 배경색
            borderTopWidth: 1, // 탭바 상단 구분선
            borderTopColor: "#e0e0e0", // 구분선 색상
            position: "absolute", // 탭바를 화면에 고정하지 않음
          },
        }}
      >
        <Tabs.Screen
          name="info"
          options={{
            title: "Info",
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="infocirlceo" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="weather"
          options={{
            title: "Weather",
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="cloudo" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="disaster"
          options={{
            title: "Disaster",
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="warning" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
});
