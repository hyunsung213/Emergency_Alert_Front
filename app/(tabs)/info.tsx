import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
      <Text style={styles.header}>재난별 행동요령</Text>

      <View style={styles.rowPickerContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={emergency}
            onValueChange={(itemValue, itemIndex) => {
              setEmergency(itemValue);
              setSelect(0);
            }}
            style={styles.picker}
          >
            <Picker.Item
              label="지진"
              value="earthquake"
              style={styles.text_picker}
            />
            <Picker.Item
              label="미세먼지 • 황사"
              value="dust"
              style={styles.text_picker}
            />
            <Picker.Item label="폭염" value="heat" style={styles.text_picker} />
            <Picker.Item
              label="태풍"
              value="typhoon"
              style={styles.text_picker}
            />
            <Picker.Item
              label="호우"
              value="downpour"
              style={styles.text_picker}
            />
            <Picker.Item
              label="강풍"
              value="windstorm"
              style={styles.text_picker}
            />
            <Picker.Item
              label="홍수"
              value="flood"
              style={styles.text_picker}
            />
            <Picker.Item
              label="산사태"
              value="landslide"
              style={styles.text_picker}
            />
            <Picker.Item
              label="가뭄"
              value="drought"
              style={styles.text_picker}
            />
            <Picker.Item
              label="대설"
              value="snowstorm"
              style={styles.text_picker}
            />
            <Picker.Item label="한파" value="cold" style={styles.text_picker} />
            {/* <Picker.Item
            label="감염병"
            value="infectious"
            style={styles.text_picker}
          /> */}
            <Picker.Item
              label="화산폭발"
              value="volcano"
              style={styles.text_picker}
            />
          </Picker>
        </View>

        {/* 안전행동요령 */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={safety}
            onValueChange={(itemValue, itemIndex) => {
              setSafety(itemValue);
              setSelect(1);
            }}
            style={styles.picker}
          >
            <Picker.Item
              label="가스안전 행동요령"
              value="gasSafety"
              style={styles.text_picker}
            />
            <Picker.Item
              label="난방안전 행동요령"
              value="heatingSafety"
              style={styles.text_picker}
            />
            <Picker.Item
              label="단수안전 행동요령"
              value="waterOutageSafety"
              style={styles.text_picker}
            />
            <Picker.Item
              label="물놀이안전 행동요령"
              value="waterPlaySafety"
              style={styles.text_picker}
            />
            <Picker.Item
              label="산행안전 행동요령"
              value="mountainHikingSafety"
              style={styles.text_picker}
            />
            <Picker.Item
              label="승강장안전 행동요령"
              value="platformSafety"
              style={styles.text_picker}
            />
            <Picker.Item
              label="식중독안전 행동요령"
              value="foodPoisoningSafety"
              style={styles.text_picker}
            />
            <Picker.Item
              label="식품안전 행동요령"
              value="foodSafety"
              style={styles.text_picker}
            />
            <Picker.Item
              label="자전거안전 행동요령"
              value="bicycleSafety"
              style={styles.text_picker}
            />
            <Picker.Item
              label="전기안전 행동요령"
              value="electricalSafety"
              style={styles.text_picker}
            />
          </Picker>
        </View>
      </View>
      {select === 0 && <DisasterInfo emergency={emergency} />}
      {select === 1 && <SafetyInfo safety={safety} />}
    </View>
  );
}

const styles = StyleSheet.create({
  text_picker: {
    fontWeight: "bold",
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
    flexDirection: "row", // Row 정렬
    justifyContent: "space-between", // Pickers 간격 조정
    marginBottom: 16,
  },
  pickerWrapper: {
    flex: 1, // 각 Picker가 동일한 너비를 가짐
    marginHorizontal: 8, // Pickers 간의 간격
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  picker: {
    height: 52,
    fontSize: 16,
  },
});
