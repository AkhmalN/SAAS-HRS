import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import logoPdf from "../assets/pdf.png";
import DateTimePicker from "@react-native-community/datetimepicker";

const IzinHari = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState([]);

  const showDatepicker = () => {
    setShow(!show);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // On iOS, show the picker again after selecting a date
    setDate(currentDate);
  };
  const formattedDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
      <Text>Tanggal</Text>
      <TextInput
        disabled
        placeholder={date ? formattedDate : "Pilih Tanggal"}
        right={
          <TextInput.Icon
            name={() => (
              <Ionicons
                name="calendar-outline"
                size={30}
                color={"#29ADB2"}
                onPress={showDatepicker}
              />
            )}
          />
        }
      />
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Text>Keperluan</Text>
      <TextInput multiline numberOfLines={10} style={styles.inputNote} />
      <Text>Lampiran</Text>
      <View style={styles.attachmentContainer}>
        <TouchableOpacity style={styles.attachmentBtn} onPress={selectDoc}>
          <Ionicons name="add-outline" size={35} color={"#29ADB2"} />
        </TouchableOpacity>
        {selectedDocument.length > 0 ? (
          <Ionicons name="document-text-outline" size={50} />
        ) : (
          <Text>Gak Ada</Text>
        )}
        {selectedDocument.map((el, id) => {
          return <Text key={id}>{el.name}</Text>;
        })}
      </View>
      <Button
        contentStyle={{
          backgroundColor: "#29ADB2",
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

export default IzinHari;

const styles = StyleSheet.create({
  container: { padding: 20 },
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
    padding: 10,
    marginTop: 5,
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
