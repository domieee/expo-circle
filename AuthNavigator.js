import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

// Import your authentication screens
import Onboarding from './Screens/Onboarding.js';
import Login from './Screens/Login.js';
import Register from './Screens/Register.js';
import RegisterDetails from './Screens/RegisterDetails.js';

const Stack = createStackNavigator();

const AuthNavigator = ({ isAuthenticated, setIsAuthenticated }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hide the header if desired
                animationTypeForReplace: 'fade', // Specify the transition animation type
            }}
        >
            <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={(props) => <Login {...props} navigation={props.navigation} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterDetails"
                component={RegisterDetails}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;