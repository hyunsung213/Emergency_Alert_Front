import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DisasterAlertItem,
  getDisasterAlerts,
} from "@/lib/api/disasterAlertAPI";

interface DisasterMessageProps {
  maxMessages?: number;
  autoScrollInterval?: number; // in milliseconds
  onPress?: (alert: DisasterAlertItem) => void;
}

const { width } = Dimensions.get("window");

const DisasterMessage: React.FC<DisasterMessageProps> = ({
  maxMessages = 5,
  autoScrollInterval = 5000, // 5 seconds
  onPress,
}) => {
  const [alerts, setAlerts] = useState<DisasterAlertItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const translateX = useRef(new Animated.Value(0)).current;

  // Fetch recent disaster alerts
  useEffect(() => {
    async function fetchAlerts() {
      try {
        const data = await getDisasterAlerts({
          numOfRows: maxMessages,
          pageNo: 1,
        });

        if (data && data.length > 0) {
          setAlerts(data);
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
  }, [maxMessages]);

  // Auto-scroll to next message
  useEffect(() => {
    if (alerts.length <= 1) return;

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
  }, [alerts.length, autoScrollInterval, translateX]);

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
  const backgroundColor = getEmergencyColor(currentAlert.EMRG_STEP_NM);
  const iconName = getDisasterIcon(currentAlert.DST_SE_NM);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={() => onPress && onPress(currentAlert)}
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
            [{extractLocation(currentAlert.RCPTN_RGN_NM)}]
          </Text>{" "}
          {formatMessage(currentAlert.MSG_CN)}
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
});

export default DisasterMessage;
