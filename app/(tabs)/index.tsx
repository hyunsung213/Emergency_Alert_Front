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
import Label from "@/components/label";
import Alert from "@/components/Alert";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import DisasterMessage from "@/components/DisasterMessage";
import Animated from "react-native-reanimated";

export default function Home() {
  const [emergency, setEmergency] = useState<string>("earthquake");

  return (
    <View style={styles.color}>
      <Text style={styles.text}>재난 및 대피소</Text>
      <SafeAreaView style={styles.container}>
        {/* Message bar at the top */}
        <DisasterMessage maxMessages={10} autoScrollInterval={7000} />
      </SafeAreaView>
      <View style={styles.picker}>
        <Picker
          selectedValue={emergency}
          onValueChange={(itemValue, itemIndex) => setEmergency(itemValue)}
        >
          <Picker.Item
            label="지진대피소"
            value="earthquake"
            style={styles.text_picker}
          />
          <Picker.Item
            label="폭염대피소"
            value="heat"
            style={styles.text_picker}
          />
          <Picker.Item
            label="한파대피소"
            value="cold"
            style={styles.text_picker}
          />
          <Picker.Item
            label="미세먼지대피소"
            value="dust"
            style={styles.text_picker}
          />
        </Picker>
      </View>
      <View style={styles.map}>
        <Maps emergency={emergency} />
      </View>
      {/* <Alert /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    marginBottom: "-5%",
    backgroundColor: "white",
    height: "100%",
    paddingTop: "10%",
    alignItems: "center",
  },
  map: {
    backgroundColor: "white",
    height: "60%",
    width: "90%",
    overflow: "hidden",
    borderRadius: "8%",
    margin: "auto",
  },
  picker: {
    marginTop: "5%",
    marginBottom: "-5%",
    width: "90%",
    borderRadius: 50,
    backgroundColor: "white",
  },
  text: {
    width: "90%",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  text_picker: {
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#FFFFFF",
    width: "90%",
  },
});
