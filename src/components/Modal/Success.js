import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../constant/color";

const ModalComponent = ({ visible, onRequestClose, message, label }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.overlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                styles.modalText,
                label === "Berhasil" ? styles.successText : styles.errorText,
              ]}
            >
              {label}
            </Text>
            <Text style={styles.modalSubText}>{message}</Text>
            <Image
              style={styles.modalImgPreview}
              source={require("../../../assets/Modal_preview.png")}
            />
            <TouchableOpacity style={styles.button} onPress={onRequestClose}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.buttonText, { color: theme.textColor }]}>
                  Close
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    height: "40%",
    backgroundColor: "#F6F5F5",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    padding: 10,
    textAlign: "center",
    color: theme.success,
    fontSize: 25,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  successText: {
    color: "green", // Warna teks untuk label "Berhasil"
  },
  errorText: {
    color: "red", // Warna teks untuk label "Gagal"
  },
  modalSubText: {
    color: theme.secondaryTextColor,
    fontWeight: "400",
    fontSize: 18,
    marginVertical: 10,
  },
  modalImgPreview: {
    width: "50%",
    height: "50%",
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default ModalComponent;
