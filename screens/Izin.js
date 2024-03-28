import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import IzinJam from "./IzinJam";
import IzinHari from "./IzinHari";
import { theme } from "../constant/color";

const Izin = () => {
  const navigation = useNavigation();
  const [showIzinJam, setShowIzinJam] = useState(true);
  const [showIzinHari, setShowIzinHari] = useState(false);
  const [selectedNavigation, setSelectedNavigation] = useState("IzinJam");

  const handleIzinHariPress = () => {
    setSelectedNavigation("IzinHari");
    setShowIzinHari(true);
    setShowIzinJam(false);
  };
  const handleIzinJamPress = () => {
    setSelectedNavigation("IzinJam");
    setShowIzinJam(true);
    setShowIzinHari(false);
  };
  return (
    <View>
      <View style={styles.header}>
        <Button
          color={selectedNavigation === "IzinJam" ? theme.primaryColor : "grey"}
          labelStyle={{ fontSize: 14, fontWeight: "bold" }}
          style={styles.activityFilter}
          onPress={handleIzinJamPress}
        >
          Izin jam
        </Button>
        <Button
          color={
            selectedNavigation === "IzinHari" ? theme.primaryColor : "grey"
          }
          labelStyle={{ fontSize: 14, fontWeight: "bold" }}
          style={styles.activityFilter}
          onPress={handleIzinHariPress}
        >
          Izin Hari
        </Button>
      </View>
      <View style={styles.mainSection}>
        {showIzinHari && <IzinHari />}
        {showIzinJam && <IzinJam />}
      </View>
    </View>
  );
};

export default Izin;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    height: 40,
    alignItems: "center",
  },
  mainSection: {
    margin: 10,
  },
});
