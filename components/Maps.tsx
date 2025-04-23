import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
  getHeatShelter,
} from "@/lib/api/interfaces/get";

export default function Maps({ emergency }: { emergency: string }) {
  const [earthquake, setEarthquake] = useState<IEarthquakeShelter[]>([]);
  const [heat, setHeat] = useState<IHeatShelter[]>([]);
  const [cold, setCold] = useState<IColdWaveShelter[]>([]);
  const [dust, setDust] = useState<IDustShelter[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

        setEarthquake(loc_earthquake.data);
        setHeat(loc_heat.data);
        setCold(loc_cold.data);
        setDust(loc_dust.data);
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
              title={element.fclt_nm}
              description={element.se_nm}
              image={require("../assets/images/shelter.png")}
            />
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
              description={element.rmrk}
              image={require("../assets/images/umbrella.png")}
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
              description={element.fclt_type}
              image={require("../assets/images/campfire.png")}
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
              description={element.rmrk}
              image={require("../assets/images/mask.png")}
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
          pinColor="#4b4453"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
