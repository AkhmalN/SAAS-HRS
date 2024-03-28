import { useNavigation } from "@react-navigation/native";
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

const ChatScreen = () => {
  // Dummy data representing multiple users and their last message
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const users = [
    {
      id: "1",
      name: "John",
      lastMessage: {
        message: "Hello there!",
        time: "10:30 AM",
      },
      profileImage: require("../assets/avatar.png"),
    },
    {
      id: "2",
      name: "Alice",
      lastMessage: {
        message: "Hi, how can I help you?",
        time: "11:45 AM",
      },
      profileImage: require("../assets/avatar.png"),
    },
    {
      id: "3",
      name: "Bob",
      lastMessage: {
        message: "Hey, what's up?",
        time: "12:15 PM",
      },
      profileImage: require("../assets/avatar.png"),
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Render individual user item
  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigation.navigate("Room Chat")}
    >
      <Image source={item.profileImage} style={styles.profileImage} />
      <View style={styles.messageContent}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage.message}</Text>
      </View>
      <Text style={styles.messageTime}>{item.lastMessage.time}</Text>
    </TouchableOpacity>
  );

  // Filter the users if search query is provided
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search User..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={searchQuery.length > 0 ? filteredUsers : users} // Use filtered users if search query is provided
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  clearButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  clearButtonText: {
    color: "blue",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 16,
    color: "#666666",
  },
  messageTime: {
    fontSize: 14,
    color: "#999999",
  },
});

export default ChatScreen;
