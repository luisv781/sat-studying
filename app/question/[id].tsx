import AnswerChoice from '@/components/AnswerChoice';
import BackButton from '@/components/BackButton';
import useFetch from '@/hooks/useFetch';
import { getQuestion } from '@/services/api';
import toStyledHtml, { checkHeight, heightSetter } from '@/utils/toStyledHtml';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Platform, ScrollView, Text, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    TextInput,
    useTheme,
} from 'react-native-paper';
import { WebView } from 'react-native-webview';

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

    const stimulusHtml = toStyledHtml(questionStimulus, false);
    const questionHtml = toStyledHtml(questionStem);
    const rationaleHtml = toStyledHtml(questionRationale);

    const [stimulusViewHeight, setStimulusViewHeight] = useState(360);
    const [questionViewHeight, setQuestionViewHeight] = useState(100);
    const [rationaleViewHeight, setRationaleViewHeight] = useState(360);

    // MCQ
    const [answerSelected, setAnswerSelected] = useState(false);
    // FRQ
    const [responseText, setResponseText] = useState('');

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
                    className={`w-full py-6 ${
                        Platform.OS === 'web' ? 'px-48' : 'px-12'
                    }`}
                >
                    <Text className='py-6 text-4xl text-center font-semibold text-white'>
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
                                                setStimulusViewHeight,
                                                stimulusViewHeight
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
                                            setQuestionViewHeight,
                                            questionViewHeight
                                        )
                                    }
                                    injectedJavaScript={heightSetter}
                                />
                            </View>
                        )}
                    </View>

                    {questionData?.keys && (
                        <View className='flex flex-col py-6 gap-4'>
                            {questionData?.type === 'mcq' &&
                            questionData?.answerOptions ? (
                                <FlatList
                                    data={questionData.answerOptions}
                                    keyExtractor={(item) => item.id}
                                    scrollEnabled={false}
                                    renderItem={({
                                        item,
                                    }: {
                                        item: AnswerOption;
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
                            ) : (
                                <>
                                    <TextInput
                                        label={'Response'}
                                        value={responseText}
                                        onChangeText={setResponseText}
                                        disabled={answerSelected}
                                        error={
                                            answerSelected &&
                                            responseText !==
                                                questionData.keys[0]
                                        }
                                        right={
                                            answerSelected &&
                                            responseText ===
                                                questionData.keys[0] ? (
                                                <TextInput.Icon icon='check' />
                                            ) : null
                                        }
                                    />
                                    <Button
                                        mode='contained'
                                        onPress={() => {
                                            setAnswerSelected(true);
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </>
                            )}
                        </View>
                    )}

                    {answerSelected && (
                        <View className={'flex flex-col py-6 gap-4'}>
                            <Text className='text-2xl text-white'>
                                Correct Answer:{' '}
                                <Text className='font-medium'>
                                    {questionData?.correct_answer}
                                </Text>
                            </Text>
                            <Text className='text-2xl text-white'>
                                Rationale:
                            </Text>

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
                                                setRationaleViewHeight,
                                                rationaleViewHeight
                                            )
                                        }
                                        injectedJavaScript={heightSetter}
                                    />
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
            )}
            <BackButton />
        </View>
    );
};

export default Question;
