import { View, Text, TextInput, Image, StyleSheet, Button, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterDetails = ({ isAuthenticated, setIsAuthenticated }) => {

    const [image, setImage] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('');

    const fetchRegisterDetails = async () => {
        try {
            const userId = await AsyncStorage.getItem('userID');
            console.log(userId)
            const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/register-submit', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    fullName: `${firstName} ${lastName}`,
                    firstName: firstName,
                    lastName: lastName,
                    avatarMidsize: profileImage,
                    userDescription: userDescription,
                    jobTitle: jobTitle,
                    phoneNumber: phoneNumber,
                    website: website
                })
            })
            if (response.ok) {
                setIsAuthenticated(true)
            } else {
                console.log(response)
            }
        } catch (err) {
            console.log(err)
        }

    }

    const handleImageUpload = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                throw new Error('Permission to access media library not granted');
            }

            const imagePickerResult = await ImagePicker.launchImageLibraryAsync({ mediaType: 'photo' });
            if (imagePickerResult.cancelled) {
                console.log('Image picker cancelled');
                return;
            }

            // Set the image in the state
            setImage(imagePickerResult.uri);


            // Create a form data object to send the image file
            const formData = new FormData();
            formData.append('file', {
                uri: imagePickerResult.uri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });
            formData.append('upload_preset', 'gtythqdr');

            // Upload the image to Cloudinary
            const response = await fetch('https://api.cloudinary.com/v1_1/djcnvsofd/image/upload', {
                method: 'POST',
                body: formData,
            });

            // Handle the response from Cloudinary
            const res = await response.json();
            console.log('Image uploaded successfully:', res);
            setProfileImage(res.url)

        } catch (error) {
            console.log('Image upload error:', error);
        }
    };

    return (
        <View style={styles.centered}>
            <Image style={styles.avatar} source={!image ? require('../assets/img/placeholder.png') : { uri: image }} />

            {/*    <Button title="Upload Image" onPress={handleImageUpload} /> */}

            <Pressable style={styles.uploadButton} onPress={handleImageUpload}>
                <Text style={styles.uploadText}>Upload Image</Text>
            </Pressable>

            <Text>Tell a bit more about you!</Text>

            {/* <Text>First Name</Text> */}
            <TextInput
                onChangeText={(e) => {
                    setFirstName(e);
                }}
                style={styles.input}
                editable
                placeholder="first name"
                placeholderTextColor="#808080"
            />

            {/* <Text>Last Name</Text> */}
            <TextInput
                onChangeText={(e) => {
                    setLastName(e);
                }}
                style={styles.input}
                editable
                placeholder="last name"
                placeholderTextColor="#808080"
            />
            {/* <Text>Describe yourself</Text> */}
            <TextInput
                onChangeText={(e) => {
                    setUserDescription(e);
                }}
                numberOfLines={1}
                style={styles.input}
                editable
                placeholder="Describe yourself..."
                placeholderTextColor="#808080"
            />
            {/* <Text>Job-title</Text> */}
            <TextInput
                onChangeText={(e) => {
                    setJobTitle(e);
                }}
                autoCapitalize="words"
                style={styles.input}
                editable
                placeholder="job title"
                placeholderTextColor="#808080"
            />
            {/*   <Text>phone number</Text> */}
            <TextInput
                onChangeText={(e) => {
                    setPhoneNumber(e);
                }}
                style={styles.input}
                editable
                keyboardType="numeric"
                placeholder="phone number"
                placeholderTextColor="#808080"
            />
            {/*  <Text>Website</Text> */}
            <TextInput
                onChangeText={(e) => {
                    setWebsite(e);
                }}
                style={styles.input}
                editable
                keyboardType="url"
                placeholder="website"
                placeholderTextColor="#808080"
            />
            <TouchableOpacity onPress={fetchRegisterDetails} style={styles.appButtonContainer}>
                <Text style={styles.login}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        margin: 20,
    },
    appButtonContainer: {
        marginTop: 20,
        backgroundColor: '#E98090',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 100,
        paddingTop: 10,
        paddingBottom: 10,
    },
    login: {
        color: 'white',
    },
    uploadText: {
        color: "white"
    },
    uploadButton: {
        marginTop: 10,
        backgroundColor: '#E98090',
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 30,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 15
    },
});

export default RegisterDetails