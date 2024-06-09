import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { theme } from "../constant/color";
import { useNavigation } from "@react-navigation/native";

const OnBoarding = () => {
  const navigation = useNavigation();

  const handleToRecognition = () => {
    navigation.navigate("Recognition");
  };
  return (
    <SafeAreaView>
      <View
        style={{
          marginVertical: 100,
          marginHorizontal: 50,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
          >
            Ambil Selfie
          </Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "grey",
              fontWeight: "bold",
            }}
          >
            Penggunaan Pengenalan Wajah untuk Memverifikasi Akun Berdasarkan
            Kecocokan Wajah Anda
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../../assets/onboarding.png")}
            style={{ width: 250, height: 250 }}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                width: "10%",
                fontSize: 30,
                backgroundColor: theme.primary,

                textAlign: "center",
                borderRadius: 100,
                color: theme.light,
              }}
            >
              1
            </Text>
            <View style={{ flexDirection: "column", marginHorizontal: 7 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Pencahayaan bagus dan terang
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 5,
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                Usahakan berada pada ruangan atau tempat yang mendapat
                pencahayaan dan penerangan baik
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                width: "10%",
                fontSize: 30,
                backgroundColor: theme.primary,
                textAlign: "center",
                borderRadius: 100,
                color: theme.light,
              }}
            >
              2
            </Text>
            <View style={{ flexDirection: "column", marginHorizontal: 7 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Fokus pada camera
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 5,
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                Pastikan kamera berfungsi dengan baik, lalu fokuskan wajah anda
                pada kamera
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={handleToRecognition}
              style={{
                backgroundColor: theme.primary,
                paddingVertical: 15,
                paddingHorizontal: 30,
                flexDirection: "column",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  color: theme.light,
                  fontSize: 18,
                }}
              >
                Open Camera
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;
