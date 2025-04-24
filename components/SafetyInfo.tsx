import { ScrollView, StyleSheet } from "react-native";
import InfoSection from "./InfoSection";
import { gasSafetyData } from "@/data/safetyData.ts/gasSafetyData";
import { heatingSafetyData } from "@/data/safetyData.ts/heatingSafetyData";
import { waterOutageData } from "@/data/safetyData.ts/waterOutageData";
import { waterPlaySafetyData } from "@/data/safetyData.ts/waterPlaySafetyData";
import { mountainHikingData } from "@/data/safetyData.ts/mountainHikingData";
import { platformSafetyData } from "@/data/safetyData.ts/platformSafetyData";
import { foodPoisoningData } from "@/data/safetyData.ts/foodPoisoningData";
import { foodSafetyData } from "@/data/safetyData.ts/foodSafetyData";
import { bicycleSafetyData } from "@/data/safetyData.ts/bicycleSafetyData";
import { electricalAccidentData } from "@/data/safetyData.ts/electricalAccidentData";

export default function SafetyInfo({ safety }: { safety: string }) {
  return (
    <>
      {safety === "gasSafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="가스시설 설치 요령"
            items={gasSafetyData.가스시설_설치}
          />
          <InfoSection
            title="가스누출 점검 요령"
            items={gasSafetyData.가스누출_점검}
          />
          <InfoSection
            title="가스레인지 사용 요령"
            items={gasSafetyData.가스레인지_사용}
          />
          <InfoSection
            title="휴대용 가스레인지 사용 요령"
            items={gasSafetyData.휴대용_가스레인지}
          />
          <InfoSection
            title="계절별 가스 안전관리"
            items={gasSafetyData.계절별_관리}
          />
          <InfoSection
            title="가스 누출 사고 발생 시"
            items={gasSafetyData.가스누출_사고}
          />
          <InfoSection
            title="가스사고 응급처치"
            items={gasSafetyData.가스사고_응급처치}
          />
          <InfoSection title="비상 연락처" items={gasSafetyData.비상연락처} />
        </ScrollView>
      )}
      {safety === "heatingSafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="보일러 안전 사용법"
            items={heatingSafetyData.보일러}
          />
          <InfoSection
            title="전기난로 사용 주의사항"
            items={heatingSafetyData.전기난로}
          />
          <InfoSection
            title="전기·온수매트 사용법"
            items={heatingSafetyData.전기매트_온수매트}
          />
          <InfoSection
            title="저온화상 응급처치"
            items={heatingSafetyData.응급처치}
          />
        </ScrollView>
      )}
      {safety === "waterOutageSafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="단수 대비 요령"
            items={waterOutageData.단수_대비}
          />
          <InfoSection
            title="단수 발생 시 행동요령"
            items={waterOutageData.단수_발생}
          />
          <InfoSection title="비상 연락처" items={waterOutageData.비상연락처} />
        </ScrollView>
      )}
      {safety === "waterPlaySafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="물놀이 전 준비사항"
            items={waterPlaySafetyData.물놀이_전}
          />
          <InfoSection
            title="물놀이 중 주의사항"
            items={waterPlaySafetyData.물놀이_중}
          />
          <InfoSection
            title="물놀이 후 정리사항"
            items={waterPlaySafetyData.물놀이_후}
          />
          <InfoSection
            title="사고 발생 시 대처법"
            items={waterPlaySafetyData.사고_대처}
          />
        </ScrollView>
      )}
      {safety === "mountainHikingSafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="산행 전 준비사항"
            items={mountainHikingData.산행_전}
          />
          <InfoSection
            title="산행 중 안전수칙"
            items={mountainHikingData.산행_중}
          />
          <InfoSection
            title="산행 후 정리사항"
            items={mountainHikingData.산행_후}
          />
          <InfoSection
            title="산악 사고 대처법"
            items={mountainHikingData.사고_대처}
          />
        </ScrollView>
      )}
      {safety === "platformSafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="승강장 일반 이용 수칙"
            items={platformSafetyData.일반_이용}
          />
          <InfoSection
            title="승강장 사고 예방 수칙"
            items={platformSafetyData.사고_예방}
          />
          <InfoSection
            title="사고 발생 시 대처법"
            items={platformSafetyData.사고_대처}
          />
        </ScrollView>
      )}
      {safety === "foodPoisoningSafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="식중독 예방 3대 요령"
            items={foodPoisoningData.예방}
          />
          <InfoSection
            title="여름철 식중독 예방법"
            items={foodPoisoningData.여름철}
          />
          <InfoSection
            title="휴가철 식중독 예방법"
            items={foodPoisoningData.휴가철}
          />
          <InfoSection
            title="겨울철 식중독 예방법"
            items={foodPoisoningData.겨울철}
          />
          <InfoSection
            title="일반인 식중독 발생 시 대처법"
            items={foodPoisoningData.일반인_대처}
          />
          <InfoSection
            title="급식소 식중독 발생 시 대응"
            items={foodPoisoningData.음식점_급식소}
          />
          <InfoSection
            title="비상 연락처"
            items={foodPoisoningData.비상연락처}
          />
        </ScrollView>
      )}
      {safety === "foodSafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="식품 보관 요령"
            items={foodSafetyData.식품_보관}
          />
          <InfoSection
            title="조리 시 위생 수칙"
            items={foodSafetyData.조리_위생}
          />
          <InfoSection
            title="식품 구입 시 주의사항"
            items={foodSafetyData.구입_요령}
          />
        </ScrollView>
      )}
      {safety === "bicycleSafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="일반인 자전거 이용 수칙"
            items={bicycleSafetyData.일반인}
          />
          <InfoSection
            title="야간 자전거 주행 수칙"
            items={bicycleSafetyData.야간주행}
          />
          <InfoSection
            title="전기자전거 이용 요령"
            items={bicycleSafetyData.전기자전거}
          />
          <InfoSection
            title="초등학생 자전거 안전 수칙"
            items={bicycleSafetyData.초등학생}
          />
          <InfoSection
            title="중고등학생 자전거 안전 수칙"
            items={bicycleSafetyData.중고등학생}
          />
          <InfoSection
            title="고령자 자전거 주의사항"
            items={bicycleSafetyData.고령자}
          />
        </ScrollView>
      )}
      {safety === "electricalSafety" && (
        <ScrollView style={styles.infoContainer}>
          <InfoSection
            title="전기사고 예방 수칙"
            items={electricalAccidentData.사고_예방}
          />
          <InfoSection
            title="누전·합선 예방 요령"
            items={electricalAccidentData.누전_합선}
          />
          <InfoSection
            title="감전 사고 예방 수칙"
            items={electricalAccidentData.감전_예방}
          />
          <InfoSection
            title="감전 시 응급처치"
            items={electricalAccidentData.감전_응급처치}
          />
          <InfoSection
            title="전기화재 대피요령"
            items={electricalAccidentData.화재_대피}
          />
          <InfoSection
            title="침수 시 전기사고 대응"
            items={electricalAccidentData.침수_시}
          />
          <InfoSection
            title="비상 연락처"
            items={electricalAccidentData.비상연락처}
          />
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
