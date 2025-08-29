import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Chip as PaperChip } from 'react-native-paper';

const Chip = ({text}: {text: string}) => {
    const [selected, setSelected] = useState(false);

    return (
        <View>
            <PaperChip
                selected={selected}
                showSelectedCheck={true}
                onPress={() => {
                    setSelected(!selected);
                }}
            >
                {text}
            </PaperChip>
        </View>
    );
};

export default Chip;
