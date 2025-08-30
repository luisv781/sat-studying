import { View } from 'react-native';
import React, { useState } from 'react';
import { Chip as PaperChip } from 'react-native-paper';

const Chip = ({ text, callback }: { text: string; callback?: () => void }) => {
    const [selected, setSelected] = useState(false);

    return (
        <View className='p-1'>
            <PaperChip
                selected={selected}
                showSelectedCheck={true}
                mode={selected ? 'flat' : 'outlined'}
                onPress={() => {
                    setSelected(!selected);
                    if (callback) callback();
                }}
            >
                {text}
            </PaperChip>
        </View>
    );
};

export default Chip;
