import { Pressable, Text, View } from 'react-native';

type AnswerChoiceData = {
    item: answerOption;
    onPress: () => void;
    correct: boolean;
    active: boolean;
};

const AnswerChoice = ({ item, onPress, correct, active }: AnswerChoiceData) => {
    return (
        <Pressable
            onPress={onPress}
            className={`w-full h-16 mx-16 my-4 ${
                active
                    ? correct
                        ? 'bg-lime-600'
                        : 'bg-red-600'
                    : 'bg-slate-700'
            } border-slate-400 border-2 rounded-md`}
        >
            <Text className='text-center text-white'>{item.content}</Text>
        </Pressable>
    );
};

export default AnswerChoice;
