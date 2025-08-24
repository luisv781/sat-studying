import useFetch from '@/hooks/useFetch';
import { getQuestion } from '@/services/api';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const Question = () => {
    const theme = useTheme();
    const { id } = useLocalSearchParams();

    // Fetch Question Data
    const {
        data: questionData,
        loading: questionLoading,
        error: fetchError,
    } = useFetch<QuestionData>(() => getQuestion(id as string));

    // Getting the html content for question/rationale
    const questionStem = questionData?.stem
        ? questionData?.stem
        : '<p>Error loading question stem.</p>';
    const questionRationale = questionData?.rationale
        ? questionData?.rationale
        : '<p>Error loading answer rationale.</p>';

    const htmlStyle = `<style>
            body {
                font-family: Arial, sans-serif;
                font-size: 3em;
                color: #000;
                padding: 20px;
            }
        </style>`;
    const html = `
    <html>

    const questionHtml = `<html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        ${htmlStyle}
      </head>
      <body>
        ${questionStem}
      </body>
    </html>`;
    const rationaleHtml = `<html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        ${htmlStyle}
        </head>
        <body>
        ${questionRationale}
      </body>
    </html>`;


    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
            }}
            className='flex-1 justify-center items-center gap-6'
        >
            <Text className='pt-24 text-4xl font-medium text-white'>
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
                    <View className='flex flex-col py-6 gap-4'>
                        <Text className='text-2xl text-white'>Question:</Text>

                        {Platform.OS === 'web' ? (
                            <iframe
                                className='bg-white rounded-lg h-fit'
                                srcDoc={questionStem}
                            ></iframe>
                        ) : (
                            <View className='bg-white rounded-xl w-full' style={{ height: questionViewHeight || 20 }}>
                            <WebView
                                originWhitelist={['*']}
                                source={{
                                        html: questionHtml,
                                }}
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                />
                            </View>
                        )}
                    </View>

                    <View className='flex flex-col py-6 gap-4'>
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
                            <View className='bg-white rounded-xl w-full h-72'>
                            <WebView
                                originWhitelist={['*']}
                                source={{
                                        html: rationaleHtml,
                                    }}
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                }}
                            />
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default Question;
