import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constant/color";
import { useNavigation } from "@react-navigation/native";

const Profil = () => {
  const navigation = useNavigation();
  const navigateToProfil = () => {
    navigation.navigate("Peronal Screen");
  };

  const navigateToSetting = () => {
    // Mengarahkan ke layar Pengaturan
    navigation.navigate("Setting Screen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileSection}>
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Rachmat Saleh</Text>
          <Text style={styles.profileJob}>Radiologi</Text>
        </View>
        <TouchableOpacity style={styles.section} onPress={navigateToProfil}>
          <Ionicons
            name="person-outline"
            size={30}
            color={theme.primaryColor}
            style={styles.iconLeft}
          />
          <Text style={styles.sectionTitle}>Profil Saya</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={30}
            color={theme.primaryColor}
            style={styles.iconRight}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={navigateToSetting}>
          <Ionicons
            name="settings-outline"
            size={30}
            color={theme.primaryColor}
            style={styles.iconLeft}
          />
          <Text style={styles.sectionTitle}>Pengaturan</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={30}
            color={theme.primaryColor}
            style={styles.iconRight}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.section}>
          <Ionicons
            name="log-out-outline"
            size={30}
            color={theme.failedColor}
            style={styles.iconLeft}
          />
          <Text style={[styles.sectionTitle, { color: theme.failedColor }]}>
            Logout
          </Text>
          <Ionicons
            name="chevron-forward-outline"
            size={30}
            color={theme.failedColor}
            style={styles.iconRight}
          />
        </TouchableOpacity>
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
  profileSection: {
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.primaryColor,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: theme.primary,
  },
  profileJob: {
    color: theme.secondaryTextColor,
  },
  section: {
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
  iconLeft: {
    width: "10%",
    color: theme.primary,
  },
  iconRight: {
    width: "10%",
    color: theme.primary,
  },

  sectionTitle: {
    fontSize: 18,
    width: "80%",
    marginHorizontal: 5,
  },
});

export default Profil;
