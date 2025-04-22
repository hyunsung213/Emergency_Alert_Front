import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import Maps from "@/components/Maps";

export default function Home() {
  return (
    <View style={styles.color}>
      <Text>재난 및 대피소</Text>
      <View style={styles.container}>
        <Maps />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    backgroundColor: "#b39cd0",
    height: "100%",
  },
  container: {
    backgroundColor: "#b39cd0",
    height: "65%",
    width: "90%",
    overflow: "hidden",
    borderRadius: "8%",
    marginVertical: "auto",
    marginHorizontal: "auto",
  },
});
