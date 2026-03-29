import api from "./api";

export const saveWorkout = async (workoutData) => {
  const response = await api.post("/workouts", workoutData);
  return response.data;
};
