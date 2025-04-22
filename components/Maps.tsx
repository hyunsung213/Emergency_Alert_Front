import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
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
import { Picker } from "@react-native-picker/picker";

export default function Maps() {
  const [earthquake, setEarthquake] = useState<IEarthquakeShelter[]>([]);
  const [heat, setHeat] = useState<IHeatShelter[]>([]);
  const [cold, setcold] = useState<IColdWaveShelter[]>([]);
  const [dust, setDust] = useState<IDustShelter[]>([]);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [emergency, setEmergency] = useState<string>("earthquake");

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
        const loc_earthquake = await getEarthquakeShelter({
          lon: location?.coords.longitude || 0,
          lat: location?.coords.latitude || 0,
        });
        const loc_heat = await getHeatShelter({
          lon: location?.coords.longitude || 0,
          lat: location?.coords.latitude || 0,
        });
        const loc_cold = await getColdWaveShelter({
          lon: location?.coords.longitude || 0,
          lat: location?.coords.latitude || 0,
        });
        const loc_dust = await getDustShelter({
          lon: location?.coords.longitude || 0,
          lat: location?.coords.latitude || 0,
        });

        setEarthquake(loc_earthquake.data);
        setHeat(loc_heat.data);
        setcold(loc_cold.data);
        setDust(loc_dust.data);
      } catch (error) {
        console.error("Error fetching earthquake shelter data:", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
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
        {/* Show Earthquake Shelter */}
        {earthquake.length > 0 &&
          earthquake?.map((element) => (
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
              image={require("../assets/images/shelter.png")}
              style={styles.marker}
            />
          ))}

        {/* Show Heatwave Shelter*/}

        {heat.length > 0 &&
          heat?.map((element) => (
            <Marker
              // key={elemen}
              draggable
              coordinate={{
                latitude: Number(element.lat),
                longitude: Number(element.lot),
              }}
              onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={element.restarea_nm}
              description={element.rmrk}
              image={require("../assets/images/umbrella.png")}
              style={styles.marker}
            />
          ))}

        {/* Show Coldwave Shelter*/}

        {cold.length > 0 &&
          cold?.map((element) => (
            <Marker
              key={element.sno}
              draggable
              coordinate={{
                latitude: Number(element.lat),
                longitude: Number(element.lot),
              }}
              onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={element.restarea_nm}
              description={element.fclt_type}
              image={require("../assets/images/campfire.png")}
              style={styles.marker}
            />
          ))}

        {/* Show Dust Shelter*/}
        {dust.length > 0 &&
          dust?.map((element) => (
            <Marker
              key={element.sno}
              draggable
              coordinate={{
                latitude: Number(element.lat),
                longitude: Number(element.lot),
              }}
              onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={element.fclt_nm}
              description={element.rmrk}
              image={require("../assets/images/mask.png")}
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
          pinColor="#4b4453"
          style={styles.marker}
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
  marker: {
    width: 3,
    height: 3,
    justifyContent: "center",
  },
});
