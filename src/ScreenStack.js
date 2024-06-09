import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BarStack from "./BarStack";
import Login from "./screens/auth/Login";
import Cuti from "./screens/Cuti";
import recognition from "./screens/recognition";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersonalScreen from "./screens/PersonalScreen";
import SettingScreen from "./screens/SettingsScreen";
import ChatScreen from "./screens/ChatScreen";
import RoomChat from "./screens/RoomChat";
import StatusPengajuan from "./screens/StatusPengajuan";
import EditCuti from "./screens/EditCuti";
import { theme } from "./constant/color";
import { FontAwesome5 } from "@expo/vector-icons";
import RiwayatKehadiran from "./screens/RiwayatKehadiran";
import Kasbon from "./screens/Kasbon";
import StatusKasbon from "./screens/StatusKasbon";
import EditKasbon from "./screens/EditKasbon";
import Lembur from "./screens/Lembur";
import RiwayatLembur from "./screens/RiwayatLembur";
import OnBoarding from "./screens/OnBoarding";
import KPI from "./screens/KPI";
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
            name="Lembur"
            component={Lembur}
            options={{
              headerTitle: "Pengajuan Lembur",
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
            name="Riwayat Lembur"
            component={RiwayatLembur}
            options={{
              headerTitle: "Riwayat Lembur",
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
            name="KPI"
            component={KPI}
            options={{
              headerTitle: "Pengajuan KPI",
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
            name="Riwayat Kehadiran"
            component={RiwayatKehadiran}
            options={{
              headerTitle: "Riwayat Kehadiran",
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
            name="Kasbon"
            component={Kasbon}
            options={{
              headerTitle: "Kasbon",
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
            name="Status Kasbon"
            component={StatusKasbon}
            options={{
              headerTitle: "Status Kasbon",
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
            name="Edit Kasbon"
            component={EditKasbon}
            options={{
              headerTitle: "Edit Kasbon",
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
            name="OnBoarding"
            component={OnBoarding}
            options={{
              headerShown: false,
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
            name="Room Chat"
            component={RoomChat}
            options={{
              headerTitle: "Bob",
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
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default MainNavigator;
