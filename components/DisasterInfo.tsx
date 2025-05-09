import { StyleSheet, View, ScrollView } from "react-native";
import InfoSection from "./InfoSection";
import {
  earthquakeData_ko,
  earthquakeData_ch,
  earthquakeData_en,
  earthquakeData_jp,
} from "@/data/disasterData/earthquakeData";
import {
  dustData_ko,
  dustData_ch,
  dustData_en,
  dustData_jp,
} from "@/data/disasterData/dustData";
import {
  heatwaveData_ko,
  heatwaveData_ch,
  heatwaveData_en,
  heatwaveData_jp,
} from "@/data/disasterData/heatData";
import {
  typhoonData_ko,
  typhoonData_ch,
  typhoonData_en,
  typhoonData_jp,
} from "@/data/disasterData/typhoonData";
import {
  heavyRainData_ko,
  heavyRainData_ch,
  heavyRainData_en,
  heavyRainData_jp,
} from "@/data/disasterData/heavyrainData";
import {
  windstormData_ko,
  windstormData_ch,
  windstormData_en,
  windstormData_jp,
} from "@/data/disasterData/windstormData";
import {
  floodData_ko,
  floodData_ch,
  floodData_en,
  floodData_jp,
} from "@/data/disasterData/floodData";
import {
  landslideData_ko,
  landslideData_ch,
  landslideData_en,
  landslideData_jp,
} from "@/data/disasterData/landslideData";
import {
  droughtData_ko,
  droughtData_ch,
  droughtData_en,
  droughtData_jp,
} from "@/data/disasterData/droughtData";
import {
  snowstormData_ko,
  snowstormData_ch,
  snowstormData_en,
  snowstormData_jp,
} from "@/data/disasterData/snowstormData";
import {
  coldWaveData_ko,
  coldWaveData_ch,
  coldWaveData_en,
  coldWaveData_jp,
} from "@/data/disasterData/coldData";
import {
  volcanoData_ko,
  volcanoData_ch,
  volcanoData_en,
  volcanoData_jp,
} from "@/data/disasterData/volcanoData";
import { useState } from "react";

