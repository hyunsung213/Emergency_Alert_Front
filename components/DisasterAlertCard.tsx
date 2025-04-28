import { DisasterAlertItem } from "@/lib/api/disasterAlertAPI";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const getDisasterIcon = (disasterType: string) => {
  if (!disasterType) return "notifications-active";

  const type = disasterType.toLowerCase();

  if (type.includes("지진") || type.includes("earthquake")) return "public";
  if (
    type.includes("호우") ||
    type.includes("홍수") ||
    type.includes("rain") ||
    type.includes("flood")
  )
    return "water";
  if (type.includes("태풍") || type.includes("typhoon")) return "cyclone";
  if (type.includes("산불") || type.includes("화재") || type.includes("fire"))
    return "local-fire-department";
  if (type.includes("폭염") || type.includes("heat")) return "wb-sunny";
  if (type.includes("한파") || type.includes("cold")) return "ac-unit";
  if (
    type.includes("코로나") ||
    type.includes("감염") ||
    type.includes("covid") ||
    type.includes("infectious")
  )
    return "coronavirus";
  if (type.includes("안전") || type.includes("대피") || type.includes("safety"))
    return "warning";

  return "notifications-active"; // Default icon
};

// Get color based on emergency level
const getEmergencyColor = (level: string) => {
  if (!level) return "#007aff";

  const emergencyLevel = level.toLowerCase();

  if (emergencyLevel.includes("위급") || emergencyLevel.includes("emergency"))
    return "#ff3b30";
  if (emergencyLevel.includes("긴급") || emergencyLevel.includes("warning"))
    return "#ff9500";
  if (emergencyLevel.includes("안전") || emergencyLevel.includes("safety"))
    return "#34c759";

  return "#007aff"; // Default blue
};

export default function DisasterAlertCard({
  item,
}: {
  item: DisasterAlertItem;
}) {
  return (
    <TouchableOpacity style={styles.alertCard}>
      <View style={styles.alertHeader}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={getDisasterIcon(item.DST_SE_NM)}
            size={24}
            color={getEmergencyColor(item.EMRG_STEP_NM)}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.alertType}>
            {item.DST_SE_NM
              ? t(item.DST_SE_NM, item.DST_SE_NM)
              : t("notification", "재난 알림")}
          </Text>
          <Text style={styles.alertDate}>{formatDate(item.CRT_DT)}</Text>
        </View>
        <View
          style={[
            styles.levelBadge,
            { backgroundColor: getEmergencyColor(item.EMRG_STEP_NM) },
          ]}
        >
          <Text style={styles.levelText}>
            {item.EMRG_STEP_NM
              ? t(item.EMRG_STEP_NM, item.EMRG_STEP_NM)
              : t("notice", "알림")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#007AFF",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  iconContainer: {
    marginRight: 8,
  },
  messageContainer: {
    flex: 1,
  },
  messageText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
  locationText: {
    fontWeight: "bold",
  },
  counterContainer: {
    marginLeft: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  counterText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
  },
  modalContent: {
    width: "90%", // 화면의 90% 너비
    height: "80%", // 화면의 80% 높이
    backgroundColor: "white",
    borderRadius: 16, // 둥근 모서리
    padding: 20, // 내부 간격
    elevation: 5, // 그림자 효과
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#34C759", // 초록색 배경
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16, // 제목과 내용 간격
  },
});
