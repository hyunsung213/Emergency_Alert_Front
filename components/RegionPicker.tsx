import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { koreanRegionsMap, useLanguage } from "@/contexts/LanguageContext";

// Korean regions organized by major cities and provinces
const koreanRegions = [
  {
    id: "1",
    name: "서울특별시",
    subregions: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
  },
  {
    id: "2",
    name: "부산광역시",
    subregions: [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",
    ],
  },
  {
    id: "3",
    name: "대구광역시",
    subregions: [
      "남구",
      "달서구",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
      "달성군",
    ],
  },
  {
    id: "4",
    name: "인천광역시",
    subregions: [
      "계양구",
      "남동구",
      "동구",
      "미추홀구",
      "부평구",
      "서구",
      "연수구",
      "중구",
      "강화군",
      "옹진군",
    ],
  },
  {
    id: "5",
    name: "광주광역시",
    subregions: ["광산구", "남구", "동구", "북구", "서구"],
  },
  {
    id: "6",
    name: "대전광역시",
    subregions: ["대덕구", "동구", "서구", "유성구", "중구"],
  },
  {
    id: "7",
    name: "울산광역시",
    subregions: ["남구", "동구", "북구", "중구", "울주군"],
  },
  {
    id: "8",
    name: "세종특별자치시",
    subregions: ["세종시"],
  },
  {
    id: "9",
    name: "경기도",
    subregions: [
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "여주시",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
      "가평군",
      "양평군",
      "연천군",
    ],
  },
  {
    id: "10",
    name: "강원도",
    subregions: [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
  },
  {
    id: "11",
    name: "충청북도",
    subregions: [
      "제천시",
      "청주시",
      "충주시",
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "증평군",
      "진천군",
    ],
  },
  {
    id: "12",
    name: "충청남도",
    subregions: [
      "계룡시",
      "공주시",
      "논산시",
      "당진시",
      "보령시",
      "서산시",
      "아산시",
      "천안시",
      "금산군",
      "부여군",
      "서천군",
      "예산군",
      "청양군",
      "태안군",
      "홍성군",
    ],
  },
  {
    id: "13",
    name: "전라북도",
    subregions: [
      "군산시",
      "김제시",
      "남원시",
      "익산시",
      "전주시",
      "정읍시",
      "고창군",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "임실군",
      "장수군",
      "진안군",
    ],
  },
  {
    id: "14",
    name: "전라남도",
    subregions: [
      "광양시",
      "나주시",
      "목포시",
      "순천시",
      "여수시",
      "강진군",
      "고흥군",
      "곡성군",
      "구례군",
      "담양군",
      "무안군",
      "보성군",
      "신안군",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
  },
  {
    id: "15",
    name: "경상북도",
    subregions: [
      "경산시",
      "경주시",
      "구미시",
      "김천시",
      "문경시",
      "상주시",
      "안동시",
      "영주시",
      "영천시",
      "포항시",
      "고령군",
      "군위군",
      "봉화군",
      "성주군",
      "영덕군",
      "영양군",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
    ],
  },
  {
    id: "16",
    name: "경상남도",
    subregions: [
      "거제시",
      "김해시",
      "밀양시",
      "사천시",
      "양산시",
      "진주시",
      "창원시",
      "통영시",
      "거창군",
      "고성군",
      "남해군",
      "산청군",
      "의령군",
      "창녕군",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
  },
  {
    id: "17",
    name: "제주특별자치도",
    subregions: ["제주시", "서귀포시"],
  },
  {
    id: "18",
    name: "전국",
    subregions: [],
  },
];

interface RegionPickerProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const RegionPicker: React.FC<RegionPickerProps> = ({
  selectedRegion,
  onRegionChange,
}) => {
  const { t, effectiveLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMainRegion, setSelectedMainRegion] = useState<string | null>(
    null
  );
  const [showSubregions, setShowSubregions] = useState(false);

  const translateSubregion = (
    mainRegion: string,
    subregion: string,
    language: string
  ): string => {
    if (subregion === "전체") {
      return t("전체", "전체");
    }

    // Find the main region in the koreanRegionsMap
    const regionData = koreanRegionsMap.get(mainRegion);
    if (regionData && regionData.subregions[language as "en" | "ja" | "zh"]) {
      // Find the index of the subregion in the Korean list
      const koreanSubregions =
        koreanRegions.find((r) => r.name === mainRegion)?.subregions || [];

      const index = koreanSubregions.indexOf(subregion);
      if (index !== -1) {
        // Return the translated subregion if available
        return (
          regionData.subregions[language as "en" | "ja" | "zh"][index] ||
          subregion
        );
      }
    }

    // If no pattern matched, return the original
    return subregion;
  };

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

  const getDisplayRegion = (region: string): string => {
    // If there's no region selected, return empty string
    if (!region) return "";

    // Special case for "전국" (nationwide)
    if (region === "전국") {
      return effectiveLanguage !== "ko"
        ? translateMainRegion(region, effectiveLanguage)
        : region;
    }

    // For regions with subregions (e.g. "서울특별시 강남구")
    const parts = region.split(" ");
    if (effectiveLanguage === "ko") {
      return region;
    }
    if (parts.length === 2) {
      const mainRegion = translateMainRegion(parts[0], effectiveLanguage);
      const subRegion = translateSubregion(
        parts[0],
        parts[1],
        effectiveLanguage
      );
      return `${mainRegion} ${subRegion}`;
    } else if (parts.length === 1) {
      const mainRegion = translateMainRegion(parts[0], effectiveLanguage);
      return `${mainRegion}`;
    }

    return region;
  };

  const handleMainRegionSelect = (regionName: string) => {
    // If '전국' (nationwide) is selected, immediately close and select
    if (regionName === "전국") {
      onRegionChange("전국");
      setModalVisible(false);
      return;
    }

    setSelectedMainRegion(regionName);
    setShowSubregions(true);
  };

  const handleSubregionSelect = (subregion: string) => {
    if (selectedMainRegion) {
      if (subregion === "전체") {
        onRegionChange(selectedMainRegion);
      } else {
        // Otherwise, combine main region and subregion
        onRegionChange(`${selectedMainRegion} ${subregion}`);
      }
    }
    setModalVisible(false);
    setShowSubregions(false);
  };

  const handleBackToMainRegions = () => {
    setShowSubregions(false);
    setSelectedMainRegion(null);
  };

  const renderMainRegionItem = ({
    item,
  }: {
    item: (typeof koreanRegions)[0];
  }) => (
    <TouchableOpacity
      style={styles.regionItem}
      onPress={() => handleMainRegionSelect(item.name)}
    >
      <Text style={styles.regionText}>
        {effectiveLanguage !== "ko"
          ? translateMainRegion(item.name, effectiveLanguage)
          : item.name}
      </Text>
      {item.subregions.length > 0 && (
        <MaterialIcons name="chevron-right" size={24} color="#8e8e93" />
      )}
    </TouchableOpacity>
  );

  const renderSubregionItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.regionItem}
      onPress={() => handleSubregionSelect(item)}
    >
      <Text style={styles.regionText}>
        {effectiveLanguage !== "ko" && selectedMainRegion
          ? translateSubregion(selectedMainRegion, item, effectiveLanguage)
          : item}
      </Text>
    </TouchableOpacity>
  );

  // Get the current main region's subregions if one is selected
  const currentSubregions = selectedMainRegion
    ? [
        "전체",
        ...(koreanRegions.find((r) => r.name === selectedMainRegion)
          ?.subregions || []),
      ]
    : [];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.regionButtonText}>
          {selectedRegion
            ? getDisplayRegion(selectedRegion)
            : t("selectRegion", "지역 선택")}
        </Text>

        <MaterialIcons name="location-on" size={24} color="#007aff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  if (showSubregions) {
                    handleBackToMainRegions();
                  } else {
                    setModalVisible(false);
                  }
                }}
                style={styles.headerButton}
              >
                {showSubregions ? (
                  <MaterialIcons name="arrow-back" size={24} color="#007aff" />
                ) : (
                  <Text style={styles.cancelText}>{t("cancel", "취소")}</Text>
                )}
              </TouchableOpacity>

              <Text style={styles.modalTitle}>
                {showSubregions
                  ? effectiveLanguage !== "ko"
                    ? translateMainRegion(
                        selectedMainRegion || "",
                        effectiveLanguage
                      )
                    : selectedMainRegion
                  : t("selectRegion", "지역 선택")}
              </Text>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.headerButton}
              >
                <Text style={styles.doneText}>{t("done", "완료")}</Text>
              </TouchableOpacity>
            </View>

            {showSubregions ? (
              <FlatList
                data={currentSubregions}
                renderItem={renderSubregionItem}
                keyExtractor={(item) => item}
                style={styles.list}
              />
            ) : (
              <FlatList
                data={koreanRegions}
                renderItem={renderMainRegionItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
              />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f7",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  regionButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 50,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  headerButton: {
    minWidth: 60,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  list: {
    flex: 1,
  },
  regionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f7",
  },
  regionText: {
    fontSize: 16,
    color: "#333",
  },
  cancelText: {
    fontSize: 16,
    color: "#8e8e93",
  },
  doneText: {
    fontSize: 16,
    color: "#007aff",
    fontWeight: "600",
    textAlign: "right",
  },
});

export default RegionPicker;
