import { getQuestion } from '@/services/api';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface QuestionData {
    stem: string;
    rationale: string;
    correct_answer: string[];
}

const Question = () => {
    const theme = useTheme();
    const { id } = useLocalSearchParams();
    
    let questionData : QuestionData | null;
    getQuestion(id as string).then((data) => {
        questionData = data;
        console.log(data);
    })

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.background,
            }}
        >
            <Text>Question:</Text>
            <Text>{questionData ? questionData.stem : ""}</Text>
        </View>
    );
};

export default Question;
