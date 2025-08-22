import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import './globals.css';

export default function RootLayout() {
    useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    return (
        <PaperProvider>
            <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='study' options={{ headerShown: false }} />
                <Stack.Screen
                    name='question/[id]'
                    options={{ headerShown: false }}
                />
            </Stack>
        </PaperProvider>
    );
}
