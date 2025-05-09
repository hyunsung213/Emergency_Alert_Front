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
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const [emergency, setEmergency] = useState<string>("earthquake");
  const { t, effectiveLanguage, language } = useLanguage();

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* Disaster Message */}
      <View style={styles.disasterMessageContainer}>
        <DisasterMessage />
      </View>

      {language === "ko" && (
        <>
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
        </>
      )}

      {language === "en" && (
        <>
          {/* Picker Section */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={emergency}
              onValueChange={(itemValue, itemIndex) => setEmergency(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Earthquake Shelter" value="earthquake" />
              <Picker.Item label="Heatwave Shelter" value="heat" />
              <Picker.Item label="Coldwave Shelter" value="cold" />
              <Picker.Item label="Fine Dust Shelter" value="dust" />
              <Picker.Item label="Flood Shelter" value="flood" />
            </Picker>
          </View>
        </>
      )}

      {language === "ja" && (
        <>
          {/* Picker Section */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={emergency}
              onValueChange={(itemValue, itemIndex) => setEmergency(itemValue)}
              style={styles.picker}
            >
              <Picker.Item
                label="地震避難所 (じしんひなんじょ)"
                value="earthquake"
              />
              <Picker.Item label="熱波避難所 (ねっぱひなんじょ)" value="heat" />
              <Picker.Item label="寒波避難所 (かんぱひなんじょ)" value="cold" />
              <Picker.Item
                label="微細粉塵避難所 (びさいふんじんひなんじょ) "
                value="dust"
              />
              <Picker.Item
                label="水害避難所 (すいがいひなんじょ)"
                value="flood"
              />
            </Picker>
          </View>
        </>
      )}

      {language === "zh" && (
        <>
          {/* Picker Section */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={emergency}
              onValueChange={(itemValue, itemIndex) => setEmergency(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="地震避难所" value="earthquake" />
              <Picker.Item label="热浪避难所" value="heat" />
              <Picker.Item label="寒潮避难所" value="cold" />
              <Picker.Item label="细颗粒物避难所" value="dust" />
              <Picker.Item label="水灾避难所" value="flood" />
            </Picker>
          </View>
        </>
      )}
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
