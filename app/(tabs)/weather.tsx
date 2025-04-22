import WeatherScreen from "@/components/Weather";
import { IEarthquakeShelter } from "@/lib/api/interfaces/earthquakeShelter";
import { getEarthquakeShelter } from "@/lib/api/interfaces/get";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Weather() {
  return <WeatherScreen />;
}
