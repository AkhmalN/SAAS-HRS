import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { WeekFormat } from "../utils/WeekFormat";

const Mingguan = () => {
  const { formattedDate, handleForward, handleBack } = WeekFormat();

  return (
    <View>
      <View style={styles.activityDate}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <Text>{formattedDate}</Text>
        </View>
        <TouchableOpacity onPress={handleForward}>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.activityCard}>
        <View style={styles.activityContainer}>
          <View style={styles.activityItem}>
            <View style={styles.activityDetail}>
              <Text style={styles.activityLabel}>Masuk</Text>
              <Text style={styles.activityTime}>08:02</Text>
            </View>
            <View style={styles.activityNavigate}>
              <Ionicons name="location-outline" size={20} color={"#4FA095"} />
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityDetail}>
              <Text style={styles.activityLabel}>Keluar</Text>
              <Text style={styles.activityTime}>21:02</Text>
            </View>
            <View style={styles.activityNavigate}>
              <Ionicons name="location-outline" size={20} color={"#4FA095"} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Mingguan;

const styles = StyleSheet.create({
  activityCard: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
  },
  activityDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "grey",
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  dayContainer: {
    marginRight: 10,
    backgroundColor: "#ecf0f6",
    padding: 15,
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  activityContainer: {
    flexDirection: "column",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "grey",
    width: "75%",
    padding: 10,
    margin: 10,
  },
  activityNavigate: {
    backgroundColor: "#ecf0f6",
    padding: 10,
    borderRadius: 20,
  },
  activityLabel: {
    fontSize: 16,
  },
  activityTime: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
