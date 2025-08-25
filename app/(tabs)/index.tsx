import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const Index = () => {
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
                className='p-2 text-8xl font-extrabold text-white text-center leading-[70px]'
            >
                SAT Study App
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

export default Index;
