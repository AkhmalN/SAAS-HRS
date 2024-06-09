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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPegawai } from "../api/pegawai";
import { useId } from "../context/userContext";
import ModalLoading from "../components/Modal/ModalLoading";
import { CreateDeduction, updateDeduction } from "../api/deduction";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const EditKasbon = () => {
  const route = useRoute();
  const { token } = useToken();
  const { id } = useId();
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const editedData = route.params && route.params.editedData;

  // Lifecycle
  const [modalVisible, setModalVisible] = useState(false);

  // InProcess
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // DATA DUMMY
  const [editId, setEditId] = useState(editedData.id);
  const [namaPotongan, setNamaPotongan] = useState(editedData.nama_potongan);
  const [jumlahPotongan, setJumlahPotongan] = useState(
    editedData.nilai_potongan
  );
  const [tglPotongan, setTglPotongan] = useState(
    FormFormat(new Date().toISOString())
  );
  const [keterangan, setKeterangan] = useState(editedData.keterangan);

  const handleNominal = (text) => {
    setJumlahPotongan(text);
  };
  const handleNoteChanges = (text) => {
    setKeterangan(text);
  };
  const data = {
    nama_potongan: namaPotongan,
    nilai_potongan: jumlahPotongan,
    tgl_potongan: tglPotongan,
    keterangan: keterangan,
    id_pegawai: id,
  };

  const handleOnSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await updateDeduction(editId, data);
      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
        await queryClient.refetchQueries(["kasbon"]);
        navigation.navigate("Status Kasbon");
      }
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };
  return (
    <View style={styles.container}>
      {isLoading && <ModalLoading />}
      {isSuccess && (
        <ModalComponent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          message={"Pengajuan Kasbon Berhasil Dibuat"}
          label={"Berhasil"}
        />
      )}
      <Text style={styles.label}>Kebutuhan : </Text>
      <TextInput
        keyboardType="default"
        numberOfLines={10}
        style={styles.inputForm}
        onChangeText={(text) => setNamaPotongan(text)}
        value={namaPotongan}
        underlineColor={theme.primaryColor}
      />
      <Text style={styles.label}>Nominal : </Text>
      <TextInput
        keyboardType="numeric"
        numberOfLines={10}
        style={styles.inputForm}
        onChangeText={handleNominal}
        value={jumlahPotongan.toString()}
        underlineColor={theme.primaryColor}
        left={<TextInput.Affix text="Rp." />}
      />

      <Text style={styles.label}>Keterangan : </Text>
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
    </View>
  );
};

export default EditKasbon;

const styles = StyleSheet.create({
  container: { padding: 20 },
  dateTimeContainer: {
    flexDirection: "row",
  },
  dateOnStart: {
    width: "100%",
  },
  label: {
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
