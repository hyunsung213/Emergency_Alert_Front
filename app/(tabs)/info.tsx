import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { heatwaveData } from "@/data/disasterData/heatData";
import InfoSection from "@/components/InfoSection";
import { droughtData } from "@/data/disasterData/droughtData";
import { windstormData } from "@/data/disasterData/windstormData";
import { snowstormData } from "@/data/disasterData/snowstormData";
import { dustData } from "@/data/disasterData/dustData";
import { landslideData } from "@/data/disasterData/landslideData";
import { earthquakeData } from "@/data/disasterData/earthquakeData";
import { typhoonData } from "@/data/disasterData/typhoonData";
import { coldWaveData } from "@/data/disasterData/coldData";
import { heavyRainData } from "@/data/disasterData/heavyrainData";
import { floodData } from "@/data/disasterData/floodData";
import { volcanoData } from "@/data/disasterData/volcanoData";
import DisasterInfo from "@/components/DisasterInfo";
import SafetyInfo from "@/components/SafetyInfo";

export default function Info() {
  const [emergency, setEmergency] = useState<string>("earthquake");
  const [safety, setSafety] = useState<string>("gasSafety");
  const [select, setSelect] = useState<Number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/instructions.png")}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>행동요령</Text>
      </View>

      {/* 두 개의 Picker를 Row로 정렬 */}
      <View style={styles.rowPickerContainer}>
        {/* 재난별 Picker */}
        <View style={styles.pickerContainer}>
          <View style={styles.labelContainer}>
            <Image
              source={require("../../assets/images/disaster.png")}
              style={styles.icon}
            />
            <Text style={styles.pickerLabel}>재난별</Text>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={emergency}
              onValueChange={(itemValue, itemIndex) => {
                setEmergency(itemValue);
                setSelect(0);
              }}
              style={styles.picker}
            >
              <Picker.Item label="지진" value="earthquake" />
              <Picker.Item label="미세먼지 • 황사" value="dust" />
              <Picker.Item label="폭염" value="heat" />
              <Picker.Item label="태풍" value="typhoon" />
              <Picker.Item label="호우" value="downpour" />
              <Picker.Item label="강풍" value="windstorm" />
              <Picker.Item label="홍수" value="flood" />
              <Picker.Item label="산사태" value="landslide" />
              <Picker.Item label="가뭄" value="drought" />
              <Picker.Item label="대설" value="snowstorm" />
              <Picker.Item label="한파" value="cold" />
              <Picker.Item label="화산폭발" value="volcano" />
            </Picker>
          </View>
        </View>

        {/* 안전행동요령 Picker */}
        <View style={styles.pickerContainer}>
          <View style={styles.labelContainer}>
            <Image
              source={require("../../assets/images/safety.png")}
              style={styles.icon}
            />
            <Text style={styles.pickerLabel}>안전행동요령별</Text>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={safety}
              onValueChange={(itemValue, itemIndex) => {
                setSafety(itemValue);
                setSelect(1);
              }}
              style={styles.picker}
            >
              <Picker.Item label="가스안전 행동요령" value="gasSafety" />
              <Picker.Item label="난방안전 행동요령" value="heatingSafety" />
              <Picker.Item
                label="단수안전 행동요령"
                value="waterOutageSafety"
              />
              <Picker.Item
                label="물놀이안전 행동요령"
                value="waterPlaySafety"
              />
              <Picker.Item
                label="산행안전 행동요령"
                value="mountainHikingSafety"
              />
              <Picker.Item label="승강장안전 행동요령" value="platformSafety" />
              <Picker.Item
                label="식중독안전 행동요령"
                value="foodPoisoningSafety"
              />
              <Picker.Item label="식품안전 행동요령" value="foodSafety" />
              <Picker.Item label="자전거안전 행동요령" value="bicycleSafety" />
              <Picker.Item label="전기안전 행동요령" value="electricalSafety" />
            </Picker>
          </View>
        </View>
      </View>

      {/* DisasterInfo와 SafetyInfo */}
      <View style={styles.infoContainer}>
        {select === 0 && <DisasterInfo emergency={emergency} />}
        {select === 1 && <SafetyInfo safety={safety} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
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
  rowPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  pickerWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  picker: {
    height: 52,
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    marginTop: 16,
  },
});
