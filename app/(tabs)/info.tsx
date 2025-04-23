import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { heatwaveData } from "@/data/heatData";
import InfoSection from "@/components/InfoSection";
import { droughtData } from "@/data/droughtData";
import { windstormData } from "@/data/windstormData";
import { snowstormData } from "@/data/snowstormData";
import { dustData } from "@/data/dustData";
import { landslideData } from "@/data/landslideData";
import { earthquakeData } from "@/data/earthquakeData";

export default function Info() {
  const [emergency, setEmergency] = useState<string>("earthquake");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>재난별 행동요령</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={emergency}
          onValueChange={(itemValue, itemIndex) => setEmergency(itemValue)}
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
          <Picker.Item label="홍수" value="flood" style={styles.text_picker} />
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
          <Picker.Item
            label="감염병"
            value="infectious"
            style={styles.text_picker}
          />
          <Picker.Item
            label="화산폭발"
            value="volcano"
            style={styles.text_picker}
          />
        </Picker>
      </View>

      {/* 조건부 렌더링 */}
      {emergency === "earthquake" && (
        <ScrollView>
          <InfoSection
            title="지진 대비 행동요령"
            items={earthquakeData.지진대비}
          />
          <InfoSection
            title="지진 발생시 행동요령"
            items={earthquakeData.지진발생}
          />
          <InfoSection
            title="지진 발생 후 대피 행동요령"
            items={earthquakeData.지진후_대피}
          />
          <InfoSection
            title="지진 시 장소별 행동요령 - 극장/경기장"
            items={earthquakeData.지진장소별_행동요령.극장_경기장}
          />
          <InfoSection
            title="지진 시 장소별 행동요령 - 고층 건물"
            items={earthquakeData.지진장소별_행동요령.고층건물}
          />
          <InfoSection
            title="지진 시 장소별 행동요령 - 엘리베이터"
            items={earthquakeData.지진장소별_행동요령.엘리베이터}
          />
          <InfoSection
            title="지진 시 장소별 행동요령 - 지하철"
            items={earthquakeData.지진장소별_행동요령.지하철}
          />
          <InfoSection
            title="지진 시 장소별 행동요령 - 자동차"
            items={earthquakeData.지진장소별_행동요령.자동차}
          />
          <InfoSection
            title="지진 시 장소별 행동요령 - 실외/산"
            items={earthquakeData.지진장소별_행동요령.실외_산}
          />
          <InfoSection
            title="지진 시 장소별 행동요령 - 바다"
            items={earthquakeData.지진장소별_행동요령.바다}
          />
        </ScrollView>
      )}

      {emergency === "dust" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection title="미세먼지 일반 대비" items={dustData.일반대비} />
          <InfoSection
            title="미세먼지 특보 시 공통 행동요령"
            items={dustData.공통특보대응}
          />
          <InfoSection
            title="영유아 및 어린이 행동요령"
            items={dustData.영유아어린이}
          />
          <InfoSection title="임산부 행동요령" items={dustData.임산부} />
          <InfoSection title="고령자 행동요령" items={dustData.고령자} />
          <InfoSection
            title="호흡기 질환자 행동요령"
            items={dustData.호흡기질환자}
          />
          <InfoSection
            title="심혈관 질환자 행동요령"
            items={dustData.심혈관질환자}
          />
        </ScrollView>
      )}

      {emergency === "heat" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection title="폭염 대비 요령" items={heatwaveData.대비요령} />
          <InfoSection
            title="폭염 발생 시 - 실내"
            items={heatwaveData.발생시_실내}
          />
          <InfoSection
            title="폭염 발생 시 - 실외"
            items={heatwaveData.발생시_실외}
          />
        </ScrollView>
      )}
      {/* 
      {emergency === "typhoon" && (
        <View>
          <Text style={styles.header}>태풍 대비</Text>
          <Text style={styles.contents}>
            창문과 문을 단단히 고정하고, 외출을 삼가세요. 태풍 경로를 확인하고
            안전한 장소로 대피할 준비를 하세요.
          </Text>
        </View>
      )} */}

      {/* {emergency === "downpour" && (
        <View>
          <Text style={styles.header}>호우 대비</Text>
          <Text style={styles.contents}>
            저지대나 침수 위험 지역을 피하세요. 비상용품을 준비하고, 대피 장소를
            미리 확인하세요.
          </Text>
        </View>
      )} */}

      {emergency === "windstorm" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection title="강풍 대비 요령" items={windstormData.강풍대비} />
          <InfoSection
            title="강풍 발생 시 - 실내"
            items={windstormData.발생_실내}
          />
          <InfoSection
            title="강풍 발생 시 - 실외"
            items={windstormData.발생_실외}
          />
          <InfoSection
            title="강풍 발생 시 - 자동차 운전 중"
            items={windstormData.발생_운전중}
          />
          <InfoSection
            title="강풍 발생 후 점검 요령"
            items={windstormData.발생후_점검}
          />
        </ScrollView>
      )}

      {/* {emergency === "flood" && (
        <View>
          <Text style={styles.header}>홍수 대비</Text>
          <Text style={styles.contents}>
            홍수 위험 지역을 피하고, 대피 장소를 미리 확인하세요. 비상용품을
            준비하세요.
          </Text>
        </View>
      )} */}

      {emergency === "landslide" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection title="사고 대비 요령" items={landslideData.사고대비} />
          <InfoSection
            title="주의보 발생 시 - 취약지역 주민"
            items={landslideData.주의보_취약지역}
          />
          <InfoSection
            title="주의보 발생 시 - 일반 시민"
            items={landslideData.주의보_일반시민}
          />
          <InfoSection
            title="경보 발생 시 - 취약지역 주민"
            items={landslideData.경보_취약지역}
          />
          <InfoSection
            title="경보 발생 시 - 일반 시민"
            items={landslideData.경보_일반시민}
          />
        </ScrollView>
      )}

      {emergency === "drought" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="주방 및 세탁 시 물 절약"
            items={droughtData.실내_주방_세탁}
          />
          <InfoSection
            title="화장실 및 욕실 이용 시 물 절약"
            items={droughtData.실내_화장실_욕실}
          />
          <InfoSection title="실외에서의 물 절약" items={droughtData.실외} />
        </ScrollView>
      )}

      {emergency === "snowstorm" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection title="대설 대비 요령" items={snowstormData.대설대비} />
          <InfoSection
            title="대설 발생 시 - 실내"
            items={snowstormData.발생_실내}
          />
          <InfoSection
            title="대설 발생 시 - 실외"
            items={snowstormData.발생_실외}
          />
          <InfoSection
            title="대설 발생 시 - 자동차 운전 중"
            items={snowstormData.발생_운전중}
          />
          <InfoSection
            title="차량 고립 시 행동요령"
            items={snowstormData.차량고립시}
          />
          <InfoSection title="응급처치 요령" items={snowstormData.응급처치} />
        </ScrollView>
      )}

      {/* {emergency === "cold" && (
        <View>
          <Text style={styles.header}>한파 대비</Text>
          <Text style={styles.contents}>
            따뜻한 옷을 입고, 외출 시에는 보온에 신경 쓰세요. 수도관이 얼지
            않도록 미리 점검하고 보온재를 설치하세요.
          </Text>
        </View>
      )} */}

      {/* {emergency === "infectious" && (
        <View>
          <Text style={styles.header}>감염병 대비</Text>
          <Text style={styles.contents}>
            손을 자주 씻고, 마스크를 착용하세요. 감염병 예방 수칙을 준수하세요.
          </Text>
        </View>
      )} */}

      {/* {emergency === "volcano" && (
        <View>
          <Text style={styles.header}>화산폭발 대비</Text>
          <Text style={styles.contents}>
            화산재가 날아올 경우 실내에 머무르고, 외출 시에는 보호 장비를
            착용하세요.
          </Text>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  text_picker: {
    fontWeight: "bold",
  },
  color: {
    marginTop: "-5%",
    backgroundColor: "white",
    height: "100%",
    paddingTop: "10%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
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
    height: 52,
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginBottom: 16,
  },
});
