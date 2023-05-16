import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, Button, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/img/circle_logo.png'
import * as Keychain from 'react-native-keychain';
import { createStackNavigator } from '@react-navigation/stack';

const Onboarding = ({ navigation }) => {
    // const router = useRouter()

    // const router = useRouter()




    return (
        <View style={styles.center}>
            <ImageBackground source={require('../assets/img/wave-haikei(3).png')} resizeMode="strech" style={styles.image}>
                <View style={styles.boxTop}>
                    <Image
                        style={styles.boxTopImage}
                        source={require('../assets/img/circle_logo.png')} />
                    <Text style={styles.boxTopText}>Circles</Text>
                    <Text style={styles.boxTopTextSecondary}>Expand your social sphere</Text>

                </View>
                <View style={styles.boxBottom}>
                    <Pressable
                        style={styles.buttonLogin}
                        onPress={() => navigation.navigate('Login')}>
                        <Text
                            style={styles.textLogin}
                        >Login</Text>
                    </Pressable>
                    <Text style={styles.bottomTextOr}>Already member?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.boxBottomText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground >
        </View >
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    boxTopText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 15,
    },
    boxTopTextSecondary: {
        color: '#E98090',
        fontSize: 15
    },
    boxTopImage: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 128,
        height: 128
    },
    buttonLogin: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 100
    },
    textLogin: {
        color: '#E98090',
        fontSize: 20
    },
    boxBottom: {
        alignSelf: 'auto',
    },
    boxTop: {
        justifyContent: 'center',
        height: '70%',
        top: -10
    },
    boxBottomText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    bottomTextOr: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        opacity: 0.75,
        color: 'white'
    }
})

export default Onboarding