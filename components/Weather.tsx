import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { getWeatherData, WeatherItem } from "@/lib/api/weatherAPI";
import { MaterialIcons } from "@expo/vector-icons";

// Convert GPS coordinates to grid coordinates for Korean weather API
function convertToGrid(lat: number, lon: number) {
  const RE = 6371.00877; // Earth radius in kilometers
  const GRID = 5.0; // Grid interval in kilometers
  const SLAT1 = 30.0; // Standard latitude 1
  const SLAT2 = 60.0; // Standard latitude 2
  const OLON = 126.0; // Origin longitude
  const OLAT = 38.0; // Origin latitude
  const XO = 43; // X origin
  const YO = 136; // Y origin

  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  let nx = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  let ny = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return { nx, ny };
}

// Format current date to YYYYMMDD
function formatDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

// Get base_time based on current hour
function getBaseTime() {
  const now = new Date();
  const hour = now.getHours();

  // Weather API provides forecasts at 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00, 23:00
  // We need to select the most recent forecast time
  const baseHours = [2, 5, 8, 11, 14, 17, 20, 23];

  let baseHour = 23; // Default to previous day's last forecast

  for (const bh of baseHours) {
    if (hour >= bh) {
      baseHour = bh;
    } else {
      break;
    }
  }

  return String(baseHour).padStart(2, "0") + "00";
}

