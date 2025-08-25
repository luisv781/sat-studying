import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Chip, useTheme } from 'react-native-paper';

function Search() {
    const theme = useTheme();

    return (
        <ScrollView
            style={{
                backgroundColor: theme.colors.background,
            }}
            className='flex-1 gap-8'
        >
            <Text
                className='pt-24 text-7xl font-bold text-white text-center leading-[70px]'
            >
                Search Questions
            </Text>
            <View className='items-start p-4'>
                <Text className='text-3xl text-white'>Question Domains</Text>
                <View className='flex-row flex-wrap gap-2 mt-4'>
                    <Chip showSelectedOverlay={true} onPress={() => {}}>Information and Ideas</Chip>
                    <Chip mode='outlined' onPress={() => {}}>Craft and Structure</Chip>
                    <Chip onPress={() => {}}>Expression of Ideas</Chip>
                    <Chip onPress={() => {}}>Standard English Conventions</Chip>
                    <Chip onPress={() => {}}>Algebra</Chip>
                    <Chip onPress={() => {}}>Advanced Math</Chip>
                    <Chip onPress={() => {}}>Problem-Solving and Data Analysis</Chip>
                    <Chip onPress={() => {}}>Geometry and Trigonometry</Chip>
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
            <Button mode='contained' icon={'magnify'} className='mx-16 my-4' onPress={() => {}}>Search</Button>
        </ScrollView>
    );
}

export default Search;
