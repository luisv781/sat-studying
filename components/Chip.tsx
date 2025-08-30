import React, { Dispatch, SetStateAction, useState } from 'react';
import { View } from 'react-native';
import { Chip as PaperChip } from 'react-native-paper';

const Chip = ({
    text,
    callback,
    ref,
}: {
    text: string;
    callback?: () => void;
    ref?: Dispatch<SetStateAction<boolean>>;
}) => {
    const [selected, setSelected] = useState(false);

    return (
        <View className='p-1'>
            <PaperChip
                selected={selected}
                showSelectedCheck={true}
                mode={selected ? 'flat' : 'outlined'}
                onPress={() => {
                    if (callback) callback();
                    if (ref) ref(!selected);
                    setSelected(!selected);
                }}
            >
                {text}
            </PaperChip>
        </View>
    );
};

export default Chip;
