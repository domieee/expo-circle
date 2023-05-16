import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { TouchableOpacity, Text, View, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import your screens/components for the Home tab
import FeedScreen from '../Screens/FeedScreen';
import CommentScreen from '../Screens/CommentScreen';
import { useState } from 'react';

const Stack = createStackNavigator();

const HomeStack = () => {




    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={() => <FeedScreen />}
                options={({ navigation }) => ({
                    headerTitle: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                            <Image
                                source={require('../assets/img/circle_logo.png')}
                                style={{ width: 30, height: 30, marginRight: 10 }}
                            />
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Circles</Text>
                        </View>
                    ),
                    headerTitleAlign: 'left',
                })}
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    ...TransitionPresets.ModalPresentationIOS,
                    cardStyle: {
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                                name="arrow-back"
                                style={{ paddingLeft: 20 }}
                                size={24}
                                color="black" />
                        </TouchableOpacity>
                    ),
                    tabBarVisible: false
                })}
                name="Comments"
                component={CommentScreen}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;