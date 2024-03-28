import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../constant/color";

const IzinHari = () => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [data, setData] = useState(["ss"]);

  const handleToForm = () => {
    navigation.navigate("Izin Hari");
  };
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <ScrollView style={styles.scrollViewContent}>
          <Text style={styles.title}>Izin hari terakhir</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.dateText}>{formattedDate}</Text>

            <View style={styles.permissionContainer}>
              <Text style={styles.permissionDuration}>30 Menit</Text>
              <Text style={styles.permissionReason}>Mau makan</Text>
            </View>

            <View style={styles.timeRangeContainer}>
              <View style={styles.timeBlock}>
                <Text style={styles.timeText}>08:00</Text>
                <Text style={styles.timeDateText}>{formattedDate}</Text>
              </View>

              <Text style={styles.dot}>...</Text>

              <View style={styles.timeBlock}>
                <Text style={styles.timeText}>17:00</Text>
                <Text style={styles.timeDateText}>{formattedDate}</Text>
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

      <View style={styles.buttonArea}>
        <Pressable
          style={[styles.btnAddIzin, { backgroundColor: theme.primaryColor }]}
          onPress={handleToForm}
        >
          <Ionicons name="add-outline" size={20} color={"#FFF"} />
          <Text style={styles.btnText}>Izin Hari</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default IzinHari;

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
  scrollViewContent: { height: "80%" },
  buttonArea: {
    zIndex: 1,
    padding: 10,
    // position: "absolute",
    height: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    padding: 5,
    fontSize: 15,
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
    backgroundColor: "#4FA095",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 5,
    marginBottom: 5,
    overflow: "hidden",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  permissionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  },
  timeBlock: {
    flex: 1,
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
  },
  timeDateText: {
    fontSize: 13,
    color: "gray",
    marginTop: 5,
  },
  dot: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
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
