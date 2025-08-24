import useFetch from '@/hooks/useFetch';
import { getQuestion } from '@/services/api';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
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

    const questionStem = questionData?.stem
        ? questionData?.stem
        : '<p>Error loading question stem.</p>';
    const questionRationale = questionData?.rationale
        ? questionData?.rationale
        : '<p>Error loading answer rationale.</p>';

    const html = `
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      </head>
      <body>
        ${questionStem}
      </body>
    </html>
  `;
    console.log(html);

    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
            }}
            className='flex-1 justify-center items-center gap-6'
        >
            <Text className='pt-12 text-4xl font-medium text-white'>
                Random Question
            </Text>

            {fetchError ? (
                <Text className='text-red-500'>{fetchError.message}</Text>
            ) : questionLoading ? (
                <ActivityIndicator
                    size={72}
                    className='h-full w-full flex-1 justify-center items-center'
                />
            ) : (
                <ScrollView
                    className={`w-full ${
                        Platform.OS === 'web' ? 'px-48' : 'px-12'
                    }`}
                >
                    <View className='flex flex-col py-8 gap-4'>
                        <Text className='text-2xl text-white'>Question:</Text>

                        {Platform.OS === 'web' ? (
                            <iframe
                                className='bg-white rounded-lg h-fit'
                                srcDoc={questionStem}
                            ></iframe>
                        ) : (
                            <WebView
                                originWhitelist={['*']}
                                source={{
                                    html: html,
                                }}
                                className='h-24 bg-white rounded-lg w-full py-12'
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
                                srcDoc={questionRationale}
                            ></iframe>
                        ) : (
                            <WebView
                                originWhitelist={['*']}
                                source={{
                                    html: questionRationale,
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
