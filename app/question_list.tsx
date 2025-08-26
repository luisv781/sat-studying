import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const QuestionList = () => {
    const theme = useTheme();

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
            <Text>QuestionList</Text>
        </View>
    );
};

export default QuestionList;
