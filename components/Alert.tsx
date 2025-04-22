import { StyleSheet, Text, View } from "react-native";
import { red } from "react-native-reanimated/lib/typescript/Colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Alert() {
  const title = "ex)호우 주의보";
  const content = "ex)금일 20:00 이후 강풍을 동반한 비가 예보됩니다.";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  content: {
    fontSize: 10,
    fontWeight: "semibold",
    color: "black",
  },
});
