import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Harian from "../layouts/Harian";
import Mingguan from "../layouts/Mingguan";

const Aktifitas = () => {
  // const [day, setDay] = useState(true);
  // const [week, setWeek] = useState(null);
  // const [month, setMonth] = useState(null);
  // const [customDay, setCustomDay] = useState(null);

  // const onDay = () => {
  //   setDay(true);
  //   setWeek(false);
  // };
  // const onWeek = () => {
  //   setDay(false);
  //   setWeek(true);
  // };
  // const onMonth = () => {};
  // const onCustomDay = () => {};

  return (
    <View>
      {/* <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.activity}
      >
        <Button
          color={day ? "#0B815A" : "grey"}
          labelStyle={{ fontSize: 10 }}
          style={[styles.activityFilter, day ? styles.active : null]}
          onPress={onDay}
        >
          Harian
        </Button>
        <Button
          color="grey"
          labelStyle={{ fontSize: 10 }}
          style={styles.activityFilter}
          onPress={onWeek}
        >
          Mingguan
        </Button>
        <Button
          color="grey"
          labelStyle={{ fontSize: 10 }}
          style={styles.activityFilter}
        >
          Bulanan
        </Button>
        <Button
          color="grey"
          labelStyle={{ fontSize: 10 }}
          style={styles.activityFilter}
        >
          Pilih Tanggal
        </Button>
      </ScrollView>

      {day && <Harian />}
      {week && <Mingguan />} */}
    </View>
  );
};

export default Aktifitas;

const styles = StyleSheet.create({
  activity: {
    margin: 10,
    flexDirection: "row",
  },
  activityFilter: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
  },
  active: {
    borderColor: "#0B815A",
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
  activityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activityCard: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
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
  dayText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  monthYearText: {
    marginTop: 10,
    fontSize: 16,
  },
  activityContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 20,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "grey",
    width: 250,
    padding: 10,
    margin: 5,
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
