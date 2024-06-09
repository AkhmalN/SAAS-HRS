import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getIzinCuti } from "../api/izinCuti";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { useToken } from "../context/authContext";
import { DateFormat } from "../utils/DateFormat";
import { theme } from "../constant/color";
import ModalDelete from "../components/Modal/DeleteCuti";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ModalLoading from "../components/Modal/ModalLoading";
import useQueryId from "../hooks/useQuery";

const StatusPengajuan = () => {
  const navigation = useNavigation();
  const { token } = useToken();
  const [modalVisible, setModalVisible] = useState(false);
  const [isdelete, setIsDelete] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const { isLoading, isError, data, error } = useQueryId(
    ["data_izinCuti"],
    getIzinCuti
  );

  const handleEdit = (data) => {
    // updateIzinMutation.mutate(id, data, token);
    navigation.navigate("Edit Cuti", { editedData: data });
  };

  const handleDelete = (data) => {
    setIsDelete(data);
    setModalVisible(true);
    setIsEdit(true);
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Ditinjau":
        return theme.warning;
      case "Diterima":
        return theme.success;
      case "Ditolak":
        return theme.danger;
      default:
        return "#000000";
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.contentContainer}>
        {isLoading && <ModalLoading />}
        {isError && <Text>{error.message}</Text>}
        {data && data.length === 0 && (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>Tidak ada data yang ditemukan</Text>
            <Image
              source={require("../../assets/NOT_FOUND(BG).png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}

        {data && (
          <View style={styles.card}>
            <View style={styles.rowFlexEnd}>
              <View style={styles.labelContainer}>
                <Text style={[styles.text, { fontSize: 18 }, styles.fontBold]}>
                  {DateFormat(data.tgl_permohonan)}
                </Text>
              </View>
              <View
                style={[
                  styles.labelContainer,
                  styles.labelContainerStatus,
                  { backgroundColor: getStatusTextColor(data.status_cuti) },
                ]}
              >
                <Text style={[styles.textStatus]}>{data.status_cuti}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Ionicons
                name="arrow-forward-circle-outline"
                size={28}
                color={theme.primary}
              />
              <Text style={styles.text}>{DateFormat(data.tgl_awal_cuti)}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={28}
                color={theme.danger}
              />
              <Text style={styles.text}>{DateFormat(data.tgl_akhir_cuti)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Keterangan:</Text>
              <Text style={styles.text}>{data.keterangan}</Text>
            </View>
            <View style={[styles.row, { justifyContent: "flex-end" }]}>
              <TouchableOpacity onPress={() => handleEdit(data)}>
                <Text style={[styles.button, styles.editButton]}>
                  <Ionicons name="create-outline" size={25} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(data)}>
                <Text style={[styles.button, styles.deleteButton]}>
                  <Ionicons name="trash-outline" size={25} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isEdit && (
          <ModalDelete
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            data={isdelete}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100, // Sesuaikan dengan posisi yang diinginkan
  },
  noDataText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.primary,
  },
  card: {
    backgroundColor: "#ecf0f6",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  rowFlexEnd: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    height: 30,
  },
  labelContainer: {
    width: "70%",
  },
  labelContainerStatus: {
    width: "30%",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
  },
  fontBold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  textStatus: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    marginRight: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  editButton: {
    backgroundColor: theme.warning,
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StatusPengajuan;
