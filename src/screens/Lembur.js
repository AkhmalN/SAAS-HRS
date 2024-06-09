import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useToken } from "../context/authContext";
import { CreateIzinCuti, updateIzinCuti } from "../api/izinCuti";
import { DateFormat, FormFormat } from "../utils/DateFormat";
import { theme } from "../constant/color";
import ModalComponent from "../components/Modal/Success";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPegawai } from "../api/pegawai";
import { useId } from "../context/userContext";
import ModalLoading from "../components/Modal/ModalLoading";
import useQueryId from "../hooks/useQuery";
import { TimeFormat } from "../utils/TimeFormat";
import { CreateLembur } from "../api/Lembur";

const Lembur = () => {
  const { token } = useToken();
  const { id } = useId();

  // Lifecycle
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // InProcess
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [waktu, setWaktu] = useState("");
  const [keterangan, setKeterangan] = useState("");

  // Tanggal, jam mulai, jam selesai, keterangan

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (date) => {
    setDateTime(date);
    hideTimePicker();
    const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}Z`;

    setWaktu(timeString);
  };

  const handleNoteChanges = (text) => {
    setKeterangan(text);
  };

  const createLemburMutation = useMutation({
    mutationFn: async (data) => CreateLembur(data, token),

    onSuccess: (response) => {
      console.log(response.data);
      setModalVisible(true);
      setTimeout(() => {
        setWaktu("");
        setKeterangan("");
      }, 2000);
    },
    onError: (error) => {
      setModalVisible(true);
      setErrorMsg(error.message);
    },
  });
  const data = {
    jam_mulai: waktu,
    gaji_lembur: 0,
    keterangan: keterangan,
    id_pegawai: id,
  };
  const handleOnSubmit = async () => {
    createLemburMutation.mutate(data, token);
  };
  const showAlert = () => {
    Alert.alert(
      "Error",
      "terjadi kesalahan dalam mengajukan lembur",
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        {createLemburMutation.isPending && <ModalLoading />}
      </View>

      <View style={styles.dateTimeContainer}>
        <View style={styles.dateOnStart}>
          <Text style={styles.textOnDate}>Waktu Lembur: </Text>
          <TextInput
            disabled
            label={waktu ? `${TimeFormat(dateTime)}` : "Pilih Jam"}
            style={styles.inputForm}
            right={
              <TextInput.Icon
                name={() => (
                  <Ionicons
                    name="calendar-outline"
                    size={30}
                    color={theme.primaryColor}
                    onPress={() => showTimePicker()}
                  />
                )}
              />
            }
          />
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        is30Hour={true}
      />
      <Text style={styles.textOnDate}>Keperluan : </Text>
      <TextInput
        multiline
        numberOfLines={10}
        style={styles.inputNote}
        onChangeText={handleNoteChanges}
        value={keterangan}
        underlineColor={theme.primaryColor}
      />
      <View style={styles.buttonContainer}>
        <Button
          contentStyle={{
            backgroundColor: theme.primary,
            borderRadius: 10,
            marginTop: 20,
            height: 60,
          }}
          color="#FFF"
          onPress={handleOnSubmit}
        >
          Kirim Pengajuan
        </Button>
      </View>
      {/* {createIzinMutation.isPending && <ModalLoading />} */}
      {createLemburMutation.isError && (
        <ModalComponent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          message={errorMsg}
          label={"Gagal"}
        />
      )}
      {createLemburMutation.isSuccess && (
        <ModalComponent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          message={"Pengajuan Lembur Berhasil Dibuat"}
          label={"Berhasil"}
        />
      )}
    </View>
  );
};

export default Lembur;

const styles = StyleSheet.create({
  container: { padding: 20 },
  dateTimeContainer: {
    flexDirection: "row",
  },
  dateOnStart: {
    width: "100%",
  },
  textOnDate: {
    fontSize: 18,
    color: theme.secondaryTextColor,
    marginBottom: 10,
  },
  inputForm: {
    marginTop: 5,
    marginBottom: 5,
    height: 60,
    fontSize: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    fontSize: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
