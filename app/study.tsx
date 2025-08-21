import { getQuestion, getQuestions } from '@/services/api';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

const Study = () => {
    const theme = useTheme();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.background,
            }}
        >
            <Text
                variant='titleLarge'
                style={{ fontSize: 72, fontWeight: 600 }}
            >
                Study
            </Text>
            <Button
                mode='contained'
                icon={'book'}
                onPress={() =>
                    getQuestions()
                        .then((questions) => {
                            if (questions.length > 0) {
                                const randomQuestion =
                                    questions[
                                        Math.floor(
                                            Math.random() * questions.length
                                        )
                                    ];
                                console.log('Random Question:', randomQuestion);
                                return randomQuestion.external_id;
                            } else {
                                console.warn('No questions available');
                            }
                        })
                        .then((questionId) => {
                            return getQuestion(questionId);
                        })
                        .then((question) => console.log(question))
                }
            >
                Get Random Question
            </Button>
        </View>
    );
};

export default Study;
