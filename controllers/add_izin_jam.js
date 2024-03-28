import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateFormat } from "../utils/DateFormat";
import { TimeFormat } from "../utils/TimeFormat";
import { theme } from "../constant/color";
const IzinJam = () => {
  const [selectedDocument, setSelectedDocument] = useState([]);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [dateType, setDateType] = useState(null);
  const [timeType, setTimeType] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");

  const showDatePicker = (type) => {
    setDatePickerVisible(true);
    setDateType(type);
  };

  const showTimePicker = (type) => {
    setTimePickerVisibility(true);
    setTimeType(type);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    if (dateType === "start") {
      console.log("start date", date);
      setStartDate(date);
    } else if (dateType === "end") {
      console.log("end date", date);
      setEndDate(date);
    }

    setDateType(null);
  };

  const handleTimeConfirm = (time) => {
    hideTimePicker();
    if (timeType === "start") {
      console.log("time start", time);
      setStartTime(time);
    } else if (timeType === "end") {
      console.log("time end", time);
      setEndTime(time);
    }

    setTimeType(null);
  };

  const handleNoteChanges = (text) => {
    setNotes(text);
  };

  const selectDoc = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      if (result) {
        setSelectedDocument(result.assets);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateOnStart}>
          <Text>Tanggal mulai</Text>
          <TextInput
            disabled
            label={startDate ? `${DateFormat(startDate)}` : "Pilih Tanggal"}
            style={styles.inputForm}
            right={
              <TextInput.Icon
                name={() => (
                  <Ionicons
                    name="calendar-outline"
                    size={24}
                    color={theme.primaryColor}
                    onPress={() => showDatePicker("start")}
                  />
                )}
              />
            }
          />
        </View>
        <View style={styles.timeOnStart}>
          <Text>Jam mulai</Text>
          <TextInput
            disabled
            label={startTime ? `${TimeFormat(startTime)}` : "Pilih jam"}
            style={styles.inputForm}
            right={
              <TextInput.Icon
                name={() => (
                  <Ionicons
                    name="time-outline"
                    size={24}
                    color={theme.primaryColor}
                    onPress={() => showTimePicker("start")}
                  />
                )}
              />
            }
          />
        </View>
      </View>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateOnStart}>
          <Text>Tanggal selesai</Text>
          <TextInput
            disabled
            label={endDate ? `${DateFormat(endDate)}` : "Pilih Tanggal"}
            style={styles.inputForm}
            right={
              <TextInput.Icon
                name={() => (
                  <Ionicons
                    name="calendar-outline"
                    size={24}
                    color={theme.primaryColor}
                    onPress={() => showDatePicker("end")}
                  />
                )}
              />
            }
          />
        </View>
        <View style={styles.timeOnStart}>
          <Text>Jam selesai</Text>
          <TextInput
            disabled
            label={endTime ? `${TimeFormat(endTime)}` : "Pilih jam"}
            style={styles.inputForm}
            right={
              <TextInput.Icon
                name={() => (
                  <Ionicons
                    name="time-outline"
                    size={24}
                    color={theme.primaryColor}
                    onPress={() => showTimePicker("end")}
                  />
                )}
              />
            }
          />
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        is24Hour={true}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        is24Hour={true}
      />

      <Text>Keperluan</Text>
      <TextInput
        multiline
        numberOfLines={10}
        style={styles.inputNote}
        onChangeText={handleNoteChanges}
        value={notes}
      />
      <Text>Lampiran</Text>
      <View style={styles.attachmentContainer}>
        <TouchableOpacity style={styles.attachmentBtn} onPress={selectDoc}>
          <Ionicons name="add-outline" size={35} color={theme.primaryColor} />
        </TouchableOpacity>
        {selectedDocument.length > 0 ? (
          <Ionicons name="document-text-outline" size={50} />
        ) : (
          <Text>Tidak ada file yang diunggah</Text>
        )}
        {selectedDocument.map((el, id) => {
          return <Text key={id}>{el.name}</Text>;
        })}
      </View>
      <Button
        contentStyle={{
          backgroundColor: theme.primaryColor,
          borderRadius: 20,
          marginTop: 20,
          height: 50,
        }}
        color="#FFF"
        onPress={() => console.log("pressed")}
      >
        Kirim Permintaan
      </Button>
    </View>
  );
};

export default IzinJam;

const styles = StyleSheet.create({
  container: { padding: 20 },
  dateTimeContainer: {
    flexDirection: "row",
  },
  dateOnStart: {
    width: "60%",
  },
  timeOnStart: {
    marginLeft: 5,
    width: "40%",
  },
  inputForm: {
    marginTop: 5,
    marginBottom: 5,
    height: 45,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
  },
  closeIcon: {
    fontSize: 30,
  },
  inputNote: {
    padding: 7,
    marginTop: 5,
    marginBottom: 5,
  },
  attachmentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  attachmentBtn: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 0.5,
    width: "20%",
    padding: 10,
    marginRight: 10,
  },
});
