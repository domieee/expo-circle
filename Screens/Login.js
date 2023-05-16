import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation, isAuthenticated, setIsAuthenticated }) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    // const router = useRouter();


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
                const userID = await response.json();
                await AsyncStorage.setItem('userID', userID);
                setIsAuthenticated(true)
            } else if (response.statusCode === 400) {
                const error = await response.json();
                console.log(error)
                setErrorMsg(error.msg);
            }
        } catch (err) {
            console.log(err, errorMsg);
        }
    };

    const goToRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <SafeAreaView style={styles.loginForm}>
            <Text>Login</Text>
            <TextInput
                onChangeText={(e) => setMail(e)}
                keyboardType="email-address"
                style={styles.input}
                editable
                placeholder="johndoe@mail.com"
                placeholderTextColor="#808080"
            />

            <TextInput
                onChangeText={(e) => setPassword(e)}
                secureTextEntry={true}
                style={styles.input}
                editable
                placeholder="Password"
                placeholderTextColor="#808080"
            />

            <Button onPress={sendLoginData} title="Login" />

            <Text>Not a member?</Text>

            <TouchableOpacity onPress={goToRegister} style={styles.appButtonContainer}>
                <Text style={styles.login}>Create Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loginForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
});

export default Login;