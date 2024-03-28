import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { useNavigation } from "@react-navigation/native";
import { DateFormat } from "../utils/DateFormat";
import { getCurrentLocation } from "../services/CurrentLocation";
import { useRecognitionService } from "../services/RecognitionService";
import { Ionicons } from "@expo/vector-icons";
import { useId } from "../context/userContext";
const Recognition = () => {
  const { setId } = useId();
  const [location, setLocation] = useState([]);
  const {
    isDetecting,
    hasPermission,
    cameraRef,
    messageDetected,
    // renderFaceBox,
    progress,
    handleFaceDetected,
    startFaceDetection,
    cancelFaceDetection,
  } = useRecognitionService();

  const date = new Date();

  useEffect(() => {
    (async () => {
      try {
        const currentLocation = await getCurrentLocation();
        setLocation(currentLocation);
        setId(1);
      } catch (error) {
        console.error("Gagal mendapatkan koordinat", error);
      }
    })();
  }, []);

  if (hasPermission == null) {
    return <View />;
  }
  if (hasPermission == false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Pegang handphone dengan posisi tegak</Text>
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.front}
            onFacesDetected={handleFaceDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.accurate,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 300,
              tracking: true,
            }}
            ref={cameraRef}
          >
            {/* {renderFaceBox()} */}
          </Camera>
          {progress === 100 && (
            <View style={styles.checkmarkContainer}>
              <Ionicons name="checkmark-outline" size={64} color="#FFF" />
            </View>
          )}
          <View
            style={[
              styles.progressBar,
              { transform: [{ rotate: `${progress * 3.6}deg` }] },
            ]}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={cancelFaceDetection}
          >
            <Text style={styles.cancelText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Recognition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    width: "80%",
  },
  cameraContainer: {
    position: "relative",
    width: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    borderRadius: 150, // Make it half of the width/height to make it appear circular
    overflow: "hidden",
  },
  progressBar: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderTopColor: "#4CCD99",
    borderTopWidth: 5,
    borderRightColor: "transparent",
    borderRightWidth: 5,
    borderBottomColor: "transparent",
    borderBottomWidth: 5,
    borderLeftColor: "transparent",
    borderLeftWidth: 5,
  },
  checkmarkContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -32 }, { translateY: -32 }], // Adjust the values based on icon size
    zIndex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonCancel: {
    borderColor: "red",
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  cancelText: {
    color: "red",
    fontSize: 18,
  },
});
