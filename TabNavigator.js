import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your stack navigators for each tab
import HomeStack from './Stacks/HomeStack';
import SearchScreen from './Screens/SearchScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'ios-search' : 'ios-search-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={HomeStack}
                options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={SearchScreen}
                options={{ headerShown: false }} />
        </Tab.Navigator >
    );
};

export default TabNavigator;