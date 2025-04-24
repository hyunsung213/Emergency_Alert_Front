import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";

const EmergencyCall = () => {
  const { t } = useLanguage();

  const handleEmergencyCall = async () => {
    const phoneNumber = "119";
    const phoneUrl = `tel:${phoneNumber}`;

    try {
      // Check if the device can open the phone URL
      const canOpen = await Linking.canOpenURL(phoneUrl);

      if (canOpen) {
        // Show confirmation dialog
        Alert.alert(
          t("emergencyCallConfirm", "긴급 전화"),
          t("emergencyCallMessage", "119에 긴급 전화를 걸겠습니까?"),
          [
            {
              text: t("cancel", "취소"),
              style: "cancel",
            },
            {
              text: t("call", "전화"),
              onPress: () => Linking.openURL(phoneUrl),
              style: "destructive",
            },
          ],
          { cancelable: true }
        );
      } else {
        Alert.alert(
          t("error", "오류"),
          t("cannotMakeCall", "전화를 걸 수 없습니다."),
          [{ text: t("ok", "확인") }]
        );
      }
    } catch (error) {
      console.error("Error making emergency call:", error);
      Alert.alert(
        t("error", "오류"),
        t("callError", "전화 연결 중 오류가 발생했습니다."),
        [{ text: t("ok", "확인") }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.emergencyCallButton}
        onPress={handleEmergencyCall}
        activeOpacity={0.7}
        accessibilityLabel={t("emergencyCall", "긴급 전화 (119)")}
      >
        <MaterialIcons name="phone-in-talk" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    position: "absolute",
    right: "4%",
    bottom: "10%",
    zIndex: 1000,
  },
  emergencyCallButton: {
    backgroundColor: "#ff3b30",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  emergencyText: {
    color: "#ff3b30",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
});

export default EmergencyCall;
