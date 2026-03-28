import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack 
    initialRouteName="auth/login" screenOptions={{ headerShown: false }}>

    <Stack.Screen name="index" />
    <Stack.Screen name="auth/login" />
    <Stack.Screen name="auth/register" />
    <Stack.Screen name="screens/home"/>

  </Stack>;
}
