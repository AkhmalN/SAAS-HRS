import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useToken } from "../context/authContext";
import { updateIzinCuti } from "../api/izinCuti";
import { DateFormat, FormFormat } from "../utils/DateFormat";
import { theme } from "../constant/color";
import ModalComponent from "../components/Modal/Success";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../api/apiConfig";

const EditCuti = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  // Updated Data
  const editedData = route.params && route.params.editedData;

  // Lifecycle
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [dateType, setDateType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // InProcess
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Loading, setIsLoading] = useState(false);

  // DATA DUMMY
  const [idCuti, setIdCuti] = useState(editedData.id);
  const [nipPegawai, setNipPegawai] = useState(editedData.nip_pegawai);
  const [namaPegawai, setNamaPegawai] = useState(editedData.nama_pegawai);
  const [namaJabatan, setNamaJabatan] = useState(editedData.nama_jabatan);
  const [tglPermohonan, setTglPermohonan] = useState(
    FormFormat(new Date().toISOString())
  );
  const [tglAwalCuti, setTglAwalCuti] = useState(editedData.tgl_awal_cuti);
  const [tglAkhirCuti, setTglAkhirCuti] = useState(editedData.tgl_akhir_cuti);
  const [statusCuti, setStatusCuti] = useState(editedData.status_cuti);
  const [idPegawai, setIdPegawai] = useState(editedData.id_pegawai_izin);
  const [keterangan, setKeterangan] = useState(editedData.keterangan);

  const showDatePicker = (type) => {
    setDatePickerVisible(true);
    setDateType(type);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    if (dateType === "start") {
      setTglAwalCuti(FormFormat(date));
    } else if (dateType === "end") {
      setTglAkhirCuti(FormFormat(date));
    }
  };

  const handleNoteChanges = (text) => {
    setKeterangan(text);
  };

  const data = {
    nip_pegawai: nipPegawai,
    nama_pegawai: namaPegawai,
    nama_jabatan: namaJabatan,
    tgl_permohonan: tglPermohonan,
    tgl_awal_cuti: tglAwalCuti,
    tgl_akhir_cuti: tglAkhirCuti,
    status_cuti: statusCuti,
    keterangan: keterangan,
    id_pegawai_izin: idPegawai,
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await updateIzinCuti(idPegawai, data);
      if (response.status === 202) {
        await queryClient.refetchQueries(["data"]);
        navigation.navigate("Status Pengajuan");
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateOnStart}>
          <Text style={styles.textOnDate}>Tanggal Awal Cuti : </Text>
          <TextInput
            disabled
            label={tglAwalCuti ? `${DateFormat(tglAwalCuti)}` : "Pilih Tanggal"}
            style={styles.inputForm}
            right={
              <TextInput.Icon
                name={() => (
                  <Ionicons
                    name="calendar-outline"
                    size={30}
                    color={theme.primaryColor}
                    onPress={() => showDatePicker("start")}
                  />
                )}
              />
            }
          />
        </View>
      </View>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateOnStart}>
          <Text style={styles.textOnDate}>Tanggal Akhir Cuti : </Text>
          <TextInput
            disabled
            label={
              tglAkhirCuti ? `${DateFormat(tglAkhirCuti)}` : "Pilih Tanggal"
            }
            style={styles.inputForm}
            right={
              <TextInput.Icon
                name={() => (
                  <Ionicons
                    name="calendar-outline"
                    size={30}
                    color={theme.primaryColor}
                    onPress={() => showDatePicker("end")}
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
          Kirim Permintaan
        </Button>
      </View>
      {isError && <Text>Error occurred while sending data.</Text>}
      {isSuccess && (
        <ModalComponent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

export default EditCuti;

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
