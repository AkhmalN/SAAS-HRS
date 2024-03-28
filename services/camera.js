import { Camera, CameraType } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function AbsenCamera() {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [photo, setPhoto] = useState();

  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };
  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        const absenType = absenRoute.params?.absenType;
        console.log(absenType);

        setPhoto(undefined);
      });
    };
  }
  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };
  return (
    <Camera style={styles.container} type={cameraType} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePic} style={styles.button}>
          <Text style={styles.buttonText}>
            <Ionicons name="radio-button-on-outline" size={60} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
          <Text style={styles.buttonText}>
            {cameraType === Camera.Constants.Type.front ? (
              <Ionicons name="reload-outline" size={50} />
            ) : (
              <Ionicons
                name="reload-outline"
                size={50}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 40,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4, // Sesuaikan lebar tombol
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  actionCam: {
    flexDirection: "row",
    height: 80,
    marginBottom: 20,
    marginTop: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
  },
  switchButton: {
    backgroundColor: "#4A7C59",
    padding: 10,
    borderRadius: 5,
  },
  switchButtonText: {
    color: "white",
  },
  buttonAction: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 100,
    margin: 10,
    height: 50,
    backgroundColor: "#088395",
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },

  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});