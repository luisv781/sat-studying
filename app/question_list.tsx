import BackButton from '@/components/BackButton';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const QuestionList = () => {
    const theme = useTheme();

    return (
        <View
            style={{ backgroundColor: theme.colors.background }}
            className='flex-1 items-center gap-8'
        >
            <Text>QuestionList</Text>
            <ScrollView></ScrollView>
            <BackButton />
        </View>
    );
};

export default QuestionList;
