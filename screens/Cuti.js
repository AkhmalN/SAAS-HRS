import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
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

const Cuti = () => {
  const { token } = useToken();
  const { id } = useId();

  // Lifecycle
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [dateType, setDateType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // InProcess
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Loading, setIsLoading] = useState(false);

  // DATA DUMMY
  const [tglPermohonan, setTglPermohonan] = useState(
    FormFormat(new Date().toISOString())
  );
  const [tglAwalCuti, setTglAwalCuti] = useState("");
  const [tglAkhirCuti, setTglAkhirCuti] = useState("");
  const [statusCuti, setStatusCuti] = useState("Ditinjau");
  const [idPegawai, setIdPegawai] = useState(11);
  const [keterangan, setKeterangan] = useState("");

  const { isLoading, data, error } = useQuery({
    queryKey: ["pegawai", id],
    queryFn: () => getPegawai(id),
  });

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

  const dataCuti = {
    nip_pegawai: data.nip,
    nama_pegawai: data.nama,
    nama_jabatan: data.posisi,
    tgl_permohonan: tglPermohonan,
    tgl_awal_cuti: tglAwalCuti,
    tgl_akhir_cuti: tglAkhirCuti,
    status_cuti: statusCuti,
    keterangan: keterangan,
    id_pegawai_izin: idPegawai,
  };

  const createIzinMutation = useMutation({
    mutationFn: CreateIzinCuti,
    onSuccess: () => {
      setIsLoading(false);
      setIsSuccess(true);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setTglAwalCuti("");
        setTglAkhirCuti("");
        setKeterangan("");
      }, 2000);
    },
    onError: (error) => {
      setIsLoading(false);
      setIsError(true);
      console.error(error);
    },
  });

  const handleOnSubmit = async () => {
    setIsLoading(true);
    createIzinMutation.mutate(dataCuti, token);
  };
  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        {isLoading && <ModalLoading />}
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
          // onPress={handleRequestSubmission}
          onPress={handleOnSubmit}
        >
          {/* {isEditing ? "Update permintaan" : "Kirim Permintaan"} */}
          Kirim Permintaan
        </Button>
      </View>
      {/* {updateIzinMutation.isError && <Text>Loading...</Text>} */}
      {createIzinMutation.isPending && <ModalLoading />}
      {isError && <Text>Error occurred while sending data.</Text>}
      {isSuccess && (
        <ModalComponent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          message={"Pengajuan Cuti Berhasil Dibuat"}
          label={"Berhasil"}
        />
      )}
    </View>
  );
};

export default Cuti;

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
