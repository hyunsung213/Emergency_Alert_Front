import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { IEarthquakeShelter } from "@/lib/api/interfaces/earthquakeShelter";
import { getEarthquakeShelter } from "@/lib/api/interfaces/get";

const sample_data = [
  {
    fclt_nm: "동작고등학교 운동장",
    mng_dept_nm: "070-4629-6407",
    se_nm: "지진실내구호소",
    ctpv_nm: "서울특별시",
    lot: "126.9655",
    fcar: "3246.0",
    se: 1,
    shlt_id: 1,
    daddr: "서울특별시 동작구 솔밭로 51(사당동)",
    sgg_nm: "동작구",
    lat: "37.482",
  },
];

export default function Maps() {
  const [info, setInfo] = useState<IEarthquakeShelter[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("위치 권한에 대한 승인이 누락되었습니다.");
        setLoading(false);
        return;
      }

      try {
        let loaction_user = await Location.getCurrentPositionAsync({});
        setLocation(loaction_user);
      } catch (error) {
        setErrorMsg("위치를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const a = await getEarthquakeShelter({
          lon: location?.coords.longitude || 0,
          lat: location?.coords.latitude || 0,
        });
        setInfo(a.data);
      } catch (error) {
        console.error("Error fetching earthquake shelter data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(info);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: Number(location?.coords.latitude),
          longitude: Number(location?.coords.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        style={styles.map}
      >
        {info?.length > 0 &&
          info?.map((element) => (
            <Marker
              key={element.shlt_id}
              draggable
              coordinate={{
                latitude: Number(element.lat),
                longitude: Number(element.lot),
              }}
              onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={element.fclt_nm}
              description={element.se_nm}
              pinColor="yellow"
            />
          ))}
        <Marker
          draggable
          coordinate={{
            latitude: Number(location?.coords.latitude),
            longitude: Number(location?.coords.longitude),
          }}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={"현재위치"}
          description={"맞을껄?"}
          pinColor="yellow"
        />

        <Marker
          draggable
          coordinate={{
            latitude: Number(sample_data[0].lat),
            longitude: Number(sample_data[0].lot),
          }}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={sample_data[0].fclt_nm}
          description={sample_data[0].se_nm}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
