import React, { useState } from 'react';

import { BottomNavigation, useTheme } from 'react-native-paper';
import Index from '.';
import Search from './search';

export default function TabLayout() {
    const theme = useTheme();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'index', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
        { key: 'search', title: 'Search Questions', focusedIcon: 'magnify' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        index: Index,
        search: Search,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}
