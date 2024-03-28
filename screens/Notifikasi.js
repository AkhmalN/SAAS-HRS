import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constant/color";

const Notifikasi = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.activitySelector}>
        <Button
          color="grey"
          labelStyle={{ fontSize: 10, color: theme.primary }}
          style={styles.activityFilter}
        >
          Semua
        </Button>
        <Button
          color="grey"
          labelStyle={{ fontSize: 10 }}
          style={styles.activityFilter}
        >
          Belum dibaca
        </Button>
        <Button
          color="grey"
          labelStyle={{ fontSize: 10 }}
          style={styles.activityFilter}
        >
          Telah dibaca
        </Button>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Semua</Text>
          <TouchableWithoutFeedback>
            <View style={styles.markAllRead}>
              <Ionicons
                name="checkmark-done-outline"
                size={20}
                color="#4FA095"
              />
              <Text>Tandai dibaca semua</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Maaf kok belum absen pulang? Apakah sedang lembur? Jika sudah
              selesai, jangan lupa absen pulang ya kak
            </Text>
            <Text style={styles.dateText}>5 hari yang lalu</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Maaf kok belum absen pulang? Apakah sedang lembur? Jika sudah
              selesai, jangan lupa absen pulang ya kak
            </Text>
            <Text style={styles.dateText}>5 hari yang lalu</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Maaf kok belum absen pulang? Apakah sedang lembur? Jika sudah
              selesai, jangan lupa absen pulang ya kak
            </Text>
            <Text style={styles.dateText}>5 hari yang lalu</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Maaf kok belum absen pulang? Apakah sedang lembur? Jika sudah
              selesai, jangan lupa absen pulang ya kak
            </Text>
            <Text style={styles.dateText}>5 hari yang lalu</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Maaf kok belum absen pulang? Apakah sedang lembur? Jika sudah
              selesai, jangan lupa absen pulang ya kak
            </Text>
            <Text style={styles.dateText}>5 hari yang lalu</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Maaf kok belum absen pulang? Apakah sedang lembur? Jika sudah
              selesai, jangan lupa absen pulang ya kak
            </Text>
            <Text style={styles.dateText}>5 hari yang lalu</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Maaf kok belum absen pulang? Apakah sedang lembur? Jika sudah
              selesai, jangan lupa absen pulang ya kak
            </Text>
            <Text style={styles.dateText}>5 hari yang lalu</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Maaf kok belum absen pulang? Apakah sedang lembur? Jika sudah
              selesai, jangan lupa absen pulang ya kak
            </Text>
            <Text style={styles.dateText}>5 hari yang lalu</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Maaf kok belum absen pulang? Apakah sedang lembur? Jika sudah
              selesai, jangan lupa absen pulang ya kak
            </Text>
            <Text style={styles.dateText}>5 hari yang lalu</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Notifikasi;

const styles = StyleSheet.create({
  activitySelector: {
    flexDirection: "row",
    margin: 10,
  },
  activityFilter: {
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    color: "#4FA095",
  },
  header: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  markAllRead: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  messageContainer: {
    backgroundColor: "#ecf0f6",
    borderBottomWidth: 0.5, // Tambahkan garis bawah
    borderBottomColor: "gray", // Warna garis bawah
  },
  messageText: {
    fontSize: 16,
    margin: 5,
  },
  dateText: {
    fontSize: 12,
    color: "gray",
    margin: 5,
  },
});
