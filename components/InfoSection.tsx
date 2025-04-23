import React from "react";
import { View, Text, StyleSheet } from "react-native";

type InfoSectionProps = {
  title: string;
  items: string[];
};

const InfoSection = ({ title, items }: InfoSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item, idx) => (
        <Text key={idx} style={styles.item}>
          • {item}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  item: { fontSize: 16, marginBottom: 4 },
});

export default InfoSection;
