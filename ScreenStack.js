import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BarStack from "./BarStack";
import Login from "./screens/auth/Login";
import Cuti from "./screens/Cuti";
import add_izin_hari from "./controllers/add_izin_hari";
import Izin from "./screens/Izin";
import add_izin_jam from "./controllers/add_izin_jam";
import recognition from "./screens/recognition";
import Camera from "./services/camera";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersonalScreen from "./screens/PersonalScreen";
import SettingScreen from "./screens/SettingsScreen";
import ChatScreen from "./screens/ChatScreen";
import RoomChat from "./screens/RoomChat";
import StatusPengajuan from "./screens/StatusPengajuan";
import EditCuti from "./screens/EditCuti";
import { theme } from "./constant/color";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
const Stack = createStackNavigator();
const queryClient = new QueryClient();

const MainNavigator = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={BarStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cuti"
            component={Cuti}
            options={{
              headerTitle: "Pengajuan Cuti",
              headerTitleStyle: {
                color: theme.textColor,
              },
              headerStyle: {
                backgroundColor: theme.primary, // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={24}
                  color={theme.textColor}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Edit Cuti"
            component={EditCuti}
            options={{
              headerTitle: "Edit Pengajuan Cuti",
              headerTitleStyle: {
                color: theme.textColor,
              },
              headerStyle: {
                backgroundColor: theme.primary, // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={24}
                  color={theme.textColor}
                />
              ),
            }}
          />
          <Stack.Screen name="Izin" component={Izin} />
          <Stack.Screen
            name="Status Pengajuan"
            component={StatusPengajuan}
            options={{
              headerTitle: "Status Pengajuan",
              headerTitleStyle: {
                color: theme.textColor,
              },
              headerStyle: {
                backgroundColor: theme.primary, // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={24}
                  color={theme.textColor}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Izin Hari"
            component={add_izin_hari}
            options={{
              headerTitle: "Izin hari",
            }}
          />
          <Stack.Screen
            name="Izin Jam"
            component={add_izin_jam}
            options={{
              headerTitle: "Izin jam",
            }}
          />
          <Stack.Screen
            name="Recognition"
            component={recognition}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Absen Camera"
            component={Camera}
            options={{
              headerShown: false,
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={24}
                  color={theme.textColor}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Peronal Screen"
            component={PersonalScreen}
            options={{
              headerTitle: "Profil Saya",
              headerTitleStyle: {
                color: theme.textColor,
              },
              headerStyle: {
                backgroundColor: theme.primary, // Ubah sesuai warna yang diinginkan
              },
              headerBackImage: () => (
                <FontAwesome5
                  name="chevron-circle-left"
                  size={24}
                  color={theme.textColor}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Setting Screen"
            component={SettingScreen}
            options={{
              headerTitle: "Settings",
            }}
          />
          <Stack.Screen
            name="Chat Screen"
            component={ChatScreen}
            options={{
              headerTitle: "Messages",
            }}
          />
          <Stack.Screen
            name="Room Chat"
            component={RoomChat}
            options={{
              headerTitle: "Messages",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default MainNavigator;
