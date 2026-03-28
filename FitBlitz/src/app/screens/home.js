import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import NavBar from '../../components/NavBar';

export default function HomeScreen() {
  const [streak, setStreak] = useState(5); // Mock data: 5-day streak
  const [weight, setWeight] = useState('');
  const [lastWeight, setLastWeight] = useState(185); // Mock previous weight

const getGreeting = () => {
  const hour = new Date().getHours();
  if(hour < 12) return "Good morning!";
  if(hour < 18) return "Good afternoon!";
    return "Good evening!";
};

const handleWeightSubmit = () => {
    if (weight) {
      setLastWeight(parseFloat(weight));
      setWeight('');
      alert(`Weight updated to ${weight} lbs!`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{getGreeting()}</Text>
        <Text style={styles.subtitle}>Welcome, (username).</Text>
      </View>

    <View style={styles.streakCard}>
      <Text style={styles.streakEmoji}>🔥</Text>
      <Text style={styles.streakText}>{streak} Day Streak!</Text>
    </View>

    <View style={styles.checkInBox}>
      <Text style={styles.sectionTitle}>Daily Weigh-in</Text>
      <Text style={styles.label}>Last recorded {lastWeight} lbs</Text>
    

    <View style={styles.inputRow}>
      <TextInput style={styles.input} placeholder="Enter current weight" keyboardType="numeric" value={weight} onChangeText={setWeight}></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleWeightSubmit}>
        <Text style={styles.buttonText}>Log</Text>
      </TouchableOpacity>
    </View>
    </View>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginBottom: 30,
  },
  streakEmoji: { fontSize: 24, marginRight: 10 },
  streakText: { fontSize: 18, fontWeight: '600', color: '#ff4500' },
  checkInBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  label: { fontSize: 14, color: '#666', marginBottom: 15 },
  inputRow: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  subtitle: { marginTop: 40, fontSize: 14, color: '#aaa' }
});