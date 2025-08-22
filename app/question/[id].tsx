import useFetch from '@/hooks/useFetch';
import { getQuestion } from '@/services/api';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, View, Text } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const Question = () => {
    const theme = useTheme();
    const { id } = useLocalSearchParams();

    const {
        data: questionData,
        loading: questionLoading,
        error: fetchError,
    } = useFetch<QuestionData>(() => getQuestion(id as string));

    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
            }}
            className='flex-1 justify-center items-center gap-6'
        >
            <Text className='pt-12 text-4xl font-medium text-white'>Random Question</Text>

            {fetchError ? (
                <Text className='text-red-500'>{fetchError.message}</Text>
            ) : questionLoading ? (
                <ActivityIndicator size={72} className='p-16' />
            ) : (
                <ScrollView className='w-full px-48'>
                    <View className='flex flex-col py-8 gap-4'>
                        <Text className='text-2xl text-white'>Question:</Text>

                        {Platform.OS === 'web' ? (
                            <iframe
                                className='bg-white rounded-lg h-24'
                                srcDoc={questionData?.stem}
                            ></iframe>
                        ) : (
                            <WebView
                                originWhitelist={['*']}
                                source={{
                                    html: questionData?.stem
                                        ? questionData?.stem
                                        : '',
                                }}
                            />
                        )}
                    </View>

                    <View className='flex flex-col py-8 gap-4'>
                        <Text className='text-2xl text-white'>
                            Correct Answer: {questionData?.correct_answer}
                        </Text>
                        <Text className='text-2xl text-white'>Rationale:</Text>

                        {Platform.OS === 'web' ? (
                            <iframe
                                className='bg-white rounded-lg h-72'
                                srcDoc={questionData?.rationale}
                            ></iframe>
                        ) : (
                            <WebView
                                originWhitelist={['*']}
                                source={{
                                    html: questionData?.rationale
                                        ? questionData?.rationale
                                        : '',
                                }}
                            />
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default Question;
