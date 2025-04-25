import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  IColdWaveShelter,
  IDustShelter,
  IEarthquakeShelter,
  IHeatShelter,
} from "@/lib/api/interfaces/shelter";
import {
  getColdWaveShelter,
  getDustShelter,
  getEarthquakeShelter,
  getEmergencyRoom,
  getHeatShelter,
} from "@/lib/api/interfaces/get";
import { IEmergencyRoom } from "@/lib/api/interfaces/emergencyRoom";

export default function Maps({ emergency }: { emergency: string }) {
  const [earthquake, setEarthquake] = useState<IEarthquakeShelter[]>([]);
  const [heat, setHeat] = useState<IHeatShelter[]>([]);
  const [cold, setCold] = useState<IColdWaveShelter[]>([]);
  const [dust, setDust] = useState<IDustShelter[]>([]);
  const [hospital, setHospital] = useState<IEmergencyRoom[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEarthquakeMarker, setSelectedEarthquakeMarker] =
    useState<IEarthquakeShelter | null>();
  const [selectedHeatMarker, setSelectedHeatMarker] =
    useState<IHeatShelter | null>();
  const [selectedColdMarker, setSelectedColdMarker] =
    useState<IColdWaveShelter | null>();
  const [selectedDustMarker, setSelectedDustMarker] =
    useState<IDustShelter | null>();
  const [selectedHospitalMarker, setSelectedHospitalMarker] =
    useState<IEmergencyRoom | null>();

  // 현재 위치 가져오기
  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("위치 권한에 대한 승인이 누락되었습니다.");
        setLoading(false);
        return;
      }

      try {
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);
      } catch (error) {
        setErrorMsg("위치를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    getCurrentLocation();
  }, []);

  // 데이터 가져오기
  useEffect(() => {
    if (!location) return; // 위치 정보가 없으면 데이터 요청하지 않음

    const fetchData = async () => {
      try {
        const loc_earthquake = await getEarthquakeShelter({
          lon: location.coords.longitude,
          lat: location.coords.latitude,
        });
        const loc_heat = await getHeatShelter({
          lon: location.coords.longitude,
          lat: location.coords.latitude,
        });
        const loc_cold = await getColdWaveShelter({
          lon: location.coords.longitude,
          lat: location.coords.latitude,
        });
        const loc_dust = await getDustShelter({
          lon: location.coords.longitude,
          lat: location.coords.latitude,
        });
        const loc_hospital = await getEmergencyRoom({
          lon: location.coords.longitude,
          lat: location.coords.latitude,
        });

        setEarthquake(loc_earthquake.data);
        setHeat(loc_heat.data);
        setCold(loc_cold.data);
        setDust(loc_dust.data);
        setHospital(loc_hospital.data);
      } catch (error) {
        console.error("Error fetching shelter data:", error);
      }
    };

    fetchData();
  }, [location]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location?.coords.latitude || 37.5665, // 기본값: 서울
          longitude: location?.coords.longitude || 126.978, // 기본값: 서울
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        zoomEnabled={true}
        style={styles.map}
      >
        {/* Emergency Rooms */}
        {hospital.length > 0 &&
          hospital.map((element) => (
            <Marker
              key={element.hpid}
              coordinate={{
                latitude: Number(element.wgs84lat),
                longitude: Number(element.wgs84lon),
              }}
              title={element.dutyname}
              image={require("../assets/images/hospitalMarker.png")}
              onPress={() => setSelectedHospitalMarker(element)}
            />
          ))}

        {/* Earthquake Shelters */}
        {earthquake.length > 0 &&
          emergency === "earthquake" &&
          earthquake.map((element) => (
            <Marker
              key={element.shlt_id}
              coordinate={{
                latitude: Number(element.lat),
                longitude: Number(element.lot),
              }}
              image={require("../assets/images/earthquake.png")}
              title={element.fclt_nm}
              onPress={() => setSelectedEarthquakeMarker(element)}
            ></Marker>
          ))}

        {/* Heatwave Shelters */}
        {heat.length > 0 &&
          emergency === "heat" &&
          heat.map((element) => (
            <Marker
              key={element.restarea_nm}
              coordinate={{
                latitude: Number(element.lat),
                longitude: Number(element.lot),
              }}
              title={element.restarea_nm}
              image={require("../assets/images/heat1.png")}
              onPress={() => setSelectedHeatMarker(element)}
            />
          ))}

        {/* Coldwave Shelters */}
        {cold.length > 0 &&
          emergency === "cold" &&
          cold.map((element) => (
            <Marker
              key={element.sno}
              coordinate={{
                latitude: Number(element.lat),
                longitude: Number(element.lot),
              }}
              title={element.restarea_nm}
              image={require("../assets/images/cold.png")}
              onPress={() => setSelectedColdMarker(element)}
            />
          ))}

        {/* Dust Shelters */}
        {dust.length > 0 &&
          emergency === "dust" &&
          dust.map((element) => (
            <Marker
              key={element.sno}
              coordinate={{
                latitude: Number(element.lat),
                longitude: Number(element.lot),
              }}
              title={element.fclt_nm}
              image={require("../assets/images/dust.png")}
              onPress={() => setSelectedDustMarker(element)}
            />
          ))}

        {/* 현재 위치 */}
        <Marker
          coordinate={{
            latitude: location?.coords.latitude || 37.5665,
            longitude: location?.coords.longitude || 126.978,
          }}
          title={"현재위치"}
          description={"현재 위치입니다."}
          image={require("../assets/images/gps.png")}
        />
      </MapView>

      {selectedEarthquakeMarker && (
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutTitle}>
            {selectedEarthquakeMarker.fclt_nm}
          </Text>
          <Text style={styles.calloutText}>
            {selectedEarthquakeMarker.se_nm}
          </Text>
          <Text style={styles.calloutText}>
            {selectedEarthquakeMarker.mng_dept_nm}
          </Text>
          <Text style={styles.calloutText}>
            {selectedEarthquakeMarker.daddr}
          </Text>

          <TouchableOpacity
            onPress={() => setSelectedEarthquakeMarker(null)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedHeatMarker && (
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutTitle}>
            {selectedHeatMarker.restarea_nm}
          </Text>
          <Text style={styles.calloutText}>
            {selectedHeatMarker.road_nm_addr}
          </Text>
          <Text style={styles.calloutText}>{selectedHeatMarker.rmrk}</Text>

          <TouchableOpacity
            onPress={() => setSelectedHeatMarker(null)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedColdMarker && (
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutTitle}>
            {selectedColdMarker.restarea_nm}
          </Text>
          <Text style={styles.calloutText}>
            {selectedColdMarker.road_nm_addr}
          </Text>
          <Text style={styles.calloutText}>{selectedColdMarker.rmrk}</Text>

          <TouchableOpacity
            onPress={() => setSelectedColdMarker(null)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedDustMarker && (
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutTitle}>{selectedDustMarker.fclt_nm}</Text>
          <Text style={styles.calloutText}>{selectedDustMarker.fclt_type}</Text>
          <Text style={styles.calloutText}>{selectedDustMarker.addr}</Text>
          <Text style={styles.calloutText}>{selectedDustMarker.rmrk}</Text>

          <TouchableOpacity
            onPress={() => setSelectedDustMarker(null)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedHospitalMarker && (
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutTitle}>
            {selectedHospitalMarker.dutyname}
          </Text>
          <Text style={styles.calloutText}>
            {selectedHospitalMarker.dutytel1}
          </Text>
          <Text style={styles.calloutText}>
            {selectedHospitalMarker.dutyaddr}
          </Text>
          <Text style={styles.calloutText}>
            {selectedHospitalMarker.dutyetc}
          </Text>

          <TouchableOpacity
            onPress={() => setSelectedHospitalMarker(null)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
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
  calloutContainer: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 12,
    marginBottom: 2,
  },
});
