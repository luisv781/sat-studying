import Chip from '@/components/Chip';
import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

type QuestionDomain = {
    id: string;
    name: string;
};

const QuestionDomains: QuestionDomain[] = [
    {
        id: 'INI',
        name: 'Information and Ideas',
    },
    {
        id: 'CAS',
        name: 'Craft and Structure',
    },
    {
        id: 'EOI',
        name: 'Expression of Ideas',
    },
    {
        id: 'SEC',
        name: 'Standard English Conventions',
    },
    {
        id: 'H',
        name: 'Algebra',
    },
    {
        id: 'P',
        name: 'Advanced Math',
    },
    {
        id: 'Q',
        name: 'Problem Solving and Data Analysis',
    },
    {
        id: 'S',
        name: 'Geometry and Trigonometry',
    },
];

function Search() {
    const theme = useTheme();

    return (
        <ScrollView
            style={{
                backgroundColor: theme.colors.background,
            }}
            className='flex-1 gap-8'
        >
            <Text className='mt-8 text-7xl font-bold text-white text-center leading-[70px]'>
                Search Questions
            </Text>
            <View className='items-start p-4'>
                <Text className='text-3xl text-white'>Question Domains</Text>
                <View className='flex-row flex-wrap gap-2 mt-4'>
                    <FlatList
                        data={QuestionDomains}
                        horizontal={true}
                        renderItem={({ item }: { item: QuestionDomain }) => {
                            return <Chip text={item.name} />;
                        }}
                    />
                </View>
            </View>
            <View className='items-start p-4'>
                <Text className='text-3xl text-white'>Difficulty</Text>
                <View className='flex-row flex-wrap gap-2 mt-4'>
                    <Chip text='Easy' />
                    <Chip text='Medium' />
                    <Chip text='Hard' />
                </View>
            </View>
            <Button
                mode='contained'
                icon={'magnify'}
                style={{
                    width: '50%',
                    marginHorizontal: 'auto',
                    marginVertical: 16,
                }}
                onPress={() => {}}
            >
                Search
            </Button>
        </ScrollView>
    );
}

export default Search;
