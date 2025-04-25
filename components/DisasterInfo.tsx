import { StyleSheet, View, ScrollView } from "react-native";
import InfoSection from "./InfoSection";
import { earthquakeData } from "@/data/disasterData/earthquakeData";
import { dustData } from "@/data/disasterData/dustData";
import { heatwaveData } from "@/data/disasterData/heatData";
import { typhoonData } from "@/data/disasterData/typhoonData";
import { heavyRainData } from "@/data/disasterData/heavyrainData";
import { windstormData } from "@/data/disasterData/windstormData";
import { floodData } from "@/data/disasterData/floodData";
import { landslideData } from "@/data/disasterData/landslideData";
import { droughtData } from "@/data/disasterData/droughtData";
import { snowstormData } from "@/data/disasterData/snowstormData";
import { coldWaveData } from "@/data/disasterData/coldData";
import { volcanoData } from "@/data/disasterData/volcanoData";

export default function DisasterInfo({ emergency }: { emergency: string }) {
  return (
    <>
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
        <ScrollView>
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
        <ScrollView>
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

      {emergency === "typhoon" && (
        <ScrollView>
          <InfoSection title="태풍·호우 대비" items={typhoonData.대비} />
          <InfoSection
            title="태풍·호우 예보 단계 행동요령"
            items={typhoonData.예보단계}
          />
          <InfoSection
            title="특보 시 실내 행동요령"
            items={typhoonData.특보_실내}
          />
          <InfoSection
            title="특보 시 실외 행동요령"
            items={typhoonData.특보_실외}
          />
          <InfoSection
            title="특보 시 자동차 운전 중 행동요령"
            items={typhoonData.특보_운전중}
          />
        </ScrollView>
      )}

      {emergency === "downpour" && (
        <ScrollView>
          <InfoSection title="호우 대비 요령" items={heavyRainData.대비} />
          <InfoSection
            title="호우 발생 시 실내 행동요령"
            items={heavyRainData.발생_실내}
          />
          <InfoSection
            title="호우 발생 시 자동차 운전 요령"
            items={heavyRainData.발생_자동차}
          />
          <InfoSection
            title="호우 발생 시 실외 행동요령"
            items={heavyRainData.발생_실외}
          />
          <InfoSection
            title="호우 후 복구·안전 요령"
            items={heavyRainData.발생후}
          />
        </ScrollView>
      )}

      {emergency === "windstorm" && (
        <ScrollView>
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

      {emergency === "flood" && (
        <ScrollView>
          <InfoSection title="홍수 대비 요령" items={floodData.홍수대비} />
          <InfoSection
            title="홍수 발생 시 실내 행동요령"
            items={floodData.실내_발생}
          />
          <InfoSection
            title="홍수 발생 시 실외 행동요령"
            items={floodData.실외_발생}
          />
          <InfoSection
            title="자동차 운전 시 주의사항"
            items={floodData.자동차운전}
          />
          <InfoSection title="홍수 이후 행동요령" items={floodData.홍수이후} />
          <InfoSection title="비상 연락처" items={floodData.비상연락처} />
        </ScrollView>
      )}

      {emergency === "landslide" && (
        <ScrollView>
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
        <ScrollView>
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
        <ScrollView>
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

      {emergency === "cold" && (
        <ScrollView>
          <InfoSection title="한파 대비 요령" items={coldWaveData.한파대비} />
          <InfoSection
            title="한파 발생 시 실내 행동요령"
            items={coldWaveData.실내_발생}
          />
          <InfoSection
            title="한파 발생 시 실외 행동요령"
            items={coldWaveData.실외_발생}
          />
          <InfoSection title="한파 시 운동 요령" items={coldWaveData.운동시} />
          <InfoSection
            title="한파 시 자동차 운전 요령"
            items={coldWaveData.운전중}
          />
          <InfoSection
            title="전기 사용 시 주의사항"
            items={coldWaveData.전기사용}
          />
          <InfoSection title="비상 연락처" items={coldWaveData.비상연락처} />
        </ScrollView>
      )}

      {/* {emergency === "infectious" && (
      <View>
        <Text style={styles.header}>감염병 대비</Text>
        <Text style={styles.contents}>
          손을 자주 씻고, 마스크를 착용하세요. 감염병 예방 수칙을 준수하세요.
        </Text>
      </View>
    )} */}

      {emergency === "volcano" && (
        <ScrollView>
          <InfoSection
            title="화산재 낙하 대비 요령"
            items={volcanoData.화산재_낙하_대비}
          />
          <InfoSection
            title="화산재 낙하 중 행동요령"
            items={volcanoData.화산재_낙하_중}
          />
          <InfoSection
            title="화산재 낙하 후 청소 요령"
            items={volcanoData.화산재_낙하_후}
          />
          <InfoSection
            title="자동차 운전 시 주의사항"
            items={volcanoData.자동차_운전}
          />
          <InfoSection
            title="왜 화산재를 청소해야 할까요?"
            items={volcanoData.왜_화산재를_청소해야_할까}
          />
          <InfoSection title="비상 연락처" items={volcanoData.비상연락처} />
        </ScrollView>
      )}
    </>
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
    marginBottom: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginBottom: 16,
  },
});
