import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>You are now logged in.</Text>

      <Pressable style={styles.backButton} onPress={() => router.push("/workouts/new")}>
        <Text style={styles.backButtonText}>Start a new Workout</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.push("/saved-workouts")}>
        <Text style={styles.backButtonText}>View Saved Workouts</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.push("/auth/login")}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f7f8fc",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 12,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
