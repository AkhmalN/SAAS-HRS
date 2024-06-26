import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useToken } from "../../context/authContext";
import { Ionicons } from "@expo/vector-icons";
import { Auth } from "../../api/auth";
import { theme } from "../../constant/color";
import { StatusBar } from "expo-status-bar";
import ModalLoading from "../../components/Modal/ModalLoading";

export default function Login() {
  const { setToken } = useToken();

  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(null);
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true);
    navigation.navigate("OnBoarding");
    // try {
    //   const response = await Auth(username, password);
    //   if (response.status === 200) {
    //     setToken(response.data.access_token);
    //     setLoading(false);
    //     navigation.navigate("Recognition");
    //   }
    // } catch (error) {
    //   setError(true);
    //   setLoading(false);
    //   setErrorMessage(error.message);
    //   setTimeout(() => {
    //     setErrorMessage(null);
    //     setError(false);
    //   }, 2000);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      {loading && <ModalLoading />}

      <View style={styles.formBox}>
        {error && (
          <View style={styles.errorField}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
        <Text style={styles.label}>Username</Text>

        <View style={styles.inputField}>
          <Ionicons
            name="person-circle-outline"
            size={30}
            color={theme.primaryColor}
            style={styles.icon}
          />
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
        </View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputField}>
          <Ionicons
            name="lock-closed-outline"
            size={30}
            color={theme.primaryColor}
            style={styles.icon}
          />

          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={showPassword}
            style={styles.input}
          />
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={25}
            color={theme.primaryColor}
            onPress={handleShowPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonForgot} onPress={handleLogin}>
          <Text style={styles.buttonTextForgot}>Lupa password ?</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={theme.primary} style="light" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.backgroundPrimary,
  },
  formBox: {
    margin: 20,
    backgroundColor: theme.textColor,
    padding: 20,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  icon: {
    borderRightWidth: 0.5,
    paddingHorizontal: 5,
  },
  errorField: {
    backgroundColor: "#EF4040",
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#088395",
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: theme.primaryColor,
  },
  inputField: {
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    width: "72%",
    marginLeft: 10,
    fontSize: 18,
  },
  button: {
    textAlign: "right",
    width: "100%",
    height: 50,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonForgot: {
    textAlign: "right",
    width: "100%",
    height: 50,

    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  buttonTextForgot: {
    color: theme.primaryColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