function getWindDirection(uuu: number, vvv: number): string {
  const directions = ["북", "북동", "동", "남동", "남", "남서", "서", "북서"];

  // Calculate the wind direction angle in degrees
  const angle = (Math.atan2(vvv, uuu) * 180) / Math.PI + 180;

  // Convert angle to compass direction (0-7)
  const compassIndex = Math.round(angle / 45) % 8;

  return directions[compassIndex];
}

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState<Record<string, string> | null>(
    null
  );
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [regionName, setRegionName] = useState<string>("");

  const fetchWeatherData = async () => {
    if (!location) return;
    setLoading(true);
    try {
      const { latitude, longitude } = location.coords;
      const grid = convertToGrid(latitude, longitude);

      const base_date = formatDate();
      const base_time = getBaseTime();

      const response = await getWeatherData({
        base_date,
        base_time,
        nx: grid.nx,
        ny: grid.ny,
      });

      console.log("Weather API response:", response);

      // Process the data to extract the values we need
      const processedData = processWeatherData(response);
      setWeatherData(processedData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMsg(
        "날씨 정보를 가져오는 중 오류가 발생했습니다. 인터넷 연결을 확인해 주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "위치 권한이 필요합니다. 앱 설정에서 위치 접근을 허용해 주세요."
        );
        setLoading(false);
        return;
      }

      try {
        let location_user = await Location.getCurrentPositionAsync({});
        setLocation(location_user);

        // Get region name from coordinates
        const geocode = await Location.reverseGeocodeAsync({
          latitude: location_user.coords.latitude,
          longitude: location_user.coords.longitude,
        });

        if (geocode && geocode.length > 0) {
          // Extract region names for API query
          const region = geocode[0];
          let regionQuery = "";

          // Korean APIs typically use administrative areas
          if (region.region) regionQuery = region.region; // Province/State/City
          if (region.subregion) {
            regionQuery = regionQuery
              ? `${regionQuery} ${region.subregion}`
              : region.subregion;
          }

          setRegionName(regionQuery);
        }
      } catch (error) {
        setErrorMsg(
          "위치를 불러오는 중 오류가 발생했습니다. GPS가 활성화되어 있는지 확인해 주세요."
        );
      } finally {
        setLoading(false);
      }
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  function processWeatherData(items: WeatherItem[]): Record<string, string> {
    // Expanded map of category codes to their keys
    const categoryMap: Record<string, string> = {
      POP: "pop", // 강수확률 - Precipitation probability (%)
      PTY: "pty", // 강수형태 - Precipitation type (코드값)
      SKY: "sky", // 하늘상태 - Sky condition (코드값)
      TMP: "tmp", // 1시간 기온 - Temperature (°C)
      TMN: "tmn", // 일 최저기온 - Minimum temperature (°C)
      TMX: "tmx", // 일 최고기온 - Maximum temperature (°C)
      REH: "reh", // 습도 - Humidity (%)
      WSD: "wsd", // 풍속 - Wind speed (m/s)
      VEC: "vec", // 풍향 - Wind direction (deg)
      UUU: "uuu", // 동서바람성분 - East-west wind component (m/s)
      VVV: "vvv", // 남북바람성분 - North-south wind component (m/s)
      PCP: "pcp", // 1시간 강수량 - Precipitation (mm)
      SNO: "sno", // 1시간 신적설 - Snow (cm)
      WAV: "wav", // 파고 - Wave height (M)
      T1H: "t1h", // 기온 - Temperature (°C)
      RN1: "rn1", // 1시간 강수량 - Precipitation (mm)
    };

    const result: Record<string, string> = {};
    const latestForecast: Record<string, { time: string; value: string }> = {};

    // Process each item and keep the latest forecast for each category
    items.forEach((item) => {
      const category = item.category;
      const key = categoryMap[category];

      if (key) {
        // Convert forecast date and time to a comparable format
        const forecastDateTime = `${item.fcstDate}${item.fcstTime}`;

        // Keep the latest forecast for each category
        if (
          !latestForecast[key] ||
          forecastDateTime > latestForecast[key].time
        ) {
          latestForecast[key] = {
            time: forecastDateTime,
            value: item.fcstValue,
          };
        }
      }
    });

    // Extract the latest values into the result object
    for (const [key, data] of Object.entries(latestForecast)) {
      result[key] = data.value;
    }

    return result;
  }

  // Loading and error state handling remains the same
  // Loading and error state handling with improved design
  if (loading && !weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>날씨 정보를 불러오는 중...</Text>
        <Text style={styles.subText}>잠시만 기다려주세요</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIconContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
        </View>
        <Text style={styles.errorTitle}>날씨 정보를 불러올 수 없습니다</Text>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setErrorMsg(null);
            fetchWeatherData(); // You'll need to move this function outside useEffect
          }}
        >
          <Text style={styles.retryButtonText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.placeholderCard}>
          <View style={styles.placeholderHeader} />
          <View style={styles.placeholderTemp} />
          <View style={styles.placeholderDesc} />
          <View style={styles.placeholderRow} />
          <View style={styles.placeholderRow} />
          <View style={styles.placeholderRow} />
        </View>
        <Text style={styles.loadingText}>날씨 데이터 준비 중...</Text>
      </View>
    );
  }

  // Extract weather data with default values for null safety
  const {
    pop = "0", // 강수확률
    pty = "0", // 강수형태
    sky = "1", // 하늘상태
    tmp = "N/A", // 기온
    tmn = "N/A", // 최저기온
    tmx = "N/A", // 최고기온
    wsd = "0", // 풍속
    reh = "N/A", // 습도
    vec = "0", // 풍향
    uuu = "0", // 동서바람성분
    vvv = "0", // 남북바람성분
    pcp = "0", // 강수량
    sno = "0", // 신적설
    wav = "N/A", // 파고
  } = weatherData;

  // Enhanced category mappings
  const skyMapping: Record<string, string> = {
    "1": "맑음",
    "3": "구름 많음",
    "4": "흐림",
  };

  const ptyMapping: Record<string, string> = {
    "0": "없음",
    "1": "비",
    "2": "비/눈",
    "3": "눈",
    "4": "소나기",
    "5": "빗방울",
    "6": "빗방울/눈날림",
    "7": "눈날림",
  };

  // Function to get weather icon based on conditions
  const getWeatherIcon = () => {
    const skyCode = parseInt(sky);
    const ptyCode = parseInt(pty);

    if (ptyCode > 0) {
      switch (ptyCode) {
        case 1:
        case 4:
        case 5:
          return "☔"; // Rain
        case 2:
        case 6:
          return "🌨️"; // Rain/Snow
        case 3:
        case 7:
          return "❄️"; // Snow
        default:
          return "";
      }
    } else {
      switch (skyCode) {
        case 1:
          return "☀️"; // Clear
        case 3:
          return "⛅"; // Partly Cloudy
        case 4:
          return "☁️"; // Cloudy
        default:
          return "";
      }
    }
  };

  // Get wind direction from vector angle or UUU/VVV if available
  const getWindDirectionFromVec = (vecValue: string) => {
    const vecNum = parseInt(vecValue);
    const directions = ["북", "북동", "동", "남동", "남", "남서", "서", "북서"];
    const index = Math.round(vecNum / 45) % 8;
    return directions[index];
  };

  // Function to get weather description
  const getWeatherDescription = () => {
    const ptyCode = parseInt(pty);
    const skyCode = parseInt(sky);
    const popValue = parseInt(pop);

    if (ptyCode > 0) {
      return ptyMapping[pty] + (popValue > 50 ? " (강)" : " (약)");
    } else {
      return skyMapping[sky] || "정보 없음";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.weatherHeader}>
        <Text style={styles.weatherIcon}>{getWeatherIcon()}</Text>
        <Text style={styles.header}>오늘의 날씨</Text>
      </View>

      <View style={styles.weatherCard}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={18} color="#666" />
          <Text style={styles.locationText}>{regionName}</Text>
        </View>

        <Text style={styles.temperature}>{tmp}°C</Text>
        <Text style={styles.weatherDescription}>{getWeatherDescription()}</Text>

        <View>
          <View style={styles.weatherDetailsGrid}>
            {/* 습도 (Humidity) box */}
            <View style={styles.weatherBox}>
              <View style={styles.boxIconContainer}>
                <MaterialIcons name="opacity" size={24} color="#4A90E2" />
              </View>
              <Text style={styles.boxTitle}>습도</Text>
              <Text style={styles.boxValue}>
                {reh !== "N/A" ? reh : "--"}
                <Text style={styles.boxUnit}>%</Text>
              </Text>
            </View>

            {/* 최저/최고 (Min/Max Temperature) box */}
            <View style={styles.weatherBox}>
              <View style={styles.boxIconContainer}>
                <MaterialIcons name="thermostat" size={24} color="#FF9500" />
              </View>
              <Text style={styles.boxTitle}>최저/최고</Text>
              <Text style={styles.boxValue}>
                {tmn !== "N/A" ? tmn : "--"}/{tmx !== "N/A" ? tmx : "--"}
                <Text style={styles.boxUnit}>°C</Text>
              </Text>
            </View>

            {/* 강수확률 (Precipitation Probability) box */}
            <View style={styles.weatherBox}>
              <View style={styles.boxIconContainer}>
                <MaterialIcons name="umbrella" size={24} color="#34C759" />
              </View>
              <Text style={styles.boxTitle}>강수확률</Text>
              <Text style={styles.boxValue}>
                {pop}
                <Text style={styles.boxUnit}>%</Text>
              </Text>
            </View>

            {/* 풍속 (Wind Speed) box */}
            <View style={styles.weatherBox}>
              <View style={styles.boxIconContainer}>
                <MaterialIcons name="air" size={24} color="#AF52DE" />
              </View>
              <Text style={styles.boxTitle}>풍속</Text>
              <Text style={styles.boxValue}>
                {wsd}
                <Text style={styles.boxUnit}>m/s</Text>
              </Text>
            </View>
          </View>

          {pcp && pcp !== "0" && (
            <View style={styles.weatherRow}>
              <Text style={styles.label}>강수량:</Text>
              <Text style={styles.value}>{pcp} mm</Text>
            </View>
          )}

          {sno && sno !== "0" && (
            <View style={styles.weatherRow}>
              <Text style={styles.label}>적설량:</Text>
              <Text style={styles.value}>{sno} cm</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

// Keep your existing getWindDirection function

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 16,
    color: "#555",
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  // Error styles
  errorContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FFE5E5",
  },
  errorIcon: {
    fontSize: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  // Placeholder styles (for loading state)
  placeholderCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    marginBottom: 20,
  },
  placeholderHeader: {
    height: 28,
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
    marginBottom: 20,
    width: "60%",
    alignSelf: "center",
  },
  placeholderTemp: {
    height: 48,
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
    marginBottom: 10,
    width: "40%",
    alignSelf: "center",
  },
  placeholderDesc: {
    height: 20,
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
    marginBottom: 30,
    width: "70%",
    alignSelf: "center",
  },
  placeholderRow: {
    height: 20,
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
    marginBottom: 15,
    width: "100%",
  },
  // Existing styles
  weatherHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherIcon: {
    fontSize: 36,
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  weatherCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 5,
    marginTop: 16,
  },
  temperature: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  weatherDescription: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  weatherDetailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  weatherBox: {
    width: "48%",
    backgroundColor: "#f9f9f9", // Softer background color
    borderRadius: 12, // Rounded corners
    padding: 16, // Adjusted padding
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd", // Subtle border color
  },
  boxIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0", // Softer icon background
    justifyContent: "center",
    alignItems: "center",
  },
  boxTitle: {
    fontSize: 14,
    color: "#777", // Softer text color
    marginBottom: 6, // Adjusted spacing
  },

  boxValue: {
    fontSize: 20, // Slightly smaller font
    fontWeight: "600", // Medium weight
    color: "#333",
  },

  boxUnit: {
    fontSize: 14,
    fontWeight: "400", // Normal weight
    color: "#666",
  },
  weatherRow: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    flex: 1,
    color: "#555",
  },
  value: {
    fontSize: 18,
    flex: 1,
    textAlign: "right",
    fontWeight: "500",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  locationText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
    fontWeight: "500",
  },
});

export default WeatherScreen;
