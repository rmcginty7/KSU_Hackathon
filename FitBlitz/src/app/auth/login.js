import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to FitBlitz</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => router.push("/auth/register")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              style={styles.input}
            />
            <Pressable
              style={styles.button}
              onPress={() => router.replace("/screens/home")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 25,
    marginBottom: 16,
    justifyContent: "flex-start",
  },

  content: {
    flex: 1,
    marginTop: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#0a84ff",
    width: "60%",
    maxWidth: 280,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
  },
  input: {
    width: "60%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
