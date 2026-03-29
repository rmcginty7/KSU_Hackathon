import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:3001';

export default function Login() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async () => {
    setSubmitted(true);
    if (!email && !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email){
      setError("Please enter your email.");
      return;
    }

    if (!password){
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred');
        return;
      }

      console.log('Logged in as:', data.name, '| ID:', data.userId);
      setModalVisible(false);
      router.replace('/screens/home');
    } catch (err) {
      setError('Could not connect to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to FitBlitz</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              style={styles.input}
            />

            {submitted && error ? <Text style={styles.errorText}>{error}</Text> : null}

            {loading ? (
              <ActivityIndicator size="large" color="#0a84ff" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => { setModalVisible(false); setSubmitted(false); setError(''); }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 25,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#0a84ff',
    width: '60%',
    maxWidth: 280,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  cancelText: {
    marginTop: 12,
    color: '#888',
    fontSize: 14,
  },

  errorText:{
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
    textAlign: 'center',
  },

});