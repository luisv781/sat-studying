import React from 'react';

import { BottomNavigation, useTheme } from 'react-native-paper';
import Index from '.';
import Search from './search';

export default function TabLayout() {
    const theme = useTheme();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'index', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
        { key: 'search', title: 'Search Questions', focusedIcon: 'magnify' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        index: Index,
        search: Search,
    });

    return (
        // <Tabs
        //     screenOptions={{
        //         tabBarActiveTintColor: theme.colors.onPrimaryContainer,
        //         tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        //         headerShown: false,
        //         tabBarButton: HapticTab,
        //         tabBarBackground: TabBarBackground,
        //         tabBarStyle: Platform.select({
        //             ios: {
        //                 // Use a transparent background on iOS to show the blur effect
        //                 position: 'absolute',
        //             },
        //             default: {
        //                 border: 0,
        //                 backgroundColor: theme.colors.primaryContainer,
        //             },
        //         }),
        //     }}
        // >
        //     <Tabs.Screen
        //         name='index'
        //         options={{
        //             title: 'Home',
        //             tabBarIcon: ({ color }) => (
        //                 <IconSymbol size={28} name='house.fill' color={color} />
        //             ),
        //         }}
        //     />
        //     <Tabs.Screen
        //         name='search'
        //         options={{
        //             title: 'Search Questions',
        //             tabBarIcon: ({ color }) => (
        //                 <IconSymbol
        //                     size={28}
        //                     name='magnifyingglass'
        //                     color={color}
        //                 />
        //             ),
        //         }}
        //     />
        // </Tabs>
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}