export default function DisasterInfo({
  emergency,
  language,
}: {
  emergency: string;
  language: string;
}) {
  return (
    <>
      {emergency === "earthquake" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="지진 대비 행동요령"
                items={earthquakeData_ko.지진대비}
              />
              <InfoSection
                title="지진 발생시 행동요령"
                items={earthquakeData_ko.지진발생}
              />
              <InfoSection
                title="지진 발생 후 대피 행동요령"
                items={earthquakeData_ko.지진후_대피}
              />
              <InfoSection
                title="지진 시 장소별 행동요령 - 극장/경기장"
                items={earthquakeData_ko.지진장소별_행동요령.극장_경기장}
              />
              <InfoSection
                title="지진 시 장소별 행동요령 - 고층 건물"
                items={earthquakeData_ko.지진장소별_행동요령.고층건물}
              />
              <InfoSection
                title="지진 시 장소별 행동요령 - 엘리베이터"
                items={earthquakeData_ko.지진장소별_행동요령.엘리베이터}
              />
              <InfoSection
                title="지진 시 장소별 행동요령 - 지하철"
                items={earthquakeData_ko.지진장소별_행동요령.지하철}
              />
              <InfoSection
                title="지진 시 장소별 행동요령 - 자동차"
                items={earthquakeData_ko.지진장소별_행동요령.자동차}
              />
              <InfoSection
                title="지진 시 장소별 행동요령 - 실외/산"
                items={earthquakeData_ko.지진장소별_행동요령.실외_산}
              />
              <InfoSection
                title="지진 시 장소별 행동요령 - 바다"
                items={earthquakeData_ko.지진장소별_행동요령.바다}
              />
            </>
          )}

          {language === "en" && (
            <>
              <InfoSection
                title="Earthquake Preparedness Guidelines"
                items={earthquakeData_en.지진대비}
              />
              <InfoSection
                title="Actions During an Earthquake"
                items={earthquakeData_en.지진발생}
              />
              <InfoSection
                title="Post-Earthquake Evacuation Guidelines"
                items={earthquakeData_en.지진후_대피}
              />
              <InfoSection
                title="Location-Specific Guidelines - Theater/Stadium"
                items={earthquakeData_en.지진장소별_행동요령.theater_stadium}
              />
              <InfoSection
                title="Location-Specific Guidelines - High-Rise Buildings"
                items={earthquakeData_en.지진장소별_행동요령.buillding}
              />
              <InfoSection
                title="Location-Specific Guidelines - Elevator"
                items={earthquakeData_en.지진장소별_행동요령.elevator}
              />
              <InfoSection
                title="Location-Specific Guidelines - Subway"
                items={earthquakeData_en.지진장소별_행동요령.subway}
              />
              <InfoSection
                title="Location-Specific Guidelines - Car"
                items={earthquakeData_en.지진장소별_행동요령.car}
              />
              <InfoSection
                title="Location-Specific Guidelines - Outdoors/Mountain"
                items={earthquakeData_en.지진장소별_행동요령.outdoorsOrMountain}
              />
              <InfoSection
                title="Location-Specific Guidelines - Sea"
                items={earthquakeData_en.지진장소별_행동요령.sea}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="地震应对指南"
                items={earthquakeData_ch.지진대비}
              />
              <InfoSection
                title="地震发生时的行动指南"
                items={earthquakeData_ch.지진발생}
              />
              <InfoSection
                title="地震后撤离指南"
                items={earthquakeData_ch.지진후_대피}
              />
              <InfoSection
                title="地震场所指南 - 剧院/体育场"
                items={earthquakeData_ch.지진장소별_행동요령.剧场_体育馆}
              />
              <InfoSection
                title="地震场所指南 - 高层建筑"
                items={earthquakeData_ch.지진장소별_행동요령.高层建筑}
              />
              <InfoSection
                title="地震场所指南 - 电梯"
                items={earthquakeData_ch.지진장소별_행동요령.电梯}
              />
              <InfoSection
                title="地震场所指南 - 地铁"
                items={earthquakeData_ch.지진장소별_행동요령.地铁}
              />
              <InfoSection
                title="地震场所指南 - 汽车"
                items={earthquakeData_ch.지진장소별_행동요령.汽车}
              />
              <InfoSection
                title="地震场所指南 - 室外/山"
                items={earthquakeData_ch.지진장소별_행동요령.户外_山地}
              />
              <InfoSection
                title="地震场所指南 - 海洋"
                items={earthquakeData_ch.지진장소별_행동요령.海边}
              />
            </>
          )}

          {language === "ja" && (
            <>
              <InfoSection
                title="地震対策ガイドライン"
                items={earthquakeData_jp.지진대비}
              />
              <InfoSection
                title="地震発生時の行動ガイドライン"
                items={earthquakeData_jp.지진발생}
              />
              <InfoSection
                title="地震後の避難ガイドライン"
                items={earthquakeData_jp.지진후_대피}
              />
              <InfoSection
                title="地震時の場所別ガイドライン - 劇場/競技場"
                items={earthquakeData_jp.지진장소별_행동요령.劇場_競技場}
              />
              <InfoSection
                title="地震時の場所別ガイドライン - 高層ビル"
                items={earthquakeData_jp.지진장소별_행동요령.高層ビル}
              />
              <InfoSection
                title="地震時の場所別ガイドライン - エレベーター"
                items={earthquakeData_jp.지진장소별_행동요령.エレベーター}
              />
              <InfoSection
                title="地震時の場所別ガイドライン - 地下鉄"
                items={earthquakeData_jp.지진장소별_행동요령.地下鉄}
              />
              <InfoSection
                title="地震時の場所別ガイドライン - 自動車"
                items={earthquakeData_jp.지진장소별_행동요령.自動車}
              />
              <InfoSection
                title="地震時の場所別ガイドライン - 屋外/山"
                items={earthquakeData_jp.지진장소별_행동요령.屋外_山}
              />
              <InfoSection
                title="地震時の場所別ガイドライン - 海"
                items={earthquakeData_jp.지진장소별_행동요령.海}
              />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "dust" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="미세먼지 일반 대비"
                items={dustData_ko.일반대비}
              />
              <InfoSection
                title="미세먼지 특보 시 공통 행동요령"
                items={dustData_ko.공통특보대응}
              />
              <InfoSection
                title="영유아 및 어린이 행동요령"
                items={dustData_ko.영유아어린이}
              />
              <InfoSection title="임산부 행동요령" items={dustData_ko.임산부} />
              <InfoSection title="고령자 행동요령" items={dustData_ko.고령자} />
              <InfoSection
                title="호흡기 질환자 행동요령"
                items={dustData_ko.호흡기질환자}
              />
              <InfoSection
                title="심혈관 질환자 행동요령"
                items={dustData_ko.심혈관질환자}
              />
            </>
          )}

          {language === "en" && (
            <>
              <InfoSection
                title="General Guidelines for Fine Dust"
                items={dustData_en.일반대비}
              />
              <InfoSection
                title="Common Actions During Fine Dust Alerts"
                items={dustData_en.공통특보대응}
              />
              <InfoSection
                title="Guidelines for Infants and Children"
                items={dustData_en.영유아어린이}
              />
              <InfoSection
                title="Guidelines for Pregnant Women"
                items={dustData_en.임산부}
              />
              <InfoSection
                title="Guidelines for Elderly"
                items={dustData_en.고령자}
              />
              <InfoSection
                title="Guidelines for Respiratory Patients"
                items={dustData_en.호흡기질환자}
              />
              <InfoSection
                title="Guidelines for Cardiovascular Patients"
                items={dustData_en.심혈관질환자}
              />
            </>
          )}

          {language === "zh" && (
            <>
              <InfoSection
                title="细颗粒物一般应对"
                items={dustData_ch.일반대비}
              />
              <InfoSection
                title="细颗粒物预警时的共同行动指南"
                items={dustData_ch.공통특보대응}
              />
              <InfoSection
                title="婴幼儿及儿童行动指南"
                items={dustData_ch.영유아어린이}
              />
              <InfoSection title="孕妇行动指南" items={dustData_ch.임산부} />
              <InfoSection title="老年人行动指南" items={dustData_ch.고령자} />
              <InfoSection
                title="呼吸道疾病患者行动指南"
                items={dustData_ch.호흡기질환자}
              />
              <InfoSection
                title="心血管疾病患者行动指南"
                items={dustData_ch.심혈관질환자}
              />
            </>
          )}

          {language === "ja" && (
            <>
              <InfoSection
                title="微粒子一般対策"
                items={dustData_jp.일반대비}
              />
              <InfoSection
                title="微粒子警報時の共通行動指針"
                items={dustData_jp.공통특보대응}
              />
              <InfoSection
                title="乳幼児および子供の行動指針"
                items={dustData_jp.영유아어린이}
              />
              <InfoSection title="妊婦の行動指針" items={dustData_jp.임산부} />
              <InfoSection
                title="高齢者の行動指針"
                items={dustData_jp.고령자}
              />
              <InfoSection
                title="呼吸器疾患患者の行動指針"
                items={dustData_jp.호흡기질환자}
              />
              <InfoSection
                title="心血管疾患患者の行動指針"
                items={dustData_jp.심혈관질환자}
              />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "heat" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="폭염 대비 요령"
                items={heatwaveData_ko.대비요령}
              />
              <InfoSection
                title="폭염 발생 시 - 실내"
                items={heatwaveData_ko.발생시_실내}
              />
              <InfoSection
                title="폭염 발생 시 - 실외"
                items={heatwaveData_ko.발생시_실외}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Heatwave Preparedness Guidelines"
                items={heatwaveData_en.대비요령}
              />
              <InfoSection
                title="During a Heatwave - Indoors"
                items={heatwaveData_en.발생시_실내}
              />
              <InfoSection
                title="During a Heatwave - Outdoors"
                items={heatwaveData_en.발생시_실외}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="高温应对指南"
                items={heatwaveData_ch.대비요령}
              />
              <InfoSection
                title="高温发生时 - 室内"
                items={heatwaveData_ch.발생시_실내}
              />
              <InfoSection
                title="高温发生时 - 室外"
                items={heatwaveData_ch.발생시_실외}
              />
            </>
          )}

          {language === "ja" && (
            <>
              <InfoSection
                title="熱波対策ガイドライン"
                items={heatwaveData_jp.대비요령}
              />
              <InfoSection
                title="熱波発生時 - 室内"
                items={heatwaveData_jp.발생시_실내}
              />
              <InfoSection
                title="熱波発生時 - 屋外"
                items={heatwaveData_jp.발생시_실외}
              />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "typhoon" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection title="태풍·호우 대비" items={typhoonData_ko.대비} />
              <InfoSection
                title="태풍·호우 예보 단계 행동요령"
                items={typhoonData_ko.예보단계}
              />
              <InfoSection
                title="특보 시 실내 행동요령"
                items={typhoonData_ko.특보_실내}
              />
              <InfoSection
                title="특보 시 실외 행동요령"
                items={typhoonData_ko.특보_실외}
              />
              <InfoSection
                title="특보 시 자동차 운전 중 행동요령"
                items={typhoonData_ko.특보_운전중}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Typhoon and Heavy Rain Preparedness"
                items={typhoonData_en.대비}
              />
              <InfoSection
                title="Guidelines During Forecast Stage"
                items={typhoonData_en.예보단계}
              />
              <InfoSection
                title="Indoor Guidelines During Alerts"
                items={typhoonData_en.특보_실내}
              />
              <InfoSection
                title="Outdoor Guidelines During Alerts"
                items={typhoonData_en.특보_실외}
              />
              <InfoSection
                title="Driving Guidelines During Alerts"
                items={typhoonData_en.특보_운전중}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection title="台风和暴雨应对" items={typhoonData_ch.대비} />
              <InfoSection
                title="台风和暴雨预报阶段指南"
                items={typhoonData_ch.예보단계}
              />
              <InfoSection
                title="预警时室内行动指南"
                items={typhoonData_ch.특보_실내}
              />
              <InfoSection
                title="预警时室外行动指南"
                items={typhoonData_ch.특보_실외}
              />
              <InfoSection
                title="预警时驾驶指南"
                items={typhoonData_ch.특보_운전중}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection title="台風・豪雨対策" items={typhoonData_jp.대비} />
              <InfoSection
                title="台風・豪雨予報段階の行動指針"
                items={typhoonData_jp.예보단계}
              />
              <InfoSection
                title="特報時の室内行動指針"
                items={typhoonData_jp.특보_실내}
              />
              <InfoSection
                title="特報時の屋外行動指針"
                items={typhoonData_jp.특보_실외}
              />
              <InfoSection
                title="特報時の運転中の行動指針"
                items={typhoonData_jp.특보_운전중}
              />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "downpour" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="호우 대비 요령"
                items={heavyRainData_ko.대비}
              />
              <InfoSection
                title="호우 발생 시 실내 행동요령"
                items={heavyRainData_ko.발생_실내}
              />
              <InfoSection
                title="호우 발생 시 자동차 운전 요령"
                items={heavyRainData_ko.발생_자동차}
              />
              <InfoSection
                title="호우 발생 시 실외 행동요령"
                items={heavyRainData_ko.발생_실외}
              />
              <InfoSection
                title="호우 후 복구·안전 요령"
                items={heavyRainData_ko.발생후}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Heavy Rain Preparedness Guidelines"
                items={heavyRainData_en.대비}
              />
              <InfoSection
                title="Indoor Guidelines During Heavy Rain"
                items={heavyRainData_en.발생_실내}
              />
              <InfoSection
                title="Driving Guidelines During Heavy Rain"
                items={heavyRainData_en.발생_자동차}
              />
              <InfoSection
                title="Outdoor Guidelines During Heavy Rain"
                items={heavyRainData_en.발생_실외}
              />
              <InfoSection
                title="Post-Heavy Rain Recovery and Safety"
                items={heavyRainData_en.발생후}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection title="暴雨应对指南" items={heavyRainData_ch.대비} />
              <InfoSection
                title="暴雨发生时室内行动指南"
                items={heavyRainData_ch.발생_실내}
              />
              <InfoSection
                title="暴雨发生时驾驶指南"
                items={heavyRainData_ch.발생_자동차}
              />
              <InfoSection
                title="暴雨发生时室外行动指南"
                items={heavyRainData_ch.발생_실외}
              />
              <InfoSection
                title="暴雨后的恢复和安全指南"
                items={heavyRainData_ch.발생후}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="豪雨対策ガイドライン"
                items={heavyRainData_jp.대비}
              />
              <InfoSection
                title="豪雨発生時の室内行動指針"
                items={heavyRainData_jp.발생_실내}
              />
              <InfoSection
                title="豪雨発生時の運転中の行動指針"
                items={heavyRainData_jp.발생_자동차}
              />
              <InfoSection
                title="豪雨発生時の屋外行動指針"
                items={heavyRainData_jp.발생_실외}
              />
              <InfoSection
                title="豪雨後の復旧と安全指針"
                items={heavyRainData_jp.발생후}
              />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "windstorm" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="강풍 대비 요령"
                items={windstormData_ko.강풍대비}
              />
              <InfoSection
                title="강풍 발생 시 - 실내"
                items={windstormData_ko.발생_실내}
              />
              <InfoSection
                title="강풍 발생 시 - 실외"
                items={windstormData_ko.발생_실외}
              />
              <InfoSection
                title="강풍 발생 시 - 자동차 운전 중"
                items={windstormData_ko.발생_운전중}
              />
              <InfoSection
                title="강풍 발생 후 점검 요령"
                items={windstormData_ko.발생후_점검}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Windstorm Preparedness Guidelines"
                items={windstormData_en.강풍대비}
              />
              <InfoSection
                title="Indoor Guidelines During Windstorm"
                items={windstormData_en.발생_실내}
              />
              <InfoSection
                title="Outdoor Guidelines During Windstorm"
                items={windstormData_en.발생_실외}
              />
              <InfoSection
                title="Driving Guidelines During Windstorm"
                items={windstormData_en.발생_운전중}
              />
              <InfoSection
                title="Post-Windstorm Inspection Guidelines"
                items={windstormData_en.발생후_점검}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="强风应对指南"
                items={windstormData_ch.강풍대비}
              />
              <InfoSection
                title="强风发生时室内行动指南"
                items={windstormData_ch.발생_실내}
              />
              <InfoSection
                title="强风发生时室外行动指南"
                items={windstormData_ch.발생_실외}
              />
              <InfoSection
                title="强风发生时驾驶指南"
                items={windstormData_ch.발생_운전중}
              />
              <InfoSection
                title="强风后的检查指南"
                items={windstormData_ch.발생후_점검}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="強風対策ガイドライン"
                items={windstormData_jp.강풍대비}
              />
              <InfoSection
                title="強風発生時の室内行動指針"
                items={windstormData_jp.발생_실내}
              />
              <InfoSection
                title="強風発生時の屋外行動指針"
                items={windstormData_jp.발생_실외}
              />
              <InfoSection
                title="強風発生時の運転中の行動指針"
                items={windstormData_jp.발생_운전중}
              />
              <InfoSection
                title="強風後の点検指針"
                items={windstormData_jp.발생후_점검}
              />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "flood" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="홍수 대비 요령"
                items={floodData_ko.홍수대비}
              />
              <InfoSection
                title="홍수 발생 시 실내 행동요령"
                items={floodData_ko.실내_발생}
              />
              <InfoSection
                title="홍수 발생 시 실외 행동요령"
                items={floodData_ko.실외_발생}
              />
              <InfoSection
                title="자동차 운전 시 주의사항"
                items={floodData_ko.자동차운전}
              />
              <InfoSection
                title="홍수 이후 행동요령"
                items={floodData_ko.홍수이후}
              />
              <InfoSection
                title="비상 연락처"
                items={floodData_ko.비상연락처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Flood Preparedness Guidelines"
                items={floodData_en.홍수대비}
              />
              <InfoSection
                title="Indoor Guidelines During Flood"
                items={floodData_en.실내_발생}
              />
              <InfoSection
                title="Outdoor Guidelines During Flood"
                items={floodData_en.실외_발생}
              />
              <InfoSection
                title="Driving Guidelines During Flood"
                items={floodData_en.자동차운전}
              />
              <InfoSection
                title="Post-Flood Recovery Guidelines"
                items={floodData_en.홍수이후}
              />
              <InfoSection
                title="Emergency Contacts"
                items={floodData_en.비상연락처}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection title="洪水应对指南" items={floodData_ch.홍수대비} />
              <InfoSection
                title="洪水发生时室内行动指南"
                items={floodData_ch.실내_발생}
              />
              <InfoSection
                title="洪水发生时室外行动指南"
                items={floodData_ch.실외_발생}
              />
              <InfoSection
                title="洪水发生时驾驶指南"
                items={floodData_ch.자동차운전}
              />
              <InfoSection
                title="洪水后的恢复指南"
                items={floodData_ch.홍수이후}
              />
              <InfoSection
                title="紧急联系方式"
                items={floodData_ch.비상연락처}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="洪水対策ガイドライン"
                items={floodData_jp.홍수대비}
              />
              <InfoSection
                title="洪水発生時の室内行動指針"
                items={floodData_jp.실내_발생}
              />
              <InfoSection
                title="洪水発生時の屋外行動指針"
                items={floodData_jp.실외_발생}
              />
              <InfoSection
                title="洪水発生時の運転中の行動指針"
                items={floodData_jp.자동차운전}
              />
              <InfoSection
                title="洪水後の復旧ガイドライン"
                items={floodData_jp.홍수이후}
              />
              <InfoSection title="緊急連絡先" items={floodData_jp.비상연락처} />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "landslide" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="사고 대비 요령"
                items={landslideData_ko.사고대비}
              />
              <InfoSection
                title="주의보 발생 시 - 취약지역 주민"
                items={landslideData_ko.주의보_취약지역}
              />
              <InfoSection
                title="주의보 발생 시 - 일반 시민"
                items={landslideData_ko.주의보_일반시민}
              />
              <InfoSection
                title="경보 발생 시 - 취약지역 주민"
                items={landslideData_ko.경보_취약지역}
              />
              <InfoSection
                title="경보 발생 시 - 일반 시민"
                items={landslideData_ko.경보_일반시민}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Landslide Preparedness Guidelines"
                items={landslideData_en.사고대비}
              />
              <InfoSection
                title="During Advisory - Residents in Vulnerable Areas"
                items={landslideData_en.주의보_취약지역}
              />
              <InfoSection
                title="During Advisory - General Citizens"
                items={landslideData_en.주의보_일반시민}
              />
              <InfoSection
                title="During Warning - Residents in Vulnerable Areas"
                items={landslideData_en.경보_취약지역}
              />
              <InfoSection
                title="During Warning - General Citizens"
                items={landslideData_en.경보_일반시민}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="滑坡应对指南"
                items={landslideData_ch.사고대비}
              />
              <InfoSection
                title="注意预警时 - 易受影响地区居民"
                items={landslideData_ch.주의보_취약지역}
              />
              <InfoSection
                title="注意预警时 - 普通市民"
                items={landslideData_ch.주의보_일반시민}
              />
              <InfoSection
                title="警报时 - 易受影响地区居民"
                items={landslideData_ch.경보_취약지역}
              />
              <InfoSection
                title="警报时 - 普通市民"
                items={landslideData_ch.경보_일반시민}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="土砂災害対策ガイドライン"
                items={landslideData_jp.사고대비}
              />
              <InfoSection
                title="注意報発令時 - 脆弱地域の住民"
                items={landslideData_jp.주의보_취약지역}
              />
              <InfoSection
                title="注意報発令時 - 一般市民"
                items={landslideData_jp.주의보_일반시민}
              />
              <InfoSection
                title="警報発令時 - 脆弱地域の住民"
                items={landslideData_jp.경보_취약지역}
              />
              <InfoSection
                title="警報発令時 - 一般市民"
                items={landslideData_jp.경보_일반시민}
              />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "drought" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="주방 및 세탁 시 물 절약"
                items={droughtData_ko.실내_주방_세탁}
              />
              <InfoSection
                title="화장실 및 욕실 이용 시 물 절약"
                items={droughtData_ko.실내_화장실_욕실}
              />
              <InfoSection
                title="실외에서의 물 절약"
                items={droughtData_ko.실외}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Water Conservation in Kitchen and Laundry"
                items={droughtData_en.실내_주방_세탁}
              />
              <InfoSection
                title="Water Conservation in Bathroom and Toilet"
                items={droughtData_en.실내_화장실_욕실}
              />
              <InfoSection
                title="Water Conservation Outdoors"
                items={droughtData_en.실외}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="厨房和洗衣时节约用水"
                items={droughtData_ch.실내_주방_세탁}
              />
              <InfoSection
                title="卫生间和浴室使用时节约用水"
                items={droughtData_ch.실내_화장실_욕실}
              />
              <InfoSection title="室外节约用水" items={droughtData_ch.실외} />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="キッチンと洗濯での節水"
                items={droughtData_jp.실내_주방_세탁}
              />
              <InfoSection
                title="トイレと浴室での節水"
                items={droughtData_jp.실내_화장실_욕실}
              />
              <InfoSection title="屋外での節水" items={droughtData_jp.실외} />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "snowstorm" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="대설 대비 요령"
                items={snowstormData_ko.대설대비}
              />
              <InfoSection
                title="대설 발생 시 - 실내"
                items={snowstormData_ko.발생_실내}
              />
              <InfoSection
                title="대설 발생 시 - 실외"
                items={snowstormData_ko.발생_실외}
              />
              <InfoSection
                title="대설 발생 시 - 자동차 운전 중"
                items={snowstormData_ko.발생_운전중}
              />
              <InfoSection
                title="차량 고립 시 행동요령"
                items={snowstormData_ko.차량고립시}
              />
              <InfoSection
                title="응급처치 요령"
                items={snowstormData_ko.응급처치}
              />
            </>
          )}

          {language === "en" && (
            <>
              <InfoSection
                title="Snowstorm Preparedness Guidelines"
                items={snowstormData_en.대설대비}
              />
              <InfoSection
                title="During Snowstorm - Indoors"
                items={snowstormData_en.발생_실내}
              />
              <InfoSection
                title="During Snowstorm - Outdoors"
                items={snowstormData_en.발생_실외}
              />
              <InfoSection
                title="During Snowstorm - Driving"
                items={snowstormData_en.발생_운전중}
              />
              <InfoSection
                title="Guidelines for Vehicle Isolation"
                items={snowstormData_en.차량고립시}
              />
              <InfoSection
                title="Emergency First Aid Guidelines"
                items={snowstormData_en.응급처치}
              />
            </>
          )}

          {language === "zh" && (
            <>
              <InfoSection
                title="暴雪应对指南"
                items={snowstormData_ch.대설대비}
              />
              <InfoSection
                title="暴雪发生时 - 室内"
                items={snowstormData_ch.발생_실내}
              />
              <InfoSection
                title="暴雪发生时 - 室外"
                items={snowstormData_ch.발생_실외}
              />
              <InfoSection
                title="暴雪发生时 - 驾驶中"
                items={snowstormData_ch.발생_운전중}
              />
              <InfoSection
                title="车辆被困时的行动指南"
                items={snowstormData_ch.차량고립시}
              />
              <InfoSection
                title="紧急急救指南"
                items={snowstormData_ch.응급처치}
              />
            </>
          )}

          {language === "ja" && (
            <>
              <InfoSection
                title="大雪対策ガイドライン"
                items={snowstormData_jp.대설대비}
              />
              <InfoSection
                title="大雪発生時 - 室内"
                items={snowstormData_jp.발생_실내}
              />
              <InfoSection
                title="大雪発生時 - 屋外"
                items={snowstormData_jp.발생_실외}
              />
              <InfoSection
                title="大雪発生時 - 運転中"
                items={snowstormData_jp.발생_운전중}
              />
              <InfoSection
                title="車両孤立時の行動指針"
                items={snowstormData_jp.차량고립시}
              />
              <InfoSection
                title="応急処置ガイドライン"
                items={snowstormData_jp.응급처치}
              />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "cold" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="한파 대비 요령"
                items={coldWaveData_ko.한파대비}
              />
              <InfoSection
                title="한파 발생 시 실내 행동요령"
                items={coldWaveData_ko.실내_발생}
              />
              <InfoSection
                title="한파 발생 시 실외 행동요령"
                items={coldWaveData_ko.실외_발생}
              />
              <InfoSection
                title="한파 시 운동 요령"
                items={coldWaveData_ko.운동시}
              />
              <InfoSection
                title="한파 시 자동차 운전 요령"
                items={coldWaveData_ko.운전중}
              />
              <InfoSection
                title="전기 사용 시 주의사항"
                items={coldWaveData_ko.전기사용}
              />
              <InfoSection
                title="비상 연락처"
                items={coldWaveData_ko.비상연락처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Cold Wave Preparedness Guidelines"
                items={coldWaveData_en.한파대비}
              />
              <InfoSection
                title="Indoor Guidelines During Cold Wave"
                items={coldWaveData_en.실내_발생}
              />
              <InfoSection
                title="Outdoor Guidelines During Cold Wave"
                items={coldWaveData_en.실외_발생}
              />
              <InfoSection
                title="Exercise Guidelines During Cold Wave"
                items={coldWaveData_en.운동시}
              />
              <InfoSection
                title="Driving Guidelines During Cold Wave"
                items={coldWaveData_en.운전중}
              />
              <InfoSection
                title="Electricity Usage Precautions"
                items={coldWaveData_en.전기사용}
              />
              <InfoSection
                title="Emergency Contacts"
                items={coldWaveData_en.비상연락처}
              />
            </>
          )}

          {language === "zh" && (
            <>
              <InfoSection
                title="寒潮应对指南"
                items={coldWaveData_ch.한파대비}
              />
              <InfoSection
                title="寒潮发生时室内行动指南"
                items={coldWaveData_ch.실내_발생}
              />
              <InfoSection
                title="寒潮发生时室外行动指南"
                items={coldWaveData_ch.실외_발생}
              />
              <InfoSection
                title="寒潮时运动指南"
                items={coldWaveData_ch.운동시}
              />
              <InfoSection
                title="寒潮时驾驶指南"
                items={coldWaveData_ch.운전중}
              />
              <InfoSection
                title="用电注意事项"
                items={coldWaveData_ch.전기사용}
              />
              <InfoSection
                title="紧急联系方式"
                items={coldWaveData_ch.비상연락처}
              />
            </>
          )}

          {language === "ja" && (
            <>
              <InfoSection
                title="寒波対策ガイドライン"
                items={coldWaveData_jp.한파대비}
              />
              <InfoSection
                title="寒波発生時の室内行動指針"
                items={coldWaveData_jp.실내_발생}
              />
              <InfoSection
                title="寒波発生時の屋外行動指針"
                items={coldWaveData_jp.실외_발생}
              />
              <InfoSection
                title="寒波時の運動指針"
                items={coldWaveData_jp.운동시}
              />
              <InfoSection
                title="寒波時の運転中の行動指針"
                items={coldWaveData_jp.운전중}
              />
              <InfoSection
                title="電気使用時の注意事項"
                items={coldWaveData_jp.전기사용}
              />
              <InfoSection
                title="緊急連絡先"
                items={coldWaveData_jp.비상연락처}
              />
            </>
          )}
        </ScrollView>
      )}

      {emergency === "volcano" && (
        <ScrollView>
          {language === "ko" && (
            <>
              <InfoSection
                title="화산재 낙하 대비 요령"
                items={volcanoData_ko.화산재_낙하_대비}
              />
              <InfoSection
                title="화산재 낙하 중 행동요령"
                items={volcanoData_ko.화산재_낙하_중}
              />
              <InfoSection
                title="화산재 낙하 후 청소 요령"
                items={volcanoData_ko.화산재_낙하_후}
              />
              <InfoSection
                title="자동차 운전 시 주의사항"
                items={volcanoData_ko.자동차_운전}
              />
              <InfoSection
                title="왜 화산재를 청소해야 할까요?"
                items={volcanoData_ko.왜_화산재를_청소해야_할까}
              />
              <InfoSection
                title="비상 연락처"
                items={volcanoData_ko.비상연락처}
              />
            </>
          )}
          {language === "en" && (
            <>
              <InfoSection
                title="Volcanic Ashfall Preparedness Guidelines"
                items={volcanoData_en.화산재_낙하_대비}
              />
              <InfoSection
                title="Actions During Volcanic Ashfall"
                items={volcanoData_en.화산재_낙하_중}
              />
              <InfoSection
                title="Post-Ashfall Cleaning Guidelines"
                items={volcanoData_en.화산재_낙하_후}
              />
              <InfoSection
                title="Driving Precautions During Ashfall"
                items={volcanoData_en.자동차_운전}
              />
              <InfoSection
                title="Why Should You Clean Volcanic Ash?"
                items={volcanoData_en.왜_화산재를_청소해야_할까}
              />
              <InfoSection
                title="Emergency Contacts"
                items={volcanoData_en.비상연락처}
              />
            </>
          )}
          {language === "zh" && (
            <>
              <InfoSection
                title="火山灰应对指南"
                items={volcanoData_ch.화산재_낙하_대비}
              />
              <InfoSection
                title="火山灰降落时的行动指南"
                items={volcanoData_ch.화산재_낙하_중}
              />
              <InfoSection
                title="火山灰降落后的清理指南"
                items={volcanoData_ch.화산재_낙하_후}
              />
              <InfoSection
                title="火山灰降落时驾驶注意事项"
                items={volcanoData_ch.자동차_운전}
              />
              <InfoSection
                title="为什么要清理火山灰？"
                items={volcanoData_ch.왜_화산재를_청소해야_할까}
              />
              <InfoSection
                title="紧急联系方式"
                items={volcanoData_ch.비상연락처}
              />
            </>
          )}
          {language === "ja" && (
            <>
              <InfoSection
                title="火山灰対策ガイドライン"
                items={volcanoData_jp.화산재_낙하_대비}
              />
              <InfoSection
                title="火山灰降下時の行動指針"
                items={volcanoData_jp.화산재_낙하_중}
              />
              <InfoSection
                title="火山灰降下後の清掃指針"
                items={volcanoData_jp.화산재_낙하_후}
              />
              <InfoSection
                title="火山灰降下時の運転注意事項"
                items={volcanoData_jp.자동차_운전}
              />
              <InfoSection
                title="なぜ火山灰を清掃する必要があるのか？"
                items={volcanoData_jp.왜_화산재를_청소해야_할까}
              />
              <InfoSection
                title="緊急連絡先"
                items={volcanoData_jp.비상연락처}
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
