import BackButton from '@/components/BackButton';
import useFetch from '@/hooks/useFetch';
import { getQuestions } from '@/services/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const QuestionSearch = () => {
    const { domain } = useLocalSearchParams();
    const router = useRouter();
    const theme = useTheme();

    const {
        data: questionData,
        loading: questionLoading,
        error: fetchError,
    } = useFetch<QuestionList>(() => getQuestions(domain as string));

    return (
        <View
            style={{ backgroundColor: theme.colors.background }}
            className='flex-1 items-center gap-8'
        >
            {fetchError ? (
                <Text className='text-red-500'>{fetchError.message}</Text>
            ) : questionLoading ? (
                <ActivityIndicator size={72} style={{ margin: 32 }} />
            ) : (
                <View className='w-full'>
                    <Text className='m-8 text-5xl text-center font-bold text-white'>Question Search</Text>
                    <FlatList
                        data={questionData}
                        scrollEnabled
                        renderItem={({
                            item,
                        }: {
                            item: QuestionDescription;
                        }) => {
                            return (
                                <TouchableOpacity className='flex-row justify-between p-4' onPress={() => router.push(`/question/${item.external_id}`)}>
                                    <Text className='text-xl text-white'>{item.questionId}</Text>
                                    <Text className='text-xl text-white'>{item.skill_desc}</Text>
                                    <Text className='text-xl text-white'>{item.primary_class_cd_desc}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            )}
            <BackButton />
        </View>
    );
};

export default QuestionSearch;
