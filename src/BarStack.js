import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Beranda from "./screens/Beranda";
import Aktifitas from "./screens/Aktifitas";
import Jadwal from "./screens/Jadwal";
import Notifikasi from "./screens/Notifikasi";
import Profil from "./screens/Profil";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { theme } from "./constant/color";

const Tab = createBottomTabNavigator();

const BarStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{
          tabBarInactiveTintColor: "#B4B4B3",
          tabBarActiveTintColor: theme.primary,
          // headerTitle: () => (
          //   <View style={styles.headerFlex}>
          //     <Image
          //       source={require("./assets/ICON_LOGO.png")}
          //       style={styles.headerLogo}
          //     />
          //   </View>
          // ),
          headerTitle: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              color={focused ? theme.primary : "#B4B4B3"}
              size={30}
            />
          ),
          headerStyle: {
            backgroundColor: "#00008B", // Ganti dengan warna yang diinginkan
          },
        }}
      />
      <Tab.Screen
        name="Jadwal"
        component={Jadwal}
        options={{
          tabBarInactiveTintColor: "#B4B4B3",
          tabBarActiveTintColor: theme.primary,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="timer-settings-outline"
              color={focused ? theme.primary : "#B4B4B3"}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Aktifitas"
        component={Aktifitas}
        options={{
          tabBarInactiveTintColor: "#B4B4B3",
          tabBarActiveTintColor: theme.primary,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name="date"
              color={focused ? theme.primary : "#B4B4B3"}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifikasi"
        component={Notifikasi}
        options={{
          tabBarInactiveTintColor: "#B4B4B3",
          tabBarActiveTintColor: theme.primary,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused }) => (
            <Feather
              name="bell"
              color={focused ? theme.primary : "#B4B4B3"}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil & Settings"
        component={Profil}
        options={{
          tabBarInactiveTintColor: "#B4B4B3",
          tabBarActiveTintColor: theme.primary,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user"
              color={focused ? theme.primary : "#B4B4B3"}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerFlex: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00008B",
    width: "100%",
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  headerLogo: {
    width: 100,
    height: 40,
  },
});

export default BarStack;
