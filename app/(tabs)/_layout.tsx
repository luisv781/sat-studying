import React, { useState } from 'react';

import { BottomNavigation } from 'react-native-paper';
import Index from '.';
import Search from './search';
import Study from './study';

export default function TabLayout() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {
            key: 'index',
            title: 'Home',
            focusedIcon: 'home',
            unfocusedIcon: 'home-outline',
        },
        {
            key: 'study',
            title: 'Study',
            focusedIcon: 'school',
            unfocusedIcon: 'school-outline',
        },
        { key: 'search', title: 'Search Questions', focusedIcon: 'magnify' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        index: () => Index((index) => setIndex(index)),
        search: Search,
        study: Study,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}
