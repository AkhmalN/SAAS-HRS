import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { socketIp } from "../api/apiConfig";

const TestRecognition = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const handleCapture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync({ base64: true });
        const blob = await convertToBlob(photo.uri); // Konversi URI ke blob
        // console.log(blob); // Blob hasil konversi
        sendBlobToWebSocket(blob); // Kirim blob ke WebSocket
      } catch (error) {
        console.error("Error capturing photo:", error);
      }
    }
  };

  const convertToBlob = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error converting to blob:", error);
      throw error;
    }
  };

  const sendBlobToWebSocket = async (blob) => {
    try {
      // Buat koneksi WebSocket
      const socket = new WebSocket(`${socketIp}`);

      // Tunggu koneksi WebSocket terbuka
      socket.addEventListener("open", () => {
        console.log("WebSocket connection opened.");

        // Kirim blob ke WebSocket server
        socket.send(blob);
        console.log("Blob sent to WebSocket server.");
      });

      // Tangani error
      socket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });

      // Tangani penutupan koneksi WebSocket
      socket.addEventListener("close", () => {
        console.log("WebSocket connection closed.");
      });
    } catch (error) {
      console.error("Error sending Blob to WebSocket:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        ref={(ref) => setCameraRef(ref)}
      />
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    width: "100%",
    height: "80%",
  },
  captureButton: {
    backgroundColor: "#007AFF",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  captureButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default TestRecognition;
