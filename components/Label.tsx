import { StyleSheet, Text, View } from "react-native";

export default function Label({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "15%",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4b4453",
    width: "90%",
    alignItems: "flex-start",
  },
});
