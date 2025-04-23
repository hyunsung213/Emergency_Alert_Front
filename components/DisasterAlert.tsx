import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DisasterAlertItem,
  getDisasterAlerts,
  getDisasterAlertsByRegion,
} from "@/lib/api/disasterAlertAPI";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TranslatedTextView,
  TranslatedText,
} from "@/components/ui/TranslatedText";

const DisasterAlert = () => {
  const { t, effectiveLanguage } = useLanguage();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [disasterAlerts, setDisasterAlerts] = useState<DisasterAlertItem[]>([]);
  const [regionName, setRegionName] = useState<string>("");
  const [showTranslations, setShowTranslations] = useState(
    effectiveLanguage !== "ko"
  );

  // Get current location
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
        let location_user = await Location.getCurrentPositionAsync({});
        setLocation(location_user);

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

  // When language changes, update translation preference
  useEffect(() => {
    setShowTranslations(effectiveLanguage !== "ko");
  }, [effectiveLanguage]);

  // Fetch disaster alerts when region is determined
  useEffect(() => {
    async function fetchDisasterAlerts() {
      if (!regionName) return;

      try {
        setLoading(true);

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const todayStr = `${year}${month}${day}`;

        // First try to get regional alerts
        let alerts = await getDisasterAlertsByRegion(regionName, todayStr);

        // If no regional alerts, get recent nationwide alerts
        if (!alerts || alerts.length === 0) {
          // Get recent dates in YYYYMMDD format (today and past 6 days)
          const dates = [];
          for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            dates.push(`${year}${month}${day}`);
          }

          // Try to get alerts for each day, starting with today
          for (const dateStr of dates) {
            const dateAlerts = await getDisasterAlerts({
              numOfRows: 10,
              pageNo: 1,
              crtDt: dateStr,
            });

            if (dateAlerts && dateAlerts.length > 0) {
              alerts = dateAlerts;
              break; // Stop searching once we find alerts
            }
          }

          // If still no alerts, try without date filter but with larger result set
          if (!alerts || alerts.length === 0) {
            alerts = await getDisasterAlerts({
              numOfRows: 30,
              pageNo: 1,
            });
          }
        }

        console.log(`Found ${alerts?.length || 0} disaster alerts`);
        setDisasterAlerts(alerts || []);
      } catch (error) {
        console.error("Failed to fetch disaster alerts:", error);
        setErrorMsg(
          t("alertFetchError", "재난 경보를 불러오는데 실패했습니다.")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDisasterAlerts();
  }, [regionName]);

  // Format date for display (YYYY-MM-DD HH:MM)
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    // Handle format like "2023/09/16 11:09:49"
    try {
      const parts = dateString.split(" ");
      if (parts.length === 2) {
        return `${parts[0].replace(/\//g, "-")} ${parts[1].substring(0, 5)}`;
      }
      return dateString;
    } catch (e) {
      return dateString; // Return original if parsing fails
    }
  };

  // Get appropriate icon based on disaster type
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
    if (
      type.includes("안전") ||
      type.includes("대피") ||
      type.includes("safety")
    )
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

  // Render each disaster alert item
  const renderAlertItem = ({ item }: { item: DisasterAlertItem }) => (
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

      {/* Alert content with translation */}
      {showTranslations && effectiveLanguage !== "ko" ? (
        <TranslatedTextView
          text={item.MSG_CN}
          style={styles.alertContent}
          showToggle={true}
        />
      ) : (
        <Text style={styles.alertContent}>{item.MSG_CN}</Text>
      )}

      <View style={styles.alertFooter}>
        <Text style={styles.regionText}>
          {t("region", "지역")}: {/* Region with translation */}
          {showTranslations && effectiveLanguage !== "ko" ? (
            <TranslatedText
              text={item.RCPTN_RGN_NM || t("nationwide", "전국")}
              style={styles.regionValue}
              numberOfLines={1}
            />
          ) : (
            <Text style={styles.regionValue}>
              {item.RCPTN_RGN_NM || t("nationwide", "전국")}
            </Text>
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Loading view
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>
          {t("loadingAlerts", "재난 경보를 불러오는 중...")}
        </Text>
      </View>
    );
  }

  // Error view
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="error-outline" size={48} color="#ff3b30" />
        <Text style={styles.errorText}>{errorMsg}</Text>
        <Text style={styles.subText}>
          {t(
            "errorSubtext",
            "앱을 다시 시작하시거나 인터넷 연결을 확인해주세요."
          )}
        </Text>
      </View>
    );
  }

  // Empty state
  if (!disasterAlerts || disasterAlerts.length === 0) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="notifications-none" size={64} color="#8e8e93" />
        <Text style={styles.emptyText}>
          {t("noActiveAlerts", "현재 활성화된 재난 경보가 없습니다")}
        </Text>
        <Text style={styles.subText}>
          {regionName
            ? t(
                "noRegionalAlerts",
                `${regionName} 지역에 활성화된 재난 경보가 없습니다.`
              )
            : t("noNationalAlerts", "전국에 활성화된 재난 경보가 없습니다.")}
        </Text>
      </View>
    );
  }

  // Main view with alerts
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("disasterAlerts", "재난 경보")}</Text>
      {regionName && (
        <Text style={styles.regionTitle}>
          {regionName} {t("region", "지역")}
        </Text>
      )}

      <FlatList
        data={disasterAlerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.SN}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f7",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  regionTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  toggleLabel: {
    fontSize: 16,
    color: "#333",
  },
  translationLoadingBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    width: "100%",
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    marginBottom: 12,
  },
  translationLoadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#0066cc",
  },
  listContainer: {
    paddingBottom: 20,
    width: "100%",
  },
  alertCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    width: "100%",
  },
  alertHeader: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f2f2f7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  alertType: {
    fontSize: 16,
    fontWeight: "600",
  },
  alertDate: {
    fontSize: 14,
    color: "#8e8e93",
    marginTop: 2,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#ff3b30",
  },
  levelText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  alertContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  alertFooter: {
    borderTopWidth: 1,
    borderTopColor: "#f2f2f7",
    paddingTop: 12,
  },
  regionText: {
    fontSize: 14,
    color: "#666",
  },
  regionValue: {
    fontSize: 14,
    color: "#666",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff3b30",
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: "#8e8e93",
    textAlign: "center",
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#3a3a3c",
  },
});

export default DisasterAlert;
