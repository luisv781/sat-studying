import { getQuestions } from '@/services/api';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

const Study = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <View
            style={{ backgroundColor: theme.colors.background }}
            className='flex-1 justify-center items-center gap-8'
        >
            <Text
                variant='titleLarge'
                style={{ fontSize: 72, fontWeight: 600, padding: 16 }}
            >
                Study
            </Text>
            <Button
                mode='contained'
                icon={'book'}
                onPress={() =>
                    getQuestions('INI,CAS,EOI,SEC,H,P,Q,S')
                        .then((questions) => {
                            if (questions.length > 0) {
                                const randomQuestion =
                                    questions[
                                        Math.floor(
                                            Math.random() * questions.length
                                        )
                                    ];
                                return randomQuestion.external_id;
                            } else {
                                console.warn('No questions available');
                            }
                        })
                        .then((questionId) => {
                            if (questionId)
                                router.push(`/question/${questionId}`);
                        })
                }
            >
                Try Random Question
            </Button>
        </View>
    );
};

export default Study;
