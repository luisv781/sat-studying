import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={ DarkTheme }>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
