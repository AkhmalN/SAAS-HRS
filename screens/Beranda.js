import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../context/authContext";
import CardGaji from "../components/CardGaji";
import CardKehadiran from "../components/CardKehadiran";
import CardJadwal from "../components/CardJadwal";
import CardNavigation from "../components/CardNavigation";
import { getPegawai } from "../api/pegawai";
import { theme } from "../constant/color";
import { useId } from "../context/userContext";
import ModalLoading from "../components/Modal/ModalLoading";

const Beranda = () => {
  const { id } = useId();
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -5],
    extrapolate: "clamp",
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["pegawai", id],
    queryFn: () => getPegawai(id),
  });

  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={16}
      >
        <LinearGradient
          colors={["#00008B", "#021B79"]}
          style={styles.banner}
          start={[0, 0]}
          end={[0, 1]}
          angle={45}
        >
          <View style={styles.profileBanner}>
            <View style={styles.avatarProfile}>
              <Avatar.Image
                size={60}
                source={require("../assets/avatar.png")}
              />
            </View>
            {isLoading ? (
              <ModalLoading />
            ) : (
              <View style={styles.profile}>
                <Text style={styles.nameProfile}>
                  {data.nama} {data.nama_belakang}
                </Text>
                <Text style={styles.jobProfile}>{data.posisi}</Text>
              </View>
            )}

            <TouchableWithoutFeedback
              style={styles.chat}
              onPress={() => navigation.navigate("Chat Screen")}
            >
              <Ionicons name="chatbubbles-outline" color={"#FFF"} size={30} />
            </TouchableWithoutFeedback>
          </View>

          <CardJadwal />
        </LinearGradient>

        <CardNavigation />
        {/* <CardGaji /> */}
        {/* <CardKehadiran /> */}
      </ScrollView>
      <Animated.View
        style={[styles.outWorkingBtn, { transform: [{ translateY }] }]}
      >
        <Button
          onPress={() => navigation.navigate("Absen Camera")}
          icon={({ color, size }) => (
            <AntDesign
              name="camerao"
              color={color}
              size={size}
              style={styles.icon}
            />
          )}
          contentStyle={{
            backgroundColor: theme.danger,
            borderRadius: 20,
            margin: 10,
            height: 50,
            width: 300,
          }}
          color="#FFF"
        >
          Presensi Keluar
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 210,
    marginBottom: 60,
  },

  iconFeatures: {
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    fontSize: 25,
    fontWeight: "bold",
  },

  profileBanner: {
    padding: 10,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  chat: {
    width: "20%",
  },
  avatarProfile: {
    width: "10%",
  },
  profile: {
    width: "60%",
    marginLeft: 15,
  },
  nameProfile: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },
  jobProfile: {
    color: "#FFF",
  },
  profileNavigation: {
    width: "25%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecf0f6",
    padding: 7,
    borderRadius: 10,
  },
  nameNavigation: {
    color: "grey",
  },
  outWorking: {
    flexDirection: "row",
    borderColor: "#4FA095",
    alignItems: "center",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  contentBanner: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 90,
  },
  contentFeatures: {
    flexDirection: "column",
    backgroundColor: "#ecf0f6",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    width: "30%",
    margin: 5,
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

  btnNavigate: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
  },
  outWorkingBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    margin: 10,
  },
  bottomButton: {
    bottom: 0,
  },
});

export default Beranda;
