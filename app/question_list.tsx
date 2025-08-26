import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const QuestionList = () => {
    const theme = useTheme();

    return (
        <View
            style={{ backgroundColor: theme.colors.background }}
            className='flex-1 justify-center items-center gap-8'
        >
            <Text>QuestionList</Text>
        </View>
    );
};

export default QuestionList;
