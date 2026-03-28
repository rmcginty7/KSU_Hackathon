import { Text, View, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, [])
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
