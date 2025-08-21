import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

export default function Index() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 32,
                backgroundColor: theme.colors.background,
            }}
        >
            <Text
                variant='titleLarge'
                style={{ fontSize: 72, fontWeight: 600 }}
            >
                title.
            </Text>
            <Button
                mode='contained'
                icon={'book'}
                onPress={() => router.push('/study')}
            >
                Study
            </Button>
        </View>
    );
}
