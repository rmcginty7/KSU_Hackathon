import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { saveWorkout as saveWorkoutToBackend } from "../services/workoutService";

export default function NewWorkoutScreen() {
  const [workoutName, setWorkoutName] = useState("");
  const [newExerciseName, setNewExerciseName] = useState("");
  const [exercises, setExercises] = useState([]);

  const resetForm = () => {
    setWorkoutName("");
    setNewExerciseName("");
    setExercises([]);
  };

  const showSuccess = () => {
    const message = "Your workout was saved to the database.";
    if (Platform.OS === "web") {
      window.alert(`Workout saved 🎉\n\n${message}`);
      resetForm();
    } else {
      Alert.alert(
        "Workout saved 🎉",
        message,
        [
          { text: "Close" },
          { text: "Add another", onPress: resetForm },
        ],
        { cancelable: true },
      );
    }
  };

  const showError = (message) => {
    if (Platform.OS === "web") {
      window.alert(`Error: ${message}`);
    } else {
      Alert.alert("Error", message);
    }
  };

  const addExercise = () => {
    if (!newExerciseName.trim()) return;

    const newExercise = {
      id: Date.now().toString(),
      name: newExerciseName.trim(),
      sets: [{ id: Date.now().toString() + "-set", reps: "", weight: "" }],
    };

    setExercises((prev) => [...prev, newExercise]);
    setNewExerciseName("");
  };

  const addSet = (exerciseId) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: [
                ...exercise.sets,
                {
                  id: Date.now().toString() + Math.random(),
                  reps: "",
                  weight: "",
                },
              ],
            }
          : exercise,
      ),
    );
  };

  const updateSetField = (exerciseId, setId, field, value) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId ? { ...set, [field]: value } : set,
              ),
            }
          : exercise,
      ),
    );
  };

  const removeExercise = (exerciseId) => {
    setExercises((prev) =>
      prev.filter((exercise) => exercise.id !== exerciseId),
    );
  };

  const saveWorkout = async () => {
    try {
      // Normalize exercises: drop empty sets, coerce numbers
      const cleanedExercises = exercises
        .map((ex) => ({
          name: ex.name,
          sets: ex.sets
            .map((s) => ({
              reps: Number(s.reps),
              weight: Number(s.weight),
            }))
            .filter((s) => !Number.isNaN(s.reps) && !Number.isNaN(s.weight)),
        }))
        .filter((ex) => ex.name && ex.sets.length > 0);

      const workoutPayload = {
        // userId: user?._id,
        name: workoutName || "Untitled Workout",
        duration: 45,
        exercises: cleanedExercises,
        createdAt: new Date().toISOString(),
      };

      console.log("Workout to save:", workoutPayload);
      const savedWorkout = await saveWorkoutToBackend(workoutPayload);

      console.log("Saved workout response:", savedWorkout);
      showSuccess();
    } catch (error) {
      console.error("Error saving workout:", error);
      showError(error?.response?.data?.message || "Failed to save workout.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Workout</Text>

      <TextInput
        style={styles.input}
        placeholder="Workout name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      <View style={styles.addExerciseRow}>
        <TextInput
          style={[styles.input, styles.exerciseInput]}
          placeholder="Add exercise"
          value={newExerciseName}
          onChangeText={setNewExerciseName}
        />
        <TouchableOpacity style={styles.addButton} onPress={addExercise}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {exercises.map((exercise) => (
        <View key={exercise.id} style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>

          {exercise.sets.map((set, index) => (
            <View key={set.id} style={styles.setRow}>
              <Text style={styles.setLabel}>Set {index + 1}</Text>

              <TextInput
                style={styles.setInput}
                placeholder="Reps"
                keyboardType="numeric"
                value={set.reps}
                onChangeText={(value) =>
                  updateSetField(exercise.id, set.id, "reps", value)
                }
              />

              <TextInput
                style={styles.setInput}
                placeholder="Weight"
                keyboardType="numeric"
                value={set.weight}
                onChangeText={(value) =>
                  updateSetField(exercise.id, set.id, "weight", value)
                }
              />
            </View>
          ))}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => addSet(exercise.id)}
          >
            <Text style={styles.secondaryButtonText}>+ Add Set</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
        <Text style={styles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  addExerciseRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseInput: {
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  exerciseCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
  },
  removeText: {
    color: "red",
    fontWeight: "600",
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  setLabel: {
    width: 50,
    fontWeight: "500",
  },
  setInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
  secondaryButton: {
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontWeight: "700",
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
