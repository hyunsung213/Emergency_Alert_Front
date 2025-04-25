import { earthquakeData } from "@/data/disasterData/earthquakeData";
import { DisasterAlertItem } from "@/lib/api/disasterAlertAPI";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DisasterInfo from "./DisasterInfo";

export default function DisasterShortInfo({
  alert,
}: {
  alert: DisasterAlertItem;
}) {
  const dst_se_nm = alert.DST_SE_NM; // 재해구분명
  const disasterTypes: { [key: string]: string } = {
    지진: "earthquake",
    미세먼지: "dust",
    황사: "dust",
    폭염: "heat",
    태풍: "typhoon",
    호우: "downpour",
    강풍: "windstorm",
    홍수: "flood",
    산사태: "landslide",
    가뭄: "drought",
    대설: "snowstorm",
    한파: "cold",
    화산폭발: "volcano",
  };

  return <DisasterInfo emergency={disasterTypes[dst_se_nm]} />;
}
