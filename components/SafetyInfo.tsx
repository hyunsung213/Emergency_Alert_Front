import { ScrollView, StyleSheet } from "react-native";
import InfoSection from "./InfoSection";
import {
  gasSafetyData_ko,
  gasSafetyData_ch,
  gasSafetyData_en,
  gasSafetyData_jp,
} from "@/data/safetyData.ts/gasSafetyData";
import {
  heatingSafetyData_ko,
  heatingSafetyData_ch,
  heatingSafetyData_en,
  heatingSafetyData_jp,
} from "@/data/safetyData.ts/heatingSafetyData";
import {
  waterOutageData_ko,
  waterOutageData_ch,
  waterOutageData_en,
  waterOutageData_jp,
} from "@/data/safetyData.ts/waterOutageData";
import {
  waterPlaySafetyData_ko,
  waterPlaySafetyData_ch,
  waterPlaySafetyData_en,
  waterPlaySafetyData_jp,
} from "@/data/safetyData.ts/waterPlaySafetyData";
import {
  mountainHikingData_ko,
  mountainHikingData_ch,
  mountainHikingData_en,
  mountainHikingData_jp,
} from "@/data/safetyData.ts/mountainHikingData";
import {
  platformSafetyData_ko,
  platformSafetyData_ch,
  platformSafetyData_en,
  platformSafetyData_jp,
} from "@/data/safetyData.ts/platformSafetyData";
import {
  foodPoisoningData_ko,
  foodPoisoningData_ch,
  foodPoisoningData_en,
  foodPoisoningData_jp,
} from "@/data/safetyData.ts/foodPoisoningData";
import {
  foodSafetyData_ko,
  foodSafetyData_ch,
  foodSafetyData_en,
  foodSafetyData_jp,
} from "@/data/safetyData.ts/foodSafetyData";
import {
  bicycleSafetyData_ko,
  bicycleSafetyData_ch,
  bicycleSafetyData_en,
  bicycleSafetyData_jp,
} from "@/data/safetyData.ts/bicycleSafetyData";
import {
  electricalAccidentData_ko,
  electricalAccidentData_ch,
  electricalAccidentData_en,
  electricalAccidentData_jp,
} from "@/data/safetyData.ts/electricalAccidentData";

