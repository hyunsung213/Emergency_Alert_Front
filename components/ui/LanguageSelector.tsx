import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/api/papagoAPI";

interface LanguageSelectorProps {
  compact?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
}) => {
  const { language, setLanguage, t, languageOptions } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  // Handle language selection
  const handleSelectLanguage = (value: Language) => {
    setLanguage(value);
    setModalVisible(false);
  };

  // Get the current language display name
  const getCurrentLanguageLabel = () => {
    return (
      languageOptions.find((option) => option.value === language)?.label ||
      t("autoDetect")
    );
  };

  // Render a compact version (just an icon button)
  if (compact) {
    return (
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.compactButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="language" size={24} color="#28a745" />
        </TouchableOpacity>

        <LanguageModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={handleSelectLanguage}
          currentLanguage={language}
        />
      </View>
    );
  }

  // Render the full selector
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("language", "언어")}</Text>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>{getCurrentLanguageLabel()}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#007AFF" />
      </TouchableOpacity>

      <LanguageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelectLanguage}
        currentLanguage={language}
      />
    </View>
  );
};

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (language: Language) => void;
  currentLanguage: Language;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  visible,
  onClose,
  onSelect,
  currentLanguage,
}) => {
  const { languageOptions, t } = useLanguage();

  const renderItem = ({
    item,
  }: {
    item: { value: Language; label: string };
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.languageOption,
          currentLanguage === item.value && styles.selectedLanguage,
        ]}
        onPress={() => onSelect(item.value)}
      >
        <Text
          style={[
            styles.languageText,
            currentLanguage === item.value && styles.selectedLanguageText,
          ]}
        >
          {item.label}
        </Text>
        {currentLanguage === item.value && (
          <MaterialIcons name="check" size={20} color="#007AFF" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {t("language", "언어 선택")}
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={languageOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
              style={styles.languageList}
              contentContainerStyle={styles.listContent}
            />
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectorText: {
    fontSize: 16,
    color: "#333",
  },
  compactButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  languageList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedLanguage: {
    backgroundColor: "#f0f8ff",
  },
  languageText: {
    fontSize: 16,
    color: "#333",
  },
  selectedLanguageText: {
    fontWeight: "600",
    color: "#007AFF",
  },
});

export default LanguageSelector;
