import toStyledHtml, { heightSetter } from '@/utils/toStyledHtml';
import parse from 'html-react-parser';
import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

type AnswerChoiceData = {
    item: AnswerOption;
    onPress: () => void;
    correct: boolean;
    active: boolean;
};

const AnswerChoice = ({ item, onPress, correct, active }: AnswerChoiceData) => {
    const checkHeight = (
        event: WebViewMessageEvent,
        setHeight: (newHeight: number) => void
    ) => {
        const newHeight = Number(event.nativeEvent.data);
        if (!isNaN(newHeight) && newHeight !== height) {
            setHeight(newHeight);
        }
    };

    const [height, setHeight] = useState(64);

    return (
        <Pressable
            onPress={onPress}
            className={`w-full min-h-16 my-4 border-2 rounded-xl transition-colors ${
                active
                    ? (correct
                          ? 'bg-lime-700 border-lime-400'
                          : 'bg-red-800 border-red-400') + ' cursor-default'
                    : 'bg-slate-700 border-slate-400 hover:bg-slate-600'
            }`}
        >
            {Platform.OS === 'web' ? (
                <Text className='my-auto p-4 text-lg text-left text-white'>
                    {parse(item.content)}
                </Text>
            ) : (
                <View className='w-full m-auto' style={{ height: height }}>
                    <WebView
                        originWhitelist={['*']}
                        source={{
                            html: toStyledHtml(
                                item.content,
                                item.content.includes('<math'),
                                false
                            ),
                        }}
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                        }}
                        scrollEnabled={false}
                        onMessage={(event) => checkHeight(event, setHeight)}
                        injectedJavaScript={heightSetter}
                    />
                </View>
            )}
        </Pressable>
    );
};

export default AnswerChoice;
