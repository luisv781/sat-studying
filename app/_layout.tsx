import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import './globals.css';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="study" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
