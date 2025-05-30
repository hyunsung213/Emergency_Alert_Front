import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DisasterAlertItem,
  getDisasterAlerts,
  getDisasterAlertsByRegion,
} from "@/lib/api/disasterAlertAPI";
import DisasterShortInfo from "./DisasterShortInfo";
import * as Location from "expo-location";
import { koreanRegionsMap, useLanguage } from "@/contexts/LanguageContext";
import { TranslatedText, TranslatedTextView } from "./ui/TranslatedText";

interface DisasterMessageProps {
  maxMessages?: number;
  autoScrollInterval?: number; // in milliseconds
  onPress?: (alert: DisasterAlertItem) => void;
}

const { width } = Dimensions.get("window");

const DisasterMessage: React.FC<DisasterMessageProps> = ({
  maxMessages = 5,
  autoScrollInterval = 5000, // 5 seconds
}) => {
  const { t, effectiveLanguage, language } = useLanguage();
  const [regionName, setRegionName] = useState<string>("");
  const [alerts, setAlerts] = useState<DisasterAlertItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const translateX = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // 슬라이드 타이머 참조
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const translateMainRegion = (
    regionName: string,
    language: string
  ): string => {
    // Look up the region in the koreanRegionsMap
    const regionData = koreanRegionsMap.get(regionName);
    if (regionData && regionData.name[language as "en" | "ja" | "zh"]) {
      return regionData.name[language as "en" | "ja" | "zh"];
    }

    // If the region isn't in the map, or there's no translation for this language
    return regionName;
  };

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          t(
            "locationPermissionDenied",
            "위치 권한에 대한 승인이 누락되었습니다."
          )
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const location_user = await Location.getCurrentPositionAsync({});
        // Get region name from coordinates
        const geocode = await Location.reverseGeocodeAsync({
          latitude: location_user.coords.latitude,
          longitude: location_user.coords.longitude,
        });

        if (geocode && geocode.length > 0) {
          // Extract region names for API query
          const region = geocode[0];
          let regionQuery = "";

          // Korean APIs typically use administrative areas
          if (region.region) regionQuery = region.region; // Province/State/City
          if (region.subregion) {
            regionQuery = regionQuery
              ? `${regionQuery} ${region.subregion}`
              : region.subregion;
          }

          setRegionName(regionQuery);
        }
      } catch (error) {
        setErrorMsg(
          t("locationError", "위치를 불러오는 중 오류가 발생했습니다.")
        );
      } finally {
        setLoading(false);
      }
    }

    getCurrentLocation();
  }, [t]);

  // Fetch recent disaster alerts
  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true);
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const todayStr = `${year}${month}${day}`;

        const data = await getDisasterAlertsByRegion(regionName, todayStr);

        if (data && data.length > 0) {
          setAlerts(data);
        } else {
          // If no data for today, fetch data for yesterday and the day before yesterday
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const dayBeforeYesterday = new Date();
          dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

          const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}${month}${day}`;
          };

          const yesterdayStr = formatDate(yesterday);
          const dayBeforeYesterdayStr = formatDate(dayBeforeYesterday);

          const [fallbackDataYesterday, fallbackDataDayBeforeYesterday] =
            await Promise.all([
              getDisasterAlertsByRegion(regionName, yesterdayStr),
              getDisasterAlertsByRegion(regionName, dayBeforeYesterdayStr),
            ]);

          const combinedAlerts = [
            ...(fallbackDataYesterday || []),
            ...(fallbackDataDayBeforeYesterday || []),
          ];

          if (combinedAlerts.length > 0) {
            setAlerts(combinedAlerts);
          }
        }
      } catch (error) {
        console.error(
          "Failed to fetch disaster alerts for message bar:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts();
  }, [maxMessages, regionName]);

  // Auto-scroll to next message
  useEffect(() => {
    if (alerts.length <= 1 || modalVisible) return;

    const interval = setInterval(() => {
      // Animate out current message
      Animated.timing(translateX, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Update index and reset position
        setCurrentIndex((prevIndex) => (prevIndex + 1) % alerts.length);
        translateX.setValue(width);

        // Animate in new message
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [alerts.length, autoScrollInterval, translateX, modalVisible]);

  // Get emergency color based on alert level
  const getEmergencyColor = (level: string) => {
    if (!level) return "#007AFF";

    const emergencyLevel = level.toLowerCase();

    if (emergencyLevel.includes("위급")) return "#FF3B30";
    if (emergencyLevel.includes("긴급")) return "#FF9500";
    if (emergencyLevel.includes("안전")) return "#34C759";

    return "#007AFF"; // Default blue
  };

  // Get icon based on disaster type
  const getDisasterIcon = (disasterType: string) => {
    if (!disasterType) return "notifications-active";

    const type = disasterType.toLowerCase();

    if (type.includes("지진")) return "public";
    if (type.includes("호우") || type.includes("홍수")) return "water";
    if (type.includes("태풍")) return "cyclone";
    if (type.includes("산불") || type.includes("화재"))
      return "local-fire-department";
    if (type.includes("폭염")) return "wb-sunny";
    if (type.includes("한파")) return "ac-unit";
    if (type.includes("코로나") || type.includes("감염")) return "coronavirus";
    if (type.includes("안전") || type.includes("대피")) return "warning";

    return "notifications-active"; // Default icon
  };

  // Extract location from message
  const extractLocation = (regionText: string) => {
    if (!regionText) return "";
    return regionText.split(" ")[0]; // Just take the first part of the region name
  };

  // Format message for display
  const formatMessage = (message: string) => {
    if (!message) return "";
    // Truncate if too long
    return message.length > 80 ? message.substring(0, 77) + "..." : message;
  };

  // If no alerts or still loading, show placeholder
  if (loading || alerts.length === 0) {
    return null; // Or return a placeholder component
  }

  const currentAlert = alerts[currentIndex];
  const currentAlertLocation = extractLocation(currentAlert.RCPTN_RGN_NM);
  const currentAlertMessage = currentAlert.MSG_CN;
  const backgroundColor = getEmergencyColor(currentAlert.EMRG_STEP_NM);
  const iconName = getDisasterIcon(currentAlert.DST_SE_NM);

  return (
    <>
      <TouchableOpacity
        style={[styles.container, { backgroundColor }]}
        onPress={() => setModalVisible(true)} // 모달 열기
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons name={iconName} size={18} color="white" />
        </View>

        <Animated.View
          style={[styles.messageContainer, { transform: [{ translateX }] }]}
        >
          <Text style={styles.messageText}>
            <Text style={styles.locationText}>
              [
              {translateMainRegion(
                extractLocation(currentAlert.RCPTN_RGN_NM),
                effectiveLanguage
              )}
              ]
            </Text>{" "}
            <TranslatedText text={formatMessage(currentAlert.MSG_CN)} />
          </Text>
        </Animated.View>

        {alerts.length > 1 && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>
              {currentIndex + 1}/{alerts.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // 모달 닫기
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} // 모달 닫기
              activeOpacity={1}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              {t("disasterInfo", "재난 정보")}
            </Text>

            <View style={styles.modalMessageContainer}>
              <View style={styles.modalMessageHeader}>
                <Text style={styles.modalLocationText}>
                  {translateMainRegion(
                    extractLocation(currentAlert.RCPTN_RGN_NM),
                    effectiveLanguage
                  )}
                </Text>
              </View>

              <TranslatedTextView text={currentAlert.MSG_CN} />
            </View>

            {/* DisasterShortInfo 컴포넌트 렌더링 */}
            <View style={styles.modalInfoContainer}>
              <DisasterShortInfo alert={currentAlert} language={language} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

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
    backgroundColor: "#b0a8b9", // 초록색 배경
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
  modalMessageText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  modalLocationText: {
    fontWeight: "bold",
    color: "#34C759",
    fontSize: 18,
  },
  modalInfoContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 6,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalMessageContainer: {
    marginBottom: 16, // 메시지와 추가 정보 간격
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalMessageHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  modalMessageContent: {
    marginTop: 4,
  },
});

export default DisasterMessage;
