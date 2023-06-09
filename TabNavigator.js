import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your stack navigators for each tab
import HomeStack from './Stacks/HomeStack';
import SearchScreen from './Screens/SearchScreen';
import UploadScreen from './Screens/UploadScreen';
import ProfileScreen from './Screens/ProfileScreen';
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
                    } else if (route.name === 'Upload') {
                        iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'ios-person' : 'ios-person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#E98090',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={HomeStack}
                options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={SearchScreen}
                options={{ headerShown: false }} />
            <Tab.Screen name="Upload" component={UploadScreen}
                options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{ headerShown: false }} />
        </Tab.Navigator >
    );
};

export default TabNavigator;