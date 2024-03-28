import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const CardShedules = () => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const currentDate = new Date();
  const dayIndex = currentDate.getDay();
  const day = days[dayIndex];
  const date = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  return (
    <View style={styles.cardSheduleContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dayText}>{day}</Text>
        <View style={styles.subDateContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.monthText}>{months[monthIndex]}</Text>
        </View>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleTime}>
          <Text style={styles.scheduleEnter}>08.30</Text>
          <Ionicons
            name="ellipsis-horizontal"
            color={"#272829"}
            size={30}
            style={{ marginTop: 5, marginLeft: 7, marginRight: 7 }}
          />
          <Text style={styles.scheduleEnter}>16.30</Text>
        </View>
        <Text style={styles.scheduleMessage}>Jangan Terlambat yaa</Text>
        <Text style={styles.scheduleShift}>Shift 1</Text>
      </View>
      <Ionicons name="repeat-outline" size={25} />
    </View>
  );
};

export default CardShedules;

const styles = StyleSheet.create({
  cardSheduleContainer: {
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F6F6F6",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  dateContainer: {
    flexDirection: "column",
    padding: 10,
    width: "30%",
  },
  subDateContainer: {
    flexDirection: "column",
    backgroundColor: "#ecf0f6",
    padding: 15,
    borderRadius: 10,
  },
  dayText: {
    color: "#272829",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18,
  },
  dateText: {
    fontSize: 18,
    color: "#272829",
    fontWeight: "bold",
    textAlign: "center",
  },
  monthText: {
    color: "gray",
    color: "#272829",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  scheduleContainer: {
    marginTop: 10,
    width: "55%",
  },
  scheduleTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleEnter: {
    color: "#272829",
    fontWeight: "800",
    fontSize: 25,
  },
  scheduleShift: {
    color: "#272829",
    fontWeight: "bold",
    fontSize: 16,
  },
  scheduleMessage: {
    color: "#272829",
  },
});
