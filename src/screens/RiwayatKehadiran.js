import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../constant/color";
import { DateFormat } from "../utils/DateFormat";
import ModalLoading from "../components/Modal/ModalLoading";
import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "../api/attendance";
import { useId } from "../context/userContext";
import { useToken } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RiwayatKehadiran = () => {
  const [idAttendance, setIdAttendance] = useState(null);
  const { id } = useId();
  const { token } = useToken();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [customDate, setCustomDate] = useState("");

  useEffect(() => {
    const fetchAttendanceId = async () => {
      try {
        const id = await AsyncStorage.getItem("id_attendance");
        console.log(id);
        setIdAttendance(id);
      } catch (error) {
        console.error("Failed to fetch attendance ID:", error);
      }
    };

    fetchAttendanceId();
  }, [id]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["attendance", idAttendance],
    queryFn: () => getAttendance(idAttendance, token),
  });

  // const months = [
  //   { title: "Januari" },
  //   { title: "Februari" },
  //   { title: "Maret" },
  //   { title: "April" },
  //   { title: "Mei" },
  //   { title: "Juni" },
  //   { title: "Juli" },
  //   { title: "Agustus" },
  //   { title: "September" },
  //   { title: "Oktober" },
  //   { title: "November" },
  //   { title: "Desember" },
  // ];

  // const showDatePicker = () => {
  //   setDatePickerVisible(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisible(false);
  // };

  // const handleDateConfirm = (date) => {
  //   hideDatePicker();
  //   setCustomDate(date);
  // };
  return (
    <View style={styles.container}>
      {isLoading && <ModalLoading />}
      <View style={styles.selectContainer}>
        {/* <View style={styles.selectDateContainer}>
          <AntDesign
            name="calendar"
            size={24}
            color={theme.primary}
            onPress={showDatePicker}
            style={styles.iconDate}
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          is30Hour={true}
        />
        <View style={styles.selectMonthContainer}>
          <SelectDropdown
            disabled
            data={months}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || "Maret 2024"}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View> */}
      </View>
      <View>
        <View style={styles.textDateContainer}>
          <Text style={styles.textDate}>
            Rekap Kehadiran {""}
            {data && data.tanggal ? DateFormat(data.tanggal) : "-"}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {data && data.tanggal
                ? DateFormat(data.tanggal)
                : "Kesalahan Sistem"}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={24}
                color={theme.primary}
              />
              <View style={styles.timeContainer}>
                <Text style={styles.textLabel}>Masuk</Text>
                <Text style={[styles.textTime, styles.textSuccess]}>
                  {data && data.masuk ? data.masuk : "-"}
                </Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.textLabel}>Keluar</Text>
                <Text style={[styles.textTime, styles.textDanger]}>
                  {data && data.pulang ? data.pulang : "-"}
                </Text>
              </View>
            </View>
            {/* <View style={styles.detailItem}>
              <Ionicons name="location" size={24} color={theme.primary} />
              <Text style={styles.locationText}>Jln apa aja yang penting</Text>
            </View> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  iconDate: {
    backgroundColor: "#E9ECEF",
    padding: 12,
    borderRadius: 12,
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  textDateContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  textDate: {
    fontSize: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    elevation: 3,
  },
  dateContainer: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailContainer: {},
  detailItem: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  timeContainer: {
    marginHorizontal: 15,
  },
  textLabel: {
    fontSize: 18,
  },
  textSuccess: {
    color: theme.success,
  },
  textDanger: {
    color: theme.danger,
  },
  textTime: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
  },
});
export default RiwayatKehadiran;
