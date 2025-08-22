import useFetch from '@/hooks/useFetch';
import { getQuestion } from '@/services/api';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
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
            <Text className='text-4xl'>Question:</Text>

            {fetchError ? (
                <Text>error</Text>
            ) : questionLoading ? (
                <ActivityIndicator size={'large'} />
            ) : (
                <ScrollView>
                    <Text className='text-xl'>
                        Question Title:
                    </Text>
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: questionData?.stem ? questionData?.stem : '' }}
                    />
                    <Text className='text-xl'>
                        Correct Answer: {questionData?.correct_answer}
                    </Text>
                    <Text className='text-xl'>Rationale:</Text>
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: questionData?.rationale ? questionData?.rationale : '' }}
                    />
                </ScrollView>
            )}
        </View>
    );
};

export default Question;
