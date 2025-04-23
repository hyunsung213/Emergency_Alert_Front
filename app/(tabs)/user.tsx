// Example usage in your main app layout or screen
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import DisasterMessage from "@/components/DisasterMessage";
import DisasterAlert from "@/components/DisasterAlert";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Message bar at the top */}
      <DisasterMessage maxMessages={10} autoScrollInterval={7000} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  content: {
    flex: 1,
  },
});

export default HomeScreen;
