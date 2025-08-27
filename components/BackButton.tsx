import { View } from 'react-native';
import React from 'react';
import { FAB, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const BackButton = () => {
    const router = useRouter();
    const theme = useTheme();

    return (
        <View className='absolute bottom-0 right-0 m-4 z-10'>
            <FAB
                icon={'close'}
                style={{ backgroundColor: theme.colors.primaryContainer }}
                onPress={() => router.back()}
            />
        </View>
    );
};

export default BackButton;
