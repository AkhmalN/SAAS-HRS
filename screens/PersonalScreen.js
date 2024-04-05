import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constant/color";
import { getPegawai } from "../api/pegawai";
import { useQuery } from "@tanstack/react-query";
import { useId } from "../context/userContext";
import ModalLoading from "../components/Modal/ModalLoading";

const PersonalScreen = () => {
  const { id } = useId();
  const [username, setUsername] = useState("TEST");
  const [password, setPassword] = useState("TEST");
  const [email, setEmail] = useState("TEST");
  const [showPassword, setShowPassword] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["pegawai", id],
    queryFn: () => getPegawai(id),
  });

  if (isLoading) return <ModalLoading />;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Image
            source={require("../assets/avatar.png")}
            style={styles.profileImage}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.firstName}>{data.nama}</Text>
            <Text style={styles.lastName}>{data.nama_belakang}</Text>
          </View>
          <Text style={styles.profileJob}>{data.posisi}</Text>
        </View>
        <View style={styles.formSection}>
          <View style={styles.formContainer}>
            <View style={styles.labelForm}>
              <Text style={styles.label}>Nama : </Text>
            </View>
            <View style={styles.formInput}>
              <Ionicons
                name="person-circle-outline"
                size={27}
                color={theme.primary}
                style={styles.iconLeft}
              />
              <TextInput
                placeholder="Username"
                value={data.nama}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.labelForm}>
              <Text style={styles.label}>Email : </Text>
            </View>
            <View style={styles.formInput}>
              <Ionicons
                name="mail-outline"
                size={27}
                color={theme.primary}
                style={styles.iconLeft}
              />
              <TextInput
                placeholder="Email"
                value={data.email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.labelForm}>
              <Text style={styles.label}>Posisi : </Text>
            </View>
            <View style={styles.formInput}>
              <Ionicons
                name={"eye-outline"}
                size={27}
                color={theme.primary}
                style={styles.iconLeft}
              />
              <TextInput
                placeholder="Password"
                value={data.posisi}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.labelForm}>
              <Text style={styles.label}>Jabatan : </Text>
            </View>
            <View style={styles.formInput}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={27}
                color={theme.primary}
                onPress={handleShowPassword}
                style={styles.iconLeft}
              />
              <TextInput
                placeholder="Password"
                value={data.jabatan}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.labelForm}>
              <Text style={styles.label}>Alamat : </Text>
            </View>
            <View style={styles.formInput}>
              <Ionicons
                name={"eye-outline"}
                size={27}
                color={theme.primary}
                style={styles.iconLeft}
              />
              <TextInput
                placeholder="Password"
                value={data.alamat}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.labelForm}>
              <Text style={styles.label}>NO Telepon : </Text>
            </View>
            <View style={styles.formInput}>
              <Ionicons
                name={"eye-outline"}
                size={27}
                color={theme.primary}
                style={styles.iconLeft}
              />
              <TextInput
                placeholder="Password"
                value={data.no_telepon}
                style={styles.input}
              />
            </View>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.labelForm}>
            <Text style={styles.label}>NO Identitas : </Text>
          </View>
          <View style={styles.formInput}>
            <Ionicons
              name={"eye-outline"}
              size={27}
              color={theme.primary}
              style={styles.iconLeft}
            />
            <TextInput
              placeholder="Password"
              value={data.no_identitas}
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}>
              Save
            </Text>
            {/* <ActivityIndicator size={"small"} color={"#FFF"} /> */}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  wrapper: {
    flexDirection: "column",
    justifyContent: "center",
  },
  headerSection: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameContainer: {
    flexDirection: "row",
  },
  firstName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: theme.primary,
    marginRight: 5,
  },
  lastName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: theme.primary,
  },
  profileJob: {
    color: theme.secondaryTextColor,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  formSection: {
    flexDirection: "column",
  },
  formContainer: {
    marginVertical: 3,
  },
  label: {
    fontSize: 16,
  },
  formInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  input: {
    width: "90%",
    height: 60,
    fontSize: 18,
    marginHorizontal: 5,
  },
  iconLeft: {
    width: "10%",
  },
  button: {
    height: 50,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default PersonalScreen;
