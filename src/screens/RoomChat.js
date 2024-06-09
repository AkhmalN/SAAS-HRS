import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { theme } from "../constant/color";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // State untuk menyimpan pesan
  const [inputMessage, setInputMessage] = useState(""); // State untuk menyimpan pesan yang sedang diketik

  // Fungsi untuk menambahkan pesan baru
  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: String(messages.length + 1), // Buat ID baru dengan panjang pesan + 1
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString(), // Waktu pesan dibuat
        sender: "user", // Pengirim pesan (misalnya: "user" atau "bot")
      };
      setMessages([...messages, newMessage]); // Tambahkan pesan baru ke daftar pesan
      setInputMessage(""); // Reset TextInput setelah pesan terkirim
    }
  };

  // Render untuk setiap item pesan
  const renderChatMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        { alignSelf: item.sender === "user" ? "flex-end" : "flex-start" },
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderChatMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted // Untuk menampilkan pesan dalam urutan kronologis terbalik (pesan terbaru di bagian bawah)
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          onSubmitEditing={sendMessage} // Ketika pengguna menekan tombol "Enter" atau "Send" di keyboard
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send-outline" color={theme.textColor} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: "80%",
    alignSelf: "flex-end", // Pesan dari pengguna akan ditampilkan di sebelah kiri
  },
  messageText: {
    backgroundColor: "#EEEEEE",
    padding: 10,
    borderRadius: 10,
  },
  messageTimestamp: {
    fontSize: 12,
    marginTop: 5,
    color: "#999999",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
    height: 60,
  },
  sendButton: {
    backgroundColor: theme.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ChatScreen;
