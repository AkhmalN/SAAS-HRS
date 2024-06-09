import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { socketIp } from "../api/config";

export const useRecognitionService = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [isDetecting, setIsDetecting] = useState([]);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [messageDetected, setMessageDetected] = useState("");
  const [progress, setProgress] = useState(0);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`${socketIp}`, {
      transports: ["websocket"],
    });

    socket.onopen = (e) => {
      console.log("Connected to the WebSocket server");
    };

    socket.onmessage = (event) => {
      console.log(event);
    };

    socket.onerror = (error) => {
      console.log("Error:", error.message);
    };

    socket.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleFaceDetected = async ({ faces }) => {
    if (isDetecting && cameraRef && cameraRef.current) {
      // Pastikan cameraRef telah terinisialisasi
      if (faces.length > 0) {
        try {
          const photo = await cameraRef.current.takePictureAsync({
            base64: true,
          }); // Gunakan cameraRef.current
          console.log(photo);
          // const blob = await convertToBlob(photo.uri); // Konversi URI ke blob
          // // console.log(blob); // Blob hasil konversi
          // sendBlobToWebSocket(blob); // Kirim blob ke WebSocket
        } catch (error) {
          console.error("Error capturing photo:", error);
        }
      }
      if (faces.length > 0) {
        const interval = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress < 100) {
              return prevProgress + 1; // Increment progress by 1%
            } else {
              clearInterval(interval); // Stop interval when progress reaches 100%
              return 100;
            }
          });
        }, 100); // Adjust interval duration as needed
      } else {
        setProgress((prevProgress) => Math.max(prevProgress - 1, 0)); // Decrement progress by 1% if no face detected
      }
    }
  };

  useEffect(() => {
    if (progress === 100) {
      // navigation.navigate("Main");
      setIsDetecting(false);
    }
  }, [progress]);

  const cancelFaceDetection = async () => {
    // setIsDetecting(false);
    // setMessageDetected("Scanning dihentikan");
    // setProgress(0);
    navigation.navigate("Main");
  };

  const renderFaceBox = () => {
    return detectedFaces.map((face, index) => (
      <View
        key={index}
        style={{
          position: "absolute",
          borderWidth: isDetecting ? 3 : 0, // Menyesuaikan lebar border berdasarkan kondisi isDetecting
          borderColor: "red",
          borderRadius: 5,
          left: face.bounds.origin.x,
          top: face.bounds.origin.y,
          width: face.bounds.size.width,
          height: face.bounds.size.height,
        }}
      />
    ));
  };
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
  return {
    isDetecting,
    hasPermission,
    cameraRef,
    detectedFaces,
    messageDetected,
    renderFaceBox,
    progress,
    handleFaceDetected,
    cancelFaceDetection,
  };
};
