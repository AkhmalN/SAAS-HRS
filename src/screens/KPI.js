import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Button, List } from "react-native-paper";
import { FormFormat } from "../utils/DateFormat";
import { theme } from "../constant/color";
import ModalComponent from "../components/Modal/Success";
import ModalLoading from "../components/Modal/ModalLoading";

const KPI = () => {
  const items = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
  ];
  // Lifecycle
  const [modalVisible, setModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // InProcess
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // DATA DUMMY
  const [keterangan, setKeterangan] = useState("");
  const [kpiGrup, setKpiGrup] = useState("");
  const handleNoteChanges = (text) => {
    setKeterangan(text);
  };
  const handlePress = () => setExpanded(!expanded);
  console.log(kpiGrup);
  const handleOnSubmit = async () => {};
  return (
    <View style={styles.container}>
      {isLoading && <ModalLoading />}
      {isSuccess && (
        <ModalComponent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          message={"Pengajuan KPI Berhasil Dibuat"}
          label={"Berhasil"}
        />
      )}

      <Text style={styles.label}>KPI Grup : </Text>
      <View style={{ borderColor: "gray", borderRadius: 7, borderWidth: 0.5 }}>
        <List.Section>
          <List.Accordion
            title={kpiGrup ? kpiGrup : "Pilih KPI Grup"}
            titleStyle={{ fontSize: 20 }}
            onPress={handlePress}
            expanded={expanded}
          >
            {items.map((item) => (
              <List.Item
                key={item.id}
                onPress={() => {
                  setKpiGrup(item.name);
                  setExpanded(false);
                }}
                title={item.name}
              />
            ))}
          </List.Accordion>
        </List.Section>
      </View>

      <Text style={styles.label}>Realisasi : </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderRadius: 7,
          borderWidth: 0.5,
          fontSize: 20,
          minHeight: 60,
          padding: 10,
        }}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Keterangan : </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderRadius: 7,
          borderWidth: 0.5,
          fontSize: 20,
          minHeight: 100,
          padding: 10,
        }}
        multiline
        numberOfLines={4}
        keyboardType="default"
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

export default KPI;

const styles = StyleSheet.create({
  container: { padding: 20 },
  dateTimeContainer: {
    flexDirection: "row",
  },
  dateOnStart: {
    width: "100%",
  },
  label: {
    fontSize: 20,
    color: theme.secondaryTextColor,
    marginVertical: 10,
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
