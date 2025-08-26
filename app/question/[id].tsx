import useFetch from '@/hooks/useFetch';
import { getQuestion } from '@/services/api';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

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
    const questionStimulus = questionData?.stimulus
        ? questionData?.stimulus
        : '';

    const htmlStyle = `
        <style>
            body {
                margin: 0;
                padding: 0.8em;
                font-family: Arial, sans-serif;
                font-size: ${Platform.OS === 'web' ? '1em' : '3em'};
                color: #000;
            }
        </style>`;
    const heightSetter = `
        function updateHeight() {
            const height = document.body.scrollHeight;
            window.ReactNativeWebView.postMessage(String(height / 3));
        }
        window.addEventListener("load", updateHeight);
        setTimeout(updateHeight, 300);`;

    const checkHeight = (
        event: WebViewMessageEvent,
        setHeight: (newHeight: number) => void
    ) => {
        const newHeight = Number(event.nativeEvent.data);
        if (!isNaN(newHeight) && newHeight !== questionViewHeight) {
            setHeight(newHeight);
        }
    };

    const stimulusHtml = `<html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        ${htmlStyle}
        </head>
        <body>
        ${questionStimulus}
      </body>
    </html>`;
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

    const [stimulusViewHeight, setStimulusViewHeight] = useState(360);
    const [questionViewHeight, setQuestionViewHeight] = useState(120);
    const [rationaleViewHeight, setRationaleViewHeight] = useState(360);

    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
            }}
            className='flex-1 justify-center items-center gap-6'
        >
            {fetchError ? (
                <Text className='text-red-500'>{fetchError.message}</Text>
            ) : questionLoading ? (
                <ActivityIndicator size={72} className='m-8' />
            ) : (
                <ScrollView
                    className={`w-full ${
                        Platform.OS === 'web' ? 'px-48' : 'px-12'
                    }`}
                >
                    <Text className='py-12 text-4xl text-center font-medium text-white'>
                        Random Question
                    </Text>
                    {questionData?.stimulus && (
                        <View className='flex flex-col py-6 gap-4'>
                            {Platform.OS === 'web' ? (
                                <iframe
                                    className='bg-white rounded-lg h-72'
                                    srcDoc={stimulusHtml}
                                ></iframe>
                            ) : (
                                <View
                                    className='bg-white rounded-xl w-full'
                                    style={{ height: stimulusViewHeight }}
                                >
                                    <WebView
                                        originWhitelist={['*']}
                                        source={{
                                            html: stimulusHtml,
                                        }}
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'transparent',
                                        }}
                                        scrollEnabled={false}
                                        onMessage={(event) =>
                                            checkHeight(
                                                event,
                                                setStimulusViewHeight
                                            )
                                        }
                                        injectedJavaScript={heightSetter}
                                    />
                                </View>
                            )}
                        </View>
                    )}
                    <View className='flex flex-col py-6 gap-4'>
                        <Text className='text-2xl text-white'>Question:</Text>

                        {Platform.OS === 'web' ? (
                            <iframe
                                className='bg-white rounded-lg h-fit'
                                srcDoc={questionStem}
                            ></iframe>
                        ) : (
                            <View
                                className='bg-white rounded-xl w-full'
                                style={{ height: questionViewHeight }}
                            >
                                <WebView
                                    originWhitelist={['*']}
                                    source={{
                                        html: questionHtml,
                                    }}
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                    }}
                                    scrollEnabled={false}
                                    onMessage={(event) =>
                                        checkHeight(
                                            event,
                                            setQuestionViewHeight
                                        )
                                    }
                                    injectedJavaScript={heightSetter}
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
                                srcDoc={rationaleHtml}
                            ></iframe>
                        ) : (
                            <View
                                className='bg-white rounded-xl w-full h-72'
                                style={{ height: rationaleViewHeight }}
                            >
                                <WebView
                                    originWhitelist={['*']}
                                    source={{
                                        html: rationaleHtml,
                                    }}
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                    }}
                                    scrollEnabled={false}
                                    onMessage={(event) =>
                                        checkHeight(
                                            event,
                                            setRationaleViewHeight
                                        )
                                    }
                                    injectedJavaScript={heightSetter}
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
