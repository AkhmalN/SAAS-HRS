import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constant/color";

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <TouchableOpacity style={styles.detailItem}>
            <Ionicons
              name="phone-portrait-outline"
              size={30}
              style={styles.detailIcon}
            />
            <Text style={styles.textLabel}>Perangkat terdaftar</Text>
            <Ionicons
              name="chevron-forward-outline"
              style={styles.arrowIcon}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailItem}>
            <Ionicons
              name="earth-outline"
              size={30}
              style={styles.detailIcon}
            />
            <View>
              <Text style={styles.textLabel}>Ganti Bahasa</Text>
              <Text style={{ color: "grey" }}>Bahasa Indonesia</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              style={styles.arrowIcon}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailItem}>
            <Ionicons
              name="notifications-outline"
              size={30}
              style={styles.detailIcon}
            />
            <Text style={styles.textLabel}>Notifikasi</Text>
            <Ionicons
              name="chevron-forward-outline"
              style={styles.arrowIcon}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailItem}>
            <Ionicons
              name="people-outline"
              size={30}
              style={styles.detailIcon}
            />
            <Text style={styles.textLabel}>Kontak Darurat</Text>
            <Ionicons
              name="chevron-forward-outline"
              style={styles.arrowIcon}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailItem}>
            <Ionicons name="key-outline" size={30} style={styles.detailIcon} />
            <Text style={styles.textLabel}>Ganti Kata sandi</Text>
            <Ionicons
              name="chevron-forward-outline"
              style={styles.arrowIcon}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailItem}>
            <Ionicons name="time-outline" size={30} style={styles.detailIcon} />
            <Text style={styles.textLabel}>WIB</Text>
            <Ionicons
              name="chevron-forward-outline"
              style={styles.arrowIcon}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  detailItem: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 6,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  detailIcon: {
    marginRight: 10,
    color: theme.primaryColor,
  },
  arrowIcon: {
    marginLeft: "auto",
    color: theme.primaryColor,
  },
  textLabel: {
    fontSize: 16,
  },
});

export default SettingScreen;
