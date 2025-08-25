import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Chip, useTheme } from 'react-native-paper';

enum QuestionDomain {
    InformationAndIdeas = 'INI',
    CraftAndStructure = 'CAS',
    ExpressionOfIdeas = 'EOI',
    StandardEnglishConventions = 'SEC',
    Algebra = 'H',
    AdvancedMath = 'P',
    ProblemSolvingAndDataAnalysis = 'Q',
    GeometryAndTrigonometry = 'S',
}

const Domains = [
    'InformationAndIdeas',
    'CraftAndStructure',
    'ExpressionOfIdeas',
    'StandardEnglishConventions',
    'Algebra',
    'AdvancedMath',
    'ProblemSolvingAndDataAnalysis',
    'GeometryAndTrigonometry',
]

function Search() {
    const theme = useTheme();

    let questionDomains: string[] = [];


    return (
        <ScrollView
            style={{
                backgroundColor: theme.colors.background,
            }}
            className='flex-1 gap-8'
        >
            <Text className='pt-24 text-7xl font-bold text-white text-center leading-[70px]'>
                Search Questions
            </Text>
            <View className='items-start p-4'>
                <Text className='text-3xl text-white'>Question Domains</Text>
                <View className='flex-row flex-wrap gap-2 mt-4'>
                    <Chip
                        selected={questionDomains.includes(
                            QuestionDomain.InformationAndIdeas
                        )}
                        showSelectedCheck={true}
                        onPress={() => {
                            console.log('pressed')
                            if (
                                questionDomains.includes(
                                    QuestionDomain.InformationAndIdeas
                                )
                            )
                                {console.log('included')
                                questionDomains.splice(
                                    questionDomains.indexOf(
                                        QuestionDomain.InformationAndIdeas
                                    ),
                                    1
                                );}
                            else
                                {
                                    console.log('not included')
                                    questionDomains.push(
                                    QuestionDomain.InformationAndIdeas
                                );}
                        }}
                    >
                        Information and Ideas
                    </Chip>
                    <Chip
                        mode='outlined'
                        showSelectedCheck={true}
                        onPress={() => {}}
                    >
                        Craft and Structure
                    </Chip>
                    <Chip
                        mode='outlined'
                        showSelectedCheck={true}
                        onPress={() => {}}
                    >
                        Expression of Ideas
                    </Chip>
                    <Chip
                        mode='outlined'
                        showSelectedCheck={true}
                        onPress={() => {}}
                    >
                        Standard English Conventions
                    </Chip>
                    <Chip
                        mode='outlined'
                        showSelectedCheck={true}
                        onPress={() => {}}
                    >
                        Algebra
                    </Chip>
                    <Chip
                        mode='outlined'
                        showSelectedCheck={true}
                        onPress={() => {}}
                    >
                        Advanced Math
                    </Chip>
                    <Chip
                        mode='outlined'
                        showSelectedCheck={true}
                        onPress={() => {}}
                    >
                        Problem-Solving and Data Analysis
                    </Chip>
                    <Chip
                        mode='outlined'
                        showSelectedCheck={true}
                        onPress={() => {}}
                    >
                        Geometry and Trigonometry
                    </Chip>
                </View>
            </View>
            <View className='items-start p-4'>
                <Text className='text-3xl text-white'>Difficulty</Text>
                <View className='flex-row flex-wrap gap-2 mt-4'>
                    <Chip onPress={() => {}}>Easy</Chip>
                    <Chip onPress={() => {}}>Medium</Chip>
                    <Chip onPress={() => {}}>Hard</Chip>
                </View>
            </View>
            <Button
                mode='contained'
                icon={'magnify'}
                className='mx-16 my-4'
                onPress={() => {}}
            >
                Search
            </Button>
        </ScrollView>
    );
}

export default Search;
