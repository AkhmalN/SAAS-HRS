import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CardShedules from "../components/CardShedules";

const Jadwal = () => {
  // const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  // const months = [
  //   "Januari",
  //   "Februari",
  //   "Maret",
  //   "April",
  //   "Mei",
  //   "Juni",
  //   "Juli",
  //   "Agustus",
  //   "September",
  //   "Oktober",
  //   "November",
  //   "Desember",
  // ];

  // const currentDate = new Date();
  // const dayIndex = currentDate.getDay();
  // const day = days[dayIndex];
  // const date = currentDate.getDate();
  // const monthIndex = currentDate.getMonth();
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Jadwal Hari Ini</Text>
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
              color={"#4FA095"}
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
      <View style={styles.infoContainer}>
        <View style={styles.infoBlock}>
          <Text style={styles.titleText}>Pola Kerja</Text>
          <Text style={styles.contentText}>Shift</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoBlock}>
          <Text style={styles.titleText}>Zona Waktu</Text>
          <Text style={styles.contentText}>WIB</Text>
        </View>
      </View>
      <Text style={styles.titleOnSchedule}>Jadwal selanjutnya</Text>
      <CardShedules />
      <CardShedules />
      <CardShedules />
      <CardShedules /> */}
    </ScrollView>
  );
};

export default Jadwal;

const styles = StyleSheet.create({
  cardSheduleContainer: {
    margin: 10,
    backgroundColor: "#F6F6F6", // Tambahkan background color
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    marginTop: 10,
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
    backgroundColor: "#A1EEBD",
    padding: 15,
    borderRadius: 10,
  },
  dayText: {
    color: "#4FA095",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18,
  },
  dateText: {
    fontSize: 18,
    color: "#4FA095",
    fontWeight: "bold",
    textAlign: "center",
  },
  monthText: {
    color: "gray",
    color: "#4FA095",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  titleOnSchedule: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
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
    color: "#4FA095",
    fontWeight: "800",
    fontSize: 25,
  },
  scheduleShift: {
    color: "#4FA095",
    fontWeight: "bold",
    fontSize: 16,
  },
  scheduleMessage: {
    color: "#4FA095",
  },
  infoContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  separator: {
    width: 0.5, // Width of the vertical line
    height: "100%", // Full height of the container
    backgroundColor: "grey", // Color of the line
    marginHorizontal: 16, // Adjust margin as needed
  },
  infoBlock: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: "#888888",
  },
});
