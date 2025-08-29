import BackButton from '@/components/BackButton';
import useFetch from '@/hooks/useFetch';
import { getQuestions } from '@/services/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Divider, useTheme } from 'react-native-paper';

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
                <View className='w-full h-full'>
                    <FlatList
                        data={questionData}
                        ListHeaderComponent={() => (
                            <View>
                                <Text className='m-8 text-5xl text-center font-bold text-white'>
                                    Question Search
                                </Text>
                                <View className='flex-row justify-between px-6 py-2'>
                                    <Text className='text-2xl font-medium text-white'>
                                        ID
                                    </Text>
                                    <Text className='text-2xl font-medium text-white'>
                                        Skill
                                    </Text>
                                    <Text className='text-2xl font-medium text-white'>
                                        Domain
                                    </Text>
                                    <Text className='text-2xl font-medium text-white'>
                                        Difficulty
                                    </Text>
                                </View>
                                <Divider />
                            </View>
                        )}
                        ItemSeparatorComponent={() => (
                            <Divider horizontalInset />
                        )}
                        renderItem={({
                            item,
                        }: {
                            item: QuestionDescription;
                        }) => {
                            return (
                                <TouchableOpacity
                                    className='flex-row justify-between p-6'
                                    onPress={() =>
                                        router.push(
                                            `/question/${item.external_id}`
                                        )
                                    }
                                >
                                    <Text className='text-xl text-white'>
                                        {item.questionId}
                                    </Text>
                                    <Text className='text-xl text-white'>
                                        {item.skill_desc}
                                    </Text>
                                    <Text className='text-xl text-white'>
                                        {item.primary_class_cd_desc}
                                    </Text>
                                    <Text className='text-xl text-white'>
                                        Difficulty: {item.score_band_range_cd}/7
                                    </Text>
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
