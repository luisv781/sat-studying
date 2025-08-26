import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const Index = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <View
            style={{ backgroundColor: theme.colors.background }}
            className='flex-1 justify-center items-center gap-8'
        >
            <Text className='p-2 text-8xl font-extrabold text-white text-center leading-[70px]'>
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
};

export default Index;
