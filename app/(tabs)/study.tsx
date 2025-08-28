import { getQuestions } from '@/services/api';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';

const Study = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <View
            style={{ backgroundColor: theme.colors.background }}
            className='flex-1 justify-start items-stretch gap-4'
        >
            <Text className='mt-8 m-2 text-7xl text-center font-semibold text-white'>
                Study
            </Text>
            <Card style={{ margin: 32, marginHorizontal: 64, padding: 24 }}>
                <Text className='text-4xl font-medium text-white'>
                    Random Question
                </Text>
                <Text className='my-4 text-xl font-normal text-white'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae, dolor aperiam saepe vitae quod maxime voluptatum
                    quaerat laborum nemo sapiente earum, quas consequatur
                    distinctio at minima vel, unde vero soluta? Ducimus rem
                    doloremque, magni deserunt eveniet veniam dolorum illum
                    nesciunt molestiae, corrupti voluptas sit architecto, vel ea
                    incidunt! Sint, enim!
                </Text>
                <Card.Actions>
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
                                                    Math.random() *
                                                        questions.length
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
                </Card.Actions>
            </Card>
        </View>
    );
};

export default Study;
