import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AuthNavigator from './AuthNavigator.js';
import TabNavigator from './TabNavigator.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function clearSessionData() {
            await AsyncStorage.removeItem('userID');
        }
        clearSessionData()
    }, [])

    return (
        <NavigationContainer>
            <StatusBar
                barStyle="dark-content" // Customize the style of the status bar (e.g., light-content, dark-content)
                backgroundColor="#fff" // Customize the background color of the status bar
            />
            {!isAuthenticated ? <AuthNavigator isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> : <TabNavigator />}

        </NavigationContainer>
    )
}

export default App

const style = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})