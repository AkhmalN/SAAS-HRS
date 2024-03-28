import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { theme } from "../constant/color";

export const navigationItems = [
  {
    label: "Istirahat",
    icon: (
      <Ionicons
        name="cafe-outline"
        size={40}
        color={"#4FA095"}
        style={{ color: theme.primary }}
      />
    ),
    onScreen: "Istirahat",
  },
  {
    label: "Lembur",
    icon: (
      <MaterialCommunityIcons
        name="clock"
        size={40}
        color={"#4FA095"}
        style={{ color: theme.primary }}
      />
    ),
    onScreen: "Lembur",
  },
  {
    label: "Cuti",
    icon: (
      <FontAwesome5
        name="user-clock"
        size={40}
        color={"#4FA095"}
        style={{ color: theme.primary }}
      />
    ),
    onScreen: "Cuti",
  },

  // {
  //   label: "Izin",
  //   icon: (
  //     <Ionicons
  //       name="hand-left-outline"
  //       size={40}
  //       color={"#4FA095"}
  //       style={{ color: theme.primary }}
  //     />
  //   ),
  //   onScreen: "Izin",
  // },
  {
    label: "Status Pengajuan",
    icon: (
      <MaterialCommunityIcons
        name="note-check"
        size={40}
        color={"#4FA095"}
        style={{ color: theme.primary }}
      />
    ),
    onScreen: "Status Pengajuan",
  },
  {
    label: "Karyawan",
    icon: (
      <Ionicons
        name="people-outline"
        size={40}
        color={"#4FA095"}
        style={{ color: theme.primary }}
      />
    ),
    onScreen: "Karyawan",
  },
];
