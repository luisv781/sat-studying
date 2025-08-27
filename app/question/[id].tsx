import AnswerChoice from '@/components/AnswerChoice';
import BackButton from '@/components/BackButton';
import useFetch from '@/hooks/useFetch';
import { getQuestion } from '@/services/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Platform, ScrollView, Text, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

const Question = () => {
    const { id } = useLocalSearchParams();
    const theme = useTheme();

    // Fetch Question Data
    const {
        data: questionData,
        loading: questionLoading,
        error: fetchError,
    } = useFetch<QuestionData>(() => getQuestion(id as string));

    // Getting the html content for question/rationale/stimulus (if any)
    const questionStimulus = questionData?.stimulus
        ? questionData?.stimulus
        : '';
    const questionStem = questionData?.stem
        ? questionData?.stem
        : '<p>Error loading question stem.</p>';
    const questionRationale = questionData?.rationale
        ? questionData?.rationale
        : '<p>Error loading answer rationale.</p>';

    // CSS that will be injected in webviews/iframes
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
    // JS that will send the webview height in order to update it on the RN side
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
    const [questionViewHeight, setQuestionViewHeight] = useState(100);
    const [rationaleViewHeight, setRationaleViewHeight] = useState(360);

    const [answerSelected, setAnswerSelected] = useState(false);

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
                    <Text className='py-12 text-4xl text-center font-semibold text-white'>
                        Random Question
                    </Text>

                    {questionData?.stimulus && (
                        <View className='flex flex-col py-6 gap-4'>
                            {Platform.OS === 'web' ? (
                                <iframe
                                    className='bg-white rounded-lg h-48'
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
                                className='bg-white rounded-lg h-32'
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

                    {questionData?.answerOptions && questionData.keys && (
                        <View className='flex flex-col py-6 gap-4'>
                            <FlatList
                                data={questionData.answerOptions}
                                keyExtractor={(item) => item.id}
                                renderItem={({
                                    item,
                                }: {
                                    item: answerOption;
                                }) => {
                                    return (
                                        <AnswerChoice
                                            item={item}
                                            onPress={() => {
                                                setAnswerSelected(true);
                                            }}
                                            correct={
                                                questionData?.keys
                                                    ? item.id ===
                                                      questionData.keys[0]
                                                    : false
                                            }
                                            active={answerSelected}
                                        />
                                    );
                                }}
                                extraData={answerSelected}
                            />
                        </View>
                    )}

                    <View
                        className={`${
                            answerSelected ? 'flex' : 'hidden'
                        } flex-col py-6 gap-4`}
                    >
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
            <BackButton />
        </View>
    );
};

export default Question;
