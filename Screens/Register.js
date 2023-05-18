import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, Image ,ImageBackground, Pressable} from 'react-native'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
    const [isImageLoaded, setImageLoaded] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const sendRegisterData = async () => {
        try {
            const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: mail,
                    password: password,
                    confirmPassword: confirmationPassword
                })
            })
            if (response.ok) {
                const res = await response.json(); // Save response data to a variable
                await AsyncStorage.setItem('userID', res._id);
                navigation.navigate('RegisterDetails')
            } else if (response.status === 400) {
                setErrorMsg(response.msg);
            }
        } catch (err) {
            console.log(err, '55');
        }
    }


    const goBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.loginForm}>
            <ImageBackground source={require('../assets/img/wave-haikei(3).png')} style={styles.image}>
                <Image style={styles.logo} source={require('../assets/img/circle_logo.png')} />
                <Text style={styles.textRegister}>Register</Text>

                <TextInput
                    onChangeText={(e) => {
                        setMail(e);
                    }}
                    style={styles.input}
                    editable
                    placeholder="johndoe@mail.com"
                    placeholderTextColor="#808080"
                />

                <TextInput
                    onChangeText={(e) => {
                        setPassword(e);
                    }}
                    secureTextEntry={true}
                    style={styles.input}
                    editable
                    placeholder="Password"
                    placeholderTextColor="#808080"
                />

                <TextInput
                    onChangeText={(e) => {
                        setConfirmationPassword(e);
                    }}
                    secureTextEntry={true}
                    style={styles.input}
                    editable
                    placeholder="Confirm password"
                    placeholderTextColor="#808080"
                />

                {/* <Button onPress={() => sendRegisterData()} title="Create Account" /> */}
                <Pressable onPress={() => sendRegisterData()} style={styles.buttonRegister}>
                    <Text style={styles.textLogin}>CREATE ACCOUNT</Text>
                </Pressable>
                <Text style={styles.error}>{errorMsg}</Text>

                <Text style={styles.registeredText}>Already registered?</Text>

                <TouchableOpacity onPress={goBack} style={styles.appButtonContainer}>
                    <Text style={styles.login}>Sign in</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    loginForm: {
        /* alignItems: 'center', */
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flexDirection: 'column',
        height: '100%',
        marginBottom: 200,
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
    error: {
        color: 'red',
    },
    textRegister: {
        marginTop: 20,
        fontSize:20,
    
    },
    logo: {
        marginTop: 50,
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    buttonRegister: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 100,
        marginTop:70
    },
    textLogin: {
        color: '#E98090',
        fontSize: 20,

    },
    login:{
        color:"white"
    },
    registeredText:{
        color:"white",
        margin:5
    }
});

export default Register;