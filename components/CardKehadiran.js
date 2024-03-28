import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { theme } from "../constant/color";

const CardKehadiran = () => {
  return (
    <TouchableWithoutFeedback style={styles.presenceBanner}>
      <View style={styles.presenceBanner}>
        <View style={styles.contentPresence}>
          <Text style={[styles.textColumn]}>Ringkasan Kehadiran</Text>
          <Text>Periksa Kinerja Rekap Anda Bulan Ini</Text>
        </View>
        <View style={styles.presenceImageContainer}>
          <Image
            source={require("../assets/111896-OO1477-183.jpg")}
            style={styles.presenceImage}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardKehadiran;
const styles = StyleSheet.create({
  presenceBanner: {
    marginBottom: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 10,
    backgroundColor: "#F6F6F6",
  },
  textColumn: {
    fontSize: 20,
    fontWeight: "bold",
  },
  presenceImage: {
    width: 90,
    height: 80,
    borderRadius: 20,
  },
});
