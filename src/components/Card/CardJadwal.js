import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../constant/color";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";

const CardJadwal = () => {
  return (
    <Card style={styles.cardContainer}>
      <Text style={[styles.cardTitle, { color: theme.secondaryTextColor }]}>
        Jadwal Hari Ini
      </Text>
      <Card.Content style={styles.contentContainer}>
        <View>
          <Text style={[styles.label, { color: theme.secondaryTextColor }]}>
            Start Time
          </Text>
          <Text style={[styles.time, { color: theme.secondaryTextColor }]}>
            08:00
          </Text>
        </View>
        <Text style={styles.dot}> ... </Text>
        <View>
          <Text style={[styles.label, { color: theme.secondaryTextColor }]}>
            End Time
          </Text>
          <Text style={[styles.time, { color: theme.secondaryTextColor }]}>
            17:00
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CardJadwal;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    margin: 16,
    elevation: 4, // Add elevation for Android shadow
    shadowColor: "#000", // Add shadow properties for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 18,
  },
  dot: {
    fontSize: 35,
  },
});
