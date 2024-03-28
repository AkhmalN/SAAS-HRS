import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../constant/color";
import { DateFormat } from "../utils/DateFormat";

const IzinJam = () => {
  const [data, setData] = useState(["a"]);
  const navigation = useNavigation();
  const currentDate = new Date();

  const handleToForm = () => {
    navigation.navigate("Izin Jam");
  };
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <ScrollView style={styles.scrollViewContent}>
          <Text style={styles.title}>Izin jam terakhir</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.dateText}>{DateFormat(new Date())}</Text>

            <View style={styles.timeRangeContainer}>
              <View style={styles.permissionContainer}>
                <Text style={styles.permissionDuration}>30 Menit</Text>
                <Text style={styles.permissionReason}>Mau makan</Text>
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.timeText}>08:00</Text>
                <Text style={styles.timeDateText}>
                  {DateFormat(new Date())}
                </Text>
              </View>

              <View style={styles.dotContainer}>
                <Ionicons name="ellipsis-horizontal-outline" size={25} />
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.timeText}>17:00</Text>
                <Text style={styles.timeDateText}>
                  {DateFormat(new Date())}
                </Text>
              </View>
            </View>

            <View style={styles.permissionNoteContainer}>
              <Ionicons name="arrow-redo-circle-outline" style={styles.icon} />
              <Text style={styles.permissionNoteText}>
                Tulis keperluan izin jam anda disini
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noPermit}>
          <Image
            source={require("../assets/7958668.png")}
            style={styles.image}
          />
          <Text style={styles.titlePermission}>Izin hari kosong</Text>
          <Text style={styles.textPermission}>
            Saat ini izin hari kosong, anda akan melihat setelah membuat daftar
          </Text>
        </View>
      )}

      {data.length > 0 ? (
        <View style={styles.buttonArea}>
          <Pressable
            style={[styles.btnAddIzin, { backgroundColor: theme.primaryColor }]}
            onPress={handleToForm}
          >
            <Ionicons name="add-outline" size={20} color={"#FFF"} />
            <Text style={styles.btnText}>Izin Jam</Text>
          </Pressable>
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

export default IzinJam;

const styles = StyleSheet.create({
  container: {
    // position: "relative",
    padding: 10,
    flexDirection: "column",
  },
  image: {
    width: 200,
    height: 200,
  },
  scrollViewContent: {
    height: "80%",
  },
  buttonArea: {
    zIndex: 1,
    padding: 10,
    height: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    padding: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  noPermit: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  hasPermit: {
    padding: 10,
  },
  titlePermission: {
    fontWeight: "bold",
    fontSize: 22,
  },
  textPermission: {
    textAlign: "center",
  },
  btnAddIzin: {
    width: "30%",
    height: "39%",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  btnText: {
    color: "#FFF",
    fontSize: 17,
    marginRight: 7,
  },
  dot: {
    fontSize: 25,
  },
  cardContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: 5,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 18,
    marginBottom: 10,
  },
  permissionContainer: {
    backgroundColor: "#D0D4CA",
    flexDirection: "column",
    width: "35%",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    padding: 5,
  },
  permissionDuration: {
    fontSize: 16,
    marginRight: 10,
  },
  permissionReason: {
    fontSize: 16,
  },
  timeRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  timeBlock: {
    width: "25%",
    alignItems: "center",
  },
  timeText: {
    fontSize: 22,
  },
  timeDateText: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
    textAlign: "center",
  },
  dotContainer: {},
  permissionNoteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
    color: "#4FA095",
  },
  permissionNoteText: {
    fontSize: 16,
  },
});
