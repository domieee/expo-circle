import { View, TextInput, Image, StyleSheet, Text, Button, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation, isAuthenticated, setIsAuthenticated }) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const sendLoginData = async () => {
        try {
            const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: mail,
                    password: password,
                }),
            });
            if (response.ok) {
                console.log('asdasd')
                const userID = await response.json()
                await AsyncStorage.setItem('userID', userID)
                setIsAuthenticated(true)
            } else if (response.statusCode === 400) {
                const error = await response.json()
                console.log(error)
                setErrorMsg(error.msg)
            }
        } catch (err) {
            console.log(err, errorMsg)
        }
    }

    const goToRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <SafeAreaView style={styles.loginForm}>
            <View style={styles.containerTop}>
                <Image
                    style={styles.logoImage}
                    source={require('../assets/img/circle_logo.png')} />
                <Text style={styles.headingSecondary}>Welcome Back!</Text>
                <Text style={styles.textSecondary}>We're happy to see you. Login and relive beautiful moments with your inner circle.</Text>
            </View>

            <View style={styles.passwordContainer}>
                <Ionicons name={'mail'} size={21} color={'#808080'} />
                <TextInput
                    style={styles.input}
                    placeholder="johndoe@mail.com"
                    placeholderTextColor="#808080"
                    onChangeText={e => {
                        setMail(e)
                    }}
                    underlineColorAndroid="transparent"
                />
            </View>


            <View style={styles.passwordContainer}>
                <Ionicons name={'lock-closed'} size={21} color={'#808080'} />
                <TextInput
                    style={styles.input}
                    placeholder="••••••••••••"
                    secureTextEntry={true}
                    placeholderTextColor="#808080"
                    onChangeText={e => {
                        setPassword(e)
                    }}
                    underlineColorAndroid="transparent"
                />
            </View>

            <Pressable
                style={styles.buttonLogin}
                onPress={sendLoginData}>
                <Text
                    style={styles.textLogin}
                >Login</Text>
            </Pressable>


            <View style={styles.containerBot}></View>
            <Text style={styles.bottomTextOr}>Already member?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.boxBottomText}>Create Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headingSecondary: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
    },
    textSecondary: {
        textAlign: 'center',
        fontSize: 15,
        paddingHorizontal: 50
    },
    loginForm: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    logoImage: {
        width: 64,
        height: 64,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    login: {
        fontSize: 10,
    },
    passwordContainer: {
        marginTop: 20,
        width: 250,
        flexDirection: 'row',
        borderBottomWidth: 0.25,
        borderColor: '#808080',
        paddingBottom: 5,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        justifyContent: 'center',
        paddingLeft: 10,
        flex: 1,

    },
    buttonLogin: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#E98090',
        paddingLeft: 90,
        paddingRight: 90,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 100
    },
    textLogin: {
        color: 'white',
        fontSize: 20
    },
    bottomTextOr: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        opacity: 0.75,
        color: '#000',
        fontSize: 15
    },
    boxBottomText: {
        color: '#E98090',
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 12,
    },
    containerTop: {
        flex: 1,
        heigth: '50%',
        justifyContent: 'center',
        top: 30
    },
    containerMid: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    containerBot: {
        flex: 1,
        justifyContent: 'center',
        top: 50,
        heigth: '50%',
    },
});

export default Login;