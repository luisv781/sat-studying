import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.onPrimaryContainer,
                tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {
                        border: 0,
                        backgroundColor: theme.colors.primaryContainer,
                    },
                }),
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name='house.fill' color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: 'Search Questions',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={28}
                            name='magnifyingglass'
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
