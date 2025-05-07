import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import Maps from "@/components/Maps";
import Alert from "@/components/Alert";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import DisasterMessage from "@/components/DisasterMessage";
import Animated from "react-native-reanimated";

export default function Home() {
  const [emergency, setEmergency] = useState<string>("earthquake");

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* Disaster Message */}
      <View style={styles.disasterMessageContainer}>
        <DisasterMessage />
      </View>
      {/* Picker Section */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={emergency}
          onValueChange={(itemValue, itemIndex) => setEmergency(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="지진대피소" value="earthquake" />
          <Picker.Item label="폭염대피소" value="heat" />
          <Picker.Item label="한파대피소" value="cold" />
          <Picker.Item label="미세먼지대피소" value="dust" />
          <Picker.Item label="수해대피소" value="flood" />
        </Picker>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <Maps emergency={emergency} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  picker: {
    height: 50,
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 5,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disasterMessageContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16, // Picker와 이격
    padding: 12,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
