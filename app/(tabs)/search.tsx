import Chip from '@/components/Chip';
import { RelativePathString, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

type DomainInfo = {
    id: QuestionDomain;
    name: string;
};

const QuestionDomains: DomainInfo[] = [
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
    const router = useRouter();
    const theme = useTheme();

    const [chosenDomains, setDomains] = useState<QuestionDomain[]>([]);
    const [easy, setEasy] = useState(false);
    const [medium, setMedium] = useState(false);
    const [hard, setHard] = useState(false);

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
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    directionalLockEnabled={true}
                    className='mt-4'
                >
                    <FlatList
                        data={QuestionDomains}
                        numColumns={Math.ceil(QuestionDomains.length / 2)}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }: { item: DomainInfo }) => {
                            return (
                                <Chip
                                    text={item.name}
                                    callback={() => {
                                        let domains = chosenDomains;
                                        const domainIndex = domains.indexOf(
                                            item.id
                                        );
                                        if (domainIndex > -1)
                                            domains.splice(domainIndex);
                                        else domains.push(item.id);
                                        setDomains(domains);
                                    }}
                                />
                            );
                        }}
                    />
                </ScrollView>
            </View>
            <View className='items-start p-4'>
                <Text className='text-3xl text-white'>Difficulty</Text>
                <View className='flex-row flex-wrap mt-4'>
                    <Chip text='Easy' ref={setEasy} />
                    <Chip text='Medium' ref={setMedium} />
                    <Chip text='Hard' ref={setHard} />
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
                disabled={!easy && !medium && !hard}
                onPress={() => {
                    let domainParams = chosenDomains.join(',');
                    let query =
                        `/question_search/${domainParams || 'INI,CAS,EOI,SEC,H,P,Q,S'}?` +
                        (easy ? 'easy=true&' : '') +
                        (medium ? 'medium=true&' : '') +
                        (hard ? 'hard=true' : '');
                    router.push(query as RelativePathString);
                }}
            >
                Search
            </Button>
        </ScrollView>
    );
}

export default Search;
