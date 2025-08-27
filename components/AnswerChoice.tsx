import { Pressable, Text } from 'react-native';
import parse from 'html-react-parser';

type AnswerChoiceData = {
    item: answerOption;
    onPress: () => void;
    correct: boolean;
    active: boolean;
};

const AnswerChoice = ({ item, onPress, correct, active }: AnswerChoiceData) => {
    let choiceText = parse(item.content)

    return (
        <Pressable
            onPress={onPress}
            className={`w-full min-h-16 my-4 border-2 rounded-md ${
                active
                    ? correct
                        ? 'bg-lime-700 border-lime-400'
                        : 'bg-red-800 border-red-400'
                    : 'bg-slate-700 border-slate-400'
            }`}
        >
            <Text className='text-lg text-center text-white my-auto p-4'>{choiceText}</Text>
        </Pressable>
    );
};

export default AnswerChoice;