export default function SafetyInfo({
  safety,
  language,
}: {
  safety: string;
  language: string;
}) {
  return (
    <>
      {safety === "gasSafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="가스시설 설치 요령"
                items={gasSafetyData_ko.가스시설_설치}
              />
              <InfoSection
                title="가스누출 점검 요령"
                items={gasSafetyData_ko.가스누출_점검}
              />
              <InfoSection
                title="가스레인지 사용 요령"
                items={gasSafetyData_ko.가스레인지_사용}
              />
              <InfoSection
                title="휴대용 가스레인지 사용 요령"
                items={gasSafetyData_ko.휴대용_가스레인지}
              />
              <InfoSection
                title="계절별 가스 안전관리"
                items={gasSafetyData_ko.계절별_관리}
              />
              <InfoSection
                title="가스 누출 사고 발생 시"
                items={gasSafetyData_ko.가스누출_사고}
              />
              <InfoSection
                title="가스사고 응급처치"
                items={gasSafetyData_ko.가스사고_응급처치}
              />
              <InfoSection
                title="비상 연락처"
                items={gasSafetyData_ko.비상연락처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Gas Facility Installation Guidelines"
                items={gasSafetyData_en.가스시설_설치}
              />
              <InfoSection
                title="Gas Leak Inspection Guidelines"
                items={gasSafetyData_en.가스누출_점검}
              />
              <InfoSection
                title="Gas Stove Usage Guidelines"
                items={gasSafetyData_en.가스레인지_사용}
              />
              <InfoSection
                title="Portable Gas Stove Usage Guidelines"
                items={gasSafetyData_en.휴대용_가스레인지}
              />
              <InfoSection
                title="Seasonal Gas Safety Management"
                items={gasSafetyData_en.계절별_관리}
              />
              <InfoSection
                title="Actions in Case of Gas Leak Accidents"
                items={gasSafetyData_en.가스누출_사고}
              />
              <InfoSection
                title="Emergency Response for Gas Accidents"
                items={gasSafetyData_en.가스사고_응급처치}
              />
              <InfoSection
                title="Emergency Contacts"
                items={gasSafetyData_en.비상연락처}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="燃气设施安装指南"
                items={gasSafetyData_ch.가스시설_설치}
              />
              <InfoSection
                title="燃气泄漏检查指南"
                items={gasSafetyData_ch.가스누출_점검}
              />
              <InfoSection
                title="燃气灶使用指南"
                items={gasSafetyData_ch.가스레인지_사용}
              />
              <InfoSection
                title="便携式燃气灶使用指南"
                items={gasSafetyData_ch.휴대용_가스레인지}
              />
              <InfoSection
                title="季节性燃气安全管理"
                items={gasSafetyData_ch.계절별_관리}
              />
              <InfoSection
                title="燃气泄漏事故处理"
                items={gasSafetyData_ch.가스누출_사고}
              />
              <InfoSection
                title="燃气事故应急处理"
                items={gasSafetyData_ch.가스사고_응급처치}
              />
              <InfoSection
                title="紧急联系电话"
                items={gasSafetyData_ch.비상연락처}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="ガス設備設置ガイドライン"
                items={gasSafetyData_jp.가스시설_설치}
              />
              <InfoSection
                title="ガス漏れ点検ガイドライン"
                items={gasSafetyData_jp.가스누출_점검}
              />
              <InfoSection
                title="ガスコンロ使用ガイドライン"
                items={gasSafetyData_jp.가스레인지_사용}
              />
              <InfoSection
                title="携帯用ガスコンロ使用ガイドライン"
                items={gasSafetyData_jp.휴대용_가스레인지}
              />
              <InfoSection
                title="季節別ガス安全管理"
                items={gasSafetyData_jp.계절별_관리}
              />
              <InfoSection
                title="ガス漏れ事故発生時の対応"
                items={gasSafetyData_jp.가스누출_사고}
              />
              <InfoSection
                title="ガス事故応急処置"
                items={gasSafetyData_jp.가스사고_응급처치}
              />
              <InfoSection
                title="緊急連絡先"
                items={gasSafetyData_jp.비상연락처}
              />
            </>
          )}
        </ScrollView>
      )}

      {safety === "heatingSafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="보일러 안전 사용법"
                items={heatingSafetyData_ko.보일러}
              />
              <InfoSection
                title="전기난로 사용 주의사항"
                items={heatingSafetyData_ko.전기난로}
              />
              <InfoSection
                title="전기·온수매트 사용법"
                items={heatingSafetyData_ko.전기매트_온수매트}
              />
              <InfoSection
                title="저온화상 응급처치"
                items={heatingSafetyData_ko.응급처치}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Boiler Safety Usage"
                items={heatingSafetyData_en.보일러}
              />
              <InfoSection
                title="Electric Heater Precautions"
                items={heatingSafetyData_en.전기난로}
              />
              <InfoSection
                title="Electric/Water Mat Usage"
                items={heatingSafetyData_en.전기매트_온수매트}
              />
              <InfoSection
                title="Low-Temperature Burn First Aid"
                items={heatingSafetyData_en.응급처치}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="锅炉安全使用方法"
                items={heatingSafetyData_ch.보일러}
              />
              <InfoSection
                title="电暖炉使用注意事项"
                items={heatingSafetyData_ch.전기난로}
              />
              <InfoSection
                title="电热毯/水暖毯使用方法"
                items={heatingSafetyData_ch.전기매트_온수매트}
              />
              <InfoSection
                title="低温烫伤急救"
                items={heatingSafetyData_ch.응급처치}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="ボイラー安全使用法"
                items={heatingSafetyData_jp.보일러}
              />
              <InfoSection
                title="電気ストーブ使用時の注意事項"
                items={heatingSafetyData_jp.전기난로}
              />
              <InfoSection
                title="電気マット/温水マットの使用方法"
                items={heatingSafetyData_jp.전기매트_온수매트}
              />
              <InfoSection
                title="低温やけどの応急処置"
                items={heatingSafetyData_jp.응급처치}
              />
            </>
          )}
        </ScrollView>
      )}
      {safety === "waterOutageSafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="단수 대비 요령"
                items={waterOutageData_ko.단수_대비}
              />
              <InfoSection
                title="단수 발생 시 행동요령"
                items={waterOutageData_ko.단수_발생}
              />
              <InfoSection
                title="비상 연락처"
                items={waterOutageData_ko.비상연락처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Water Outage Preparation Guidelines"
                items={waterOutageData_en.단수_대비}
              />
              <InfoSection
                title="Actions During Water Outage"
                items={waterOutageData_en.단수_발생}
              />
              <InfoSection
                title="Emergency Contacts"
                items={waterOutageData_en.비상연락처}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="停水准备指南"
                items={waterOutageData_ch.단수_대비}
              />
              <InfoSection
                title="停水时的行动指南"
                items={waterOutageData_ch.단수_발생}
              />
              <InfoSection
                title="紧急联系电话"
                items={waterOutageData_ch.비상연락처}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="断水準備ガイドライン"
                items={waterOutageData_jp.단수_대비}
              />
              <InfoSection
                title="断水時の行動指針"
                items={waterOutageData_jp.단수_발생}
              />
              <InfoSection
                title="緊急連絡先"
                items={waterOutageData_jp.비상연락처}
              />
            </>
          )}
        </ScrollView>
      )}
      {safety === "waterPlaySafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="물놀이 전 준비사항"
                items={waterPlaySafetyData_ko.물놀이_전}
              />
              <InfoSection
                title="물놀이 중 주의사항"
                items={waterPlaySafetyData_ko.물놀이_중}
              />
              <InfoSection
                title="물놀이 후 정리사항"
                items={waterPlaySafetyData_ko.물놀이_후}
              />
              <InfoSection
                title="사고 발생 시 대처법"
                items={waterPlaySafetyData_ko.사고_대처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Preparation Before Water Play"
                items={waterPlaySafetyData_en.물놀이_전}
              />
              <InfoSection
                title="Precautions During Water Play"
                items={waterPlaySafetyData_en.물놀이_중}
              />
              <InfoSection
                title="Post-Water Play Guidelines"
                items={waterPlaySafetyData_en.물놀이_후}
              />
              <InfoSection
                title="Actions in Case of Accidents"
                items={waterPlaySafetyData_en.사고_대처}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="玩水前的准备事项"
                items={waterPlaySafetyData_ch.물놀이_전}
              />
              <InfoSection
                title="玩水时的注意事项"
                items={waterPlaySafetyData_ch.물놀이_중}
              />
              <InfoSection
                title="玩水后的整理事项"
                items={waterPlaySafetyData_ch.물놀이_후}
              />
              <InfoSection
                title="事故发生时的应对方法"
                items={waterPlaySafetyData_ch.사고_대처}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="水遊び前の準備事項"
                items={waterPlaySafetyData_jp.물놀이_전}
              />
              <InfoSection
                title="水遊び中の注意事項"
                items={waterPlaySafetyData_jp.물놀이_중}
              />
              <InfoSection
                title="水遊び後の整理事項"
                items={waterPlaySafetyData_jp.물놀이_후}
              />
              <InfoSection
                title="事故発生時の対応方法"
                items={waterPlaySafetyData_jp.사고_대처}
              />
            </>
          )}
        </ScrollView>
      )}
      {safety === "mountainHikingSafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="산행 전 준비사항"
                items={mountainHikingData_ko.산행_전}
              />
              <InfoSection
                title="산행 중 안전수칙"
                items={mountainHikingData_ko.산행_중}
              />
              <InfoSection
                title="산행 후 정리사항"
                items={mountainHikingData_ko.산행_후}
              />
              <InfoSection
                title="산악 사고 대처법"
                items={mountainHikingData_ko.사고_대처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Preparation Before Hiking"
                items={mountainHikingData_en.산행_전}
              />
              <InfoSection
                title="Safety Rules During Hiking"
                items={mountainHikingData_en.산행_중}
              />
              <InfoSection
                title="Post-Hiking Guidelines"
                items={mountainHikingData_en.산행_후}
              />
              <InfoSection
                title="Mountain Accident Response"
                items={mountainHikingData_en.사고_대처}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="登山前的准备事项"
                items={mountainHikingData_ch.산행_전}
              />
              <InfoSection
                title="登山中的安全守则"
                items={mountainHikingData_ch.산행_중}
              />
              <InfoSection
                title="登山后的整理事项"
                items={mountainHikingData_ch.산행_후}
              />
              <InfoSection
                title="山地事故应对方法"
                items={mountainHikingData_ch.사고_대처}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="登山前の準備事項"
                items={mountainHikingData_jp.산행_전}
              />
              <InfoSection
                title="登山中の安全ルール"
                items={mountainHikingData_jp.산행_중}
              />
              <InfoSection
                title="登山後の整理事項"
                items={mountainHikingData_jp.산행_후}
              />
              <InfoSection
                title="山岳事故の対応方法"
                items={mountainHikingData_jp.사고_대처}
              />
            </>
          )}
        </ScrollView>
      )}

      {safety === "platformSafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="승강장 일반 이용 수칙"
                items={platformSafetyData_ko.일반_이용}
              />
              <InfoSection
                title="승강장 사고 예방 수칙"
                items={platformSafetyData_ko.사고_예방}
              />
              <InfoSection
                title="사고 발생 시 대처법"
                items={platformSafetyData_ko.사고_대처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Platform General Usage Rules"
                items={platformSafetyData_en.일반_이용}
              />
              <InfoSection
                title="Platform Accident Prevention Rules"
                items={platformSafetyData_en.사고_예방}
              />
              <InfoSection
                title="Actions in Case of Accidents"
                items={platformSafetyData_en.사고_대처}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="站台一般使用守则"
                items={platformSafetyData_ch.일반_이용}
              />
              <InfoSection
                title="站台事故预防守则"
                items={platformSafetyData_ch.사고_예방}
              />
              <InfoSection
                title="事故发生时的应对方法"
                items={platformSafetyData_ch.사고_대처}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="プラットフォーム一般利用規則"
                items={platformSafetyData_jp.일반_이용}
              />
              <InfoSection
                title="プラットフォーム事故予防規則"
                items={platformSafetyData_jp.사고_예방}
              />
              <InfoSection
                title="事故発生時の対応方法"
                items={platformSafetyData_jp.사고_대처}
              />
            </>
          )}
        </ScrollView>
      )}

      {safety === "foodPoisoningSafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="식중독 예방 3대 요령"
                items={foodPoisoningData_ko.예방}
              />
              <InfoSection
                title="여름철 식중독 예방법"
                items={foodPoisoningData_ko.여름철}
              />
              <InfoSection
                title="휴가철 식중독 예방법"
                items={foodPoisoningData_ko.휴가철}
              />
              <InfoSection
                title="겨울철 식중독 예방법"
                items={foodPoisoningData_ko.겨울철}
              />
              <InfoSection
                title="일반인 식중독 발생 시 대처법"
                items={foodPoisoningData_ko.일반인_대처}
              />
              <InfoSection
                title="급식소 식중독 발생 시 대응"
                items={foodPoisoningData_ko.음식점_급식소}
              />
              <InfoSection
                title="비상 연락처"
                items={foodPoisoningData_ko.비상연락처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="3 Key Guidelines for Food Poisoning Prevention"
                items={foodPoisoningData_en.예방}
              />
              <InfoSection
                title="Summer Food Poisoning Prevention"
                items={foodPoisoningData_en.여름철}
              />
              <InfoSection
                title="Vacation Food Poisoning Prevention"
                items={foodPoisoningData_en.휴가철}
              />
              <InfoSection
                title="Winter Food Poisoning Prevention"
                items={foodPoisoningData_en.겨울철}
              />
              <InfoSection
                title="General Response to Food Poisoning"
                items={foodPoisoningData_en.일반인_대처}
              />
              <InfoSection
                title="Response to Food Poisoning in Cafeterias"
                items={foodPoisoningData_en.음식점_급식소}
              />
              <InfoSection
                title="Emergency Contacts"
                items={foodPoisoningData_en.비상연락처}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="食物中毒预防三大要点"
                items={foodPoisoningData_ch.예방}
              />
              <InfoSection
                title="夏季食物中毒预防"
                items={foodPoisoningData_ch.여름철}
              />
              <InfoSection
                title="假期食物中毒预防"
                items={foodPoisoningData_ch.휴가철}
              />
              <InfoSection
                title="冬季食物中毒预防"
                items={foodPoisoningData_ch.겨울철}
              />
              <InfoSection
                title="普通人食物中毒时的应对方法"
                items={foodPoisoningData_ch.일반인_대처}
              />
              <InfoSection
                title="食堂食物中毒时的应对方法"
                items={foodPoisoningData_ch.음식점_급식소}
              />
              <InfoSection
                title="紧急联系电话"
                items={foodPoisoningData_ch.비상연락처}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="食中毒予防の3つの要点"
                items={foodPoisoningData_jp.예방}
              />
              <InfoSection
                title="夏季の食中毒予防"
                items={foodPoisoningData_jp.여름철}
              />
              <InfoSection
                title="休暇中の食中毒予防"
                items={foodPoisoningData_jp.휴가철}
              />
              <InfoSection
                title="冬季の食中毒予防"
                items={foodPoisoningData_jp.겨울철}
              />
              <InfoSection
                title="一般人の食中毒発生時の対処法"
                items={foodPoisoningData_jp.일반인_대처}
              />
              <InfoSection
                title="給食施設での食中毒発生時の対応"
                items={foodPoisoningData_jp.음식점_급식소}
              />
              <InfoSection
                title="緊急連絡先"
                items={foodPoisoningData_jp.비상연락처}
              />
            </>
          )}
        </ScrollView>
      )}

      {safety === "foodSafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="식품 보관 요령"
                items={foodSafetyData_ko.식품_보관}
              />
              <InfoSection
                title="조리 시 위생 수칙"
                items={foodSafetyData_ko.조리_위생}
              />
              <InfoSection
                title="식품 구입 시 주의사항"
                items={foodSafetyData_ko.구입_요령}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Food Storage Guidelines"
                items={foodSafetyData_en.식품_보관}
              />
              <InfoSection
                title="Hygiene Rules During Cooking"
                items={foodSafetyData_en.조리_위생}
              />
              <InfoSection
                title="Precautions When Purchasing Food"
                items={foodSafetyData_en.구입_요령}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="食品存储指南"
                items={foodSafetyData_ch.식품_보관}
              />
              <InfoSection
                title="烹饪时的卫生守则"
                items={foodSafetyData_ch.조리_위생}
              />
              <InfoSection
                title="购买食品时的注意事项"
                items={foodSafetyData_ch.구입_요령}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="食品保管のガイドライン"
                items={foodSafetyData_jp.식품_보관}
              />
              <InfoSection
                title="調理時の衛生ルール"
                items={foodSafetyData_jp.조리_위생}
              />
              <InfoSection
                title="食品購入時の注意事項"
                items={foodSafetyData_jp.구입_요령}
              />
            </>
          )}
        </ScrollView>
      )}
      {safety === "bicycleSafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="일반인 자전거 이용 수칙"
                items={bicycleSafetyData_ko.일반인}
              />
              <InfoSection
                title="야간 자전거 주행 수칙"
                items={bicycleSafetyData_ko.야간주행}
              />
              <InfoSection
                title="전기자전거 이용 요령"
                items={bicycleSafetyData_ko.전기자전거}
              />
              <InfoSection
                title="초등학생 자전거 안전 수칙"
                items={bicycleSafetyData_ko.초등학생}
              />
              <InfoSection
                title="중고등학생 자전거 안전 수칙"
                items={bicycleSafetyData_ko.중고등학생}
              />
              <InfoSection
                title="고령자 자전거 주의사항"
                items={bicycleSafetyData_ko.고령자}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="General Bicycle Usage Rules"
                items={bicycleSafetyData_en.일반인}
              />
              <InfoSection
                title="Nighttime Bicycle Riding Rules"
                items={bicycleSafetyData_en.야간주행}
              />
              <InfoSection
                title="Electric Bicycle Usage Guidelines"
                items={bicycleSafetyData_en.전기자전거}
              />
              <InfoSection
                title="Elementary School Bicycle Safety Rules"
                items={bicycleSafetyData_en.초등학생}
              />
              <InfoSection
                title="Middle and High School Bicycle Safety Rules"
                items={bicycleSafetyData_en.중고등학생}
              />
              <InfoSection
                title="Elderly Bicycle Precautions"
                items={bicycleSafetyData_en.고령자}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="普通人自行车使用守则"
                items={bicycleSafetyData_ch.일반인}
              />
              <InfoSection
                title="夜间骑自行车守则"
                items={bicycleSafetyData_ch.야간주행}
              />
              <InfoSection
                title="电动自行车使用指南"
                items={bicycleSafetyData_ch.전기자전거}
              />
              <InfoSection
                title="小学生自行车安全守则"
                items={bicycleSafetyData_ch.초등학생}
              />
              <InfoSection
                title="中学生和高中生自行车安全守则"
                items={bicycleSafetyData_ch.중고등학생}
              />
              <InfoSection
                title="老年人骑自行车注意事项"
                items={bicycleSafetyData_ch.고령자}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="一般人の自転車利用規則"
                items={bicycleSafetyData_jp.일반인}
              />
              <InfoSection
                title="夜間自転車走行規則"
                items={bicycleSafetyData_jp.야간주행}
              />
              <InfoSection
                title="電動自転車利用ガイドライン"
                items={bicycleSafetyData_jp.전기자전거}
              />
              <InfoSection
                title="小学生の自転車安全規則"
                items={bicycleSafetyData_jp.초등학생}
              />
              <InfoSection
                title="中高生の自転車安全規則"
                items={bicycleSafetyData_jp.중고등학생}
              />
              <InfoSection
                title="高齢者の自転車注意事項"
                items={bicycleSafetyData_jp.고령자}
              />
            </>
          )}
        </ScrollView>
      )}
      {safety === "electricalSafety" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="전기사고 예방 수칙"
                items={electricalAccidentData_ko.사고_예방}
              />
              <InfoSection
                title="누전·합선 예방 요령"
                items={electricalAccidentData_ko.누전_합선}
              />
              <InfoSection
                title="감전 사고 예방 수칙"
                items={electricalAccidentData_ko.감전_예방}
              />
              <InfoSection
                title="감전 시 응급처치"
                items={electricalAccidentData_ko.감전_응급처치}
              />
              <InfoSection
                title="전기화재 대피요령"
                items={electricalAccidentData_ko.화재_대피}
              />
              <InfoSection
                title="침수 시 전기사고 대응"
                items={electricalAccidentData_ko.침수_시}
              />
              <InfoSection
                title="비상 연락처"
                items={electricalAccidentData_ko.비상연락처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Electrical Accident Prevention Rules"
                items={electricalAccidentData_en.사고_예방}
              />
              <InfoSection
                title="Short Circuit and Leakage Prevention"
                items={electricalAccidentData_en.누전_합선}
              />
              <InfoSection
                title="Electric Shock Prevention Rules"
                items={electricalAccidentData_en.감전_예방}
              />
              <InfoSection
                title="First Aid for Electric Shock"
                items={electricalAccidentData_en.감전_응급처치}
              />
              <InfoSection
                title="Electrical Fire Evacuation Guidelines"
                items={electricalAccidentData_en.화재_대피}
              />
              <InfoSection
                title="Response to Electrical Accidents During Flooding"
                items={electricalAccidentData_en.침수_시}
              />
              <InfoSection
                title="Emergency Contacts"
                items={electricalAccidentData_en.비상연락처}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="电气事故预防守则"
                items={electricalAccidentData_ch.사고_예방}
              />
              <InfoSection
                title="漏电·短路预防要点"
                items={electricalAccidentData_ch.누전_합선}
              />
              <InfoSection
                title="触电事故预防守则"
                items={electricalAccidentData_ch.감전_예방}
              />
              <InfoSection
                title="触电时的急救措施"
                items={electricalAccidentData_ch.감전_응급처치}
              />
              <InfoSection
                title="电气火灾疏散指南"
                items={electricalAccidentData_ch.화재_대피}
              />
              <InfoSection
                title="洪水时电气事故应对"
                items={electricalAccidentData_ch.침수_시}
              />
              <InfoSection
                title="紧急联系电话"
                items={electricalAccidentData_ch.비상연락처}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="電気事故予防規則"
                items={electricalAccidentData_jp.사고_예방}
              />
              <InfoSection
                title="漏電・短絡予防要領"
                items={electricalAccidentData_jp.누전_합선}
              />
              <InfoSection
                title="感電事故予防規則"
                items={electricalAccidentData_jp.감전_예방}
              />
              <InfoSection
                title="感電時の応急処置"
                items={electricalAccidentData_jp.감전_응급처치}
              />
              <InfoSection
                title="電気火災避難要領"
                items={electricalAccidentData_jp.화재_대피}
              />
              <InfoSection
                title="浸水時の電気事故対応"
                items={electricalAccidentData_jp.침수_시}
              />
              <InfoSection
                title="緊急連絡先"
                items={electricalAccidentData_jp.비상연락처}
              />
            </>
          )}
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
    paddingBottom: 24, // 하단 간격 추가
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
