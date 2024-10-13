import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import socket from "../services/socket";
const ChatScreen = () => {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessage((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  const sendMessage = () => {
    if (input.trim()) {
      const message = { sender: "User", content: input };
      socket.emit("sendMessage", message);
      setInput("");
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={message}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>
            {`${item.sender}: ${item.content}`}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message here..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    marginVertical: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ChatScreen;