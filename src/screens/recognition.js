import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { socketIp } from "../api/config";
import { useId } from "../context/userContext";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../constant/color";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAttendance, getAttendance } from "../api/attendance";
import ModalLoading from "../components/Modal/ModalLoading";
import { getPegawai } from "../api/pegawai";
import ModalComponent from "../components/Modal/Success";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToken } from "../context/authContext";
import useQueryId from "../hooks/useQuery";
import * as FaceDetector from "expo-face-detector";
import useOverlayAnimation from "../hooks/useOverlayAnimate";
import { convertToBlob } from "../utils/BlobConvert";
import ProgressBar from "../components/Indicator";

// const socket = new WebSocket(`${socketIp}`);

const Recognition = () => {
  const cameraRef = useRef();
  const navigation = useNavigation();
  const { id } = useId();
  const { token } = useToken();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [statusVerified, setStatusVerified] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [capturedImageIndex, setCapturedImageIndex] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [progressValue, setProgressValue] = useState(0);
  const { animateOverlay, progress, translateY } = useOverlayAnimation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    <View>Izin akses kamera tidak disetujui</View>;
  }

  // const {
  //   isLoading: isLoadingPegawai,
  //   isError: isErrorPegawai,
  //   data: isDataPegawai,
  //   error: errorMsgPegawai,
  // } = useQueryId(["pegawai"], getPegawai);

  // const {
  //   isLoading: isLoadingAttendance,
  //   isError: isErrorAttendance,
  //   data: isDataAttendance,
  //   error: errorMsgAttendance,
  // } = useQueryId(["attendance"], getAttendance);

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      // handleCapture();
      navigation.navigate("Main");
    }
  };

  const handleCapture = async () => {
    if (cameraRef && cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();

        const blob = await convertToBlob(photo.uri);
        setCapturedImages([...capturedImages, blob]);
        setCapturedImageIndex(capturedImages.length);
        sendBlobToWebSocket(blob);
        setCapturedImages([...capturedImages, blob]);
        animateOverlay();
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    } else {
      console.error("Camera reference is not defined.");
    }
  };

  const createMutation = useMutation({
    mutationFn: createAttendance,
    onSuccess: (response) => {
      AsyncStorage.setItem("id_attendance", String(response.data.id));
      setIsSuccess(true);
      setModalVisible(true);
      setLoadingPost(false);
    },
    onError: (error) => {
      setLoadingPost(false);
    },
  });

  // const dataAttendance = {
  //   nip: isDataPegawai ? isDataPegawai.nip : null,
  //   status_kehadiran: "Hadir",
  //   keterangan: "Absen Masuk",
  //   id_pegawai: id,
  // };

  // console.log(token);
  const handleSendAttendance = async () => {
    setLoadingPost(true);
    createMutation.mutate(dataAttendance, token);
  };

  const sendBlobToWebSocket = async (blob) => {
    socket.send(blob);

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      const status = message.status;
      const progress = message.progress;
      setStatusVerified(status);
      setProgressValue(progress);
    });
  };

  // useEffect(() => {
  //   return () => {
  //     socket.removeEventListener("message");
  //   };
  // }, []);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  const getImageURI = (blob) => {
    const source = Image.resolveAssetSource({ uri: blob._uri });
    return source.uri;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
        ref={cameraRef}
      />
      {/* {isLoadingPegawai && <ModalLoading />}
      {isLoadingAttendance && <ModalLoading />} */}
      {loadingPost && <ModalLoading />}
      {isSuccess && (
        <ModalComponent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          message={"Kehadiran Berhasil Dibuat"}
          label={"Berhasil"}
        />
      )}
      {progress && (
        <Animated.View
          style={[styles.lineScanner, { transform: [{ translateY }] }]}
        ></Animated.View>
      )}

      <View style={styles.faceOverlay}>
        <View style={[styles.topLeft, styles.border]} />
        <View style={[styles.topRight, styles.border]} />
        <View style={[styles.bottomLeft, styles.border]} />
        <View style={[styles.bottomRight, styles.border]} />
      </View>
      {statusVerified && (
        <View
          style={[
            styles.overlayContainer,
            {
              backgroundColor:
                statusVerified === "Asli" ? theme.success : theme.danger,
            },
          ]}
        >
          <Text style={styles.overlayText}>
            Status verifikasi {statusVerified}
          </Text>
        </View>
      )}
      {statusVerified && (
        <View style={[styles.progressOverlay, { width: progressValue }]}>
          <Text style={{ color: theme.light }}>{`${progressValue}%`}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {capturedImageIndex !== null && (
          <Image
            source={{ uri: getImageURI(capturedImages[capturedImageIndex]) }}
            style={styles.previewImage}
          />
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "grey" }]}
          onPress={toggleCameraType}
        >
          <Text style={styles.buttonText}>
            <MaterialIcons name="flip-camera-ios" size={35} color="#FFF" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCapture}>
          <Text style={styles.buttonText}>
            <MaterialCommunityIcons
              name="face-recognition"
              size={35}
              color="#FFF"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  faceOverlay: {
    position: "relative",
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "transparent", // Menyembunyikan warna border secara umum
    position: "absolute",
    width: "70%",
    height: "40%",
    zIndex: 1,
    top: "20%",
    left: "15%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  border: {
    position: "absolute",
    width: 20,
    height: 20,
    borderWidth: 4,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopColor: theme.primary,
    borderLeftColor: theme.primary,
    borderRightColor: "transparent", // Tidak menampilkan warna di sisi right
    borderBottomColor: "transparent", // Tidak menampilkan warna di sisi bottom
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopColor: theme.primary,
    borderRightColor: theme.primary,
    borderLeftColor: "transparent", // Tidak menampilkan warna di sisi left
    borderBottomColor: "transparent", // Tidak menampilkan warna di sisi bottom
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomColor: theme.primary,
    borderLeftColor: theme.primary,
    borderTopColor: "transparent", // Tidak menampilkan warna di sisi top
    borderRightColor: "transparent", // Tidak menampilkan warna di sisi right
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomColor: theme.primary,
    borderRightColor: theme.primary,
    borderTopColor: "transparent", // Tidak menampilkan warna di sisi top
    borderLeftColor: "transparent", // Tidak menampilkan warna di sisi left
  },
  lineScanner: {
    position: "absolute",
    zIndex: 1,
    top: "20%",
    left: "15%",
    paddingVertical: 5,
    borderColor: theme.primary,
    borderTopWidth: 3,
    width: "70%",
    shadowColor: theme.primary, // Warna bayangan
    height: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Atur warna latar belakang dengan alpha (transparan)
  },

  overlayContainer: {
    position: "absolute",
    zIndex: 1,
    top: "22%",
    left: "20%",
    backgroundColor: theme.danger,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  progressOverlay: {
    position: "absolute",
    zIndex: 1,
    top: "63%",
    left: "15%",
    backgroundColor: theme.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 30,
  },
  overlayText: {
    color: "#FFF",
    fontSize: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 40,
    alignItems: "center",
  },
  previewImage: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  button: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 15,
    backgroundColor: theme.primary,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Recognition;
