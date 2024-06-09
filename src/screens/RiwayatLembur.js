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
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import { useToken } from "../context/authContext";
import { DateFormat } from "../utils/DateFormat";
import { theme } from "../constant/color";
import ModalDelete from "../components/Modal/DeleteCuti";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ModalLoading from "../components/Modal/ModalLoading";
import { GetDataLembur } from "../api/Lembur";
import useQueryAll from "../hooks/useQueryAll";

const RiwayatLembur = () => {
  const navigation = useNavigation();
  const { token } = useToken();
  const [modalVisible, setModalVisible] = useState(false);
  const [isdelete, setIsDelete] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const { isLoading, isError, data, error, isSuccess } = useQueryAll(
    ["data_lembur"],
    () => GetDataLembur(token)
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

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.contentContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"large"} color={theme.primaryColor} />
          </View>
        )}
        {isError && <Text>Terjadi kesalahan</Text>}
        {data && data.length === 0 && (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>Tidak ada data yang ditemukan</Text>
            <Image
              source={require("../../assets/NOT_FOUND(BG).png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
        {data &&
          data.map((data, id) => {
            return (
              <View style={styles.card} key={id}>
                <View style={styles.rowFlexEnd}>
                  <View style={styles.labelContainer}>
                    <Text
                      style={[styles.text, { fontSize: 18 }, styles.fontBold]}
                    >
                      {data.jam_mulai}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Entypo name="users" size={28} color={theme.primary} />
                  <Text style={styles.text}>
                    Status Kerja : {data.pegawai.status_kerja}
                  </Text>
                </View>
                <View style={styles.row}>
                  <FontAwesome5
                    name="user-tag"
                    size={28}
                    color={theme.primary}
                  />
                  <Text style={styles.text}>
                    Posisi : {data.pegawai.posisi}
                  </Text>
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
            );
          })}
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
    width: "100%",
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
    fontSize: 18,
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

export default RiwayatLembur;
