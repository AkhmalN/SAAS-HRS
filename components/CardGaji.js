import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DateFormat } from "../utils/DateFormat";
import { Ionicons } from "@expo/vector-icons";

const CardGaji = () => {
  return (
    <View style={styles.payBanner}>
      <LinearGradient
        style={styles.imageBanner}
        colors={["#FFC371", "#FF5F6D"]}
        start={{ x: 1, y: 0 }} // Gradient start from right
        end={{ x: 0, y: 0 }} // Gradient end at left
      >
        <TouchableWithoutFeedback>
          <View style={styles.payWrapper}>
            <View style={styles.payContent}>
              <View>
                <Text>Gaji Bulan {new Date()}</Text>
                <Text style={styles.payTextColumn}>
                  {DateFormat(new Date())}
                </Text>
              </View>
            </View>
            <View style={styles.payContent}>
              <Text style={styles.nominalPay}>Rp 5.252.000</Text>
              <Ionicons name="eye" size={25} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  payBanner: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBanner: {
    width: "100%",
    aspectRatio: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  payWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  payContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  payTextColumn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  nominalPay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});

export default CardGaji;
