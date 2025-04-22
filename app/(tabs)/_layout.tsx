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

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <AppHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
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
              <AntDesign size={28} name="cloud" color={color} />
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
          name="user"
          options={{
            title: "User",
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="user" color={color} />
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
  },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
});
