import { IEarthquakeShelter } from "@/lib/api/interfaces/shelter";
import { getEarthquakeShelter } from "@/lib/api/interfaces/get";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Info() {
  const [info, setInfo] = useState<IEarthquakeShelter[] | null>();

  const lat = 37.5665;
  const lon = 126.978;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const a = await getEarthquakeShelter({ lat, lon });
        setInfo(a.data);
      } catch (error) {
        console.error("Error fetching earthquake shelter data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(info);
  return (
    <View style={styles.color}>
      <Text>{info ? JSON.stringify(info) : "No information available"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    backgroundColor: "white",
    height: "100%",
  },
});
