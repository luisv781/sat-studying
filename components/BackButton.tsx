import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

const BackButton = () => {
    const router = useRouter();
    const theme = useTheme();

    return (
        <View className='absolute bottom-4 right-0 m-4 z-10'>
            <FAB
                icon={'close'}
                style={{ backgroundColor: theme.colors.primaryContainer }}
                onPress={() => router.back()}
            />
        </View>
    );
};

export default BackButton;
