import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadScreen = () => {
    const [image, setImage] = useState(null);

    const [postImage, setPostImage] = useState('');
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const [likes, setLikes] = useState(0);

    const [jobTitle, setJobTitle] = useState('');

    const [profileData, setProfileData] = useState([]);

    const [postDescription, setPostDescription] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userID');
                console.log(userId);
                const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/get-profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                    }),
                });
                const userData = await response.json();
                console.log(userData);
                setProfileData(userData);
                setUserName(userData.fullName);
                setJobTitle(userData.jobTitle);
                setProfileImage(userData.avatarSmall);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, []);

    const createPost = async () => {
        try {
            const userId = await AsyncStorage.getItem('userID');
            console.log(userId);
            const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/new-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    profileImage: profileImage,
                    userName: userName,
                    jobTitle: jobTitle,
                    postImage: postImage,
                    likes: likes,
                    postDescription: postDescription,
                }),
            });
            const userData = await response.json();
            console.log(userData);
        } catch (error) {
            console.log(error);
        }
    };

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
            setPostImage(res.url);
        } catch (error) {
            console.log('Image upload error:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Display the uploaded image */}
            <Image style={styles.avatar} source={!postImage ? require('../assets/img/placeholderPost.png') : { uri: image }} />
            {/*  <Image style={styles.avatar} source={{ uri: profileImage }} /> */}

            {/* Button to trigger image upload */}
            <Button title="Upload Image" onPress={handleImageUpload} />
            <TextInput onChangeText={setPostDescription} value={postDescription} styles={styles.input} placeholder="Title" />
            <TouchableOpacity style={styles.button} onPress={createPost}>
                <Text>NEW POST!!!!!!!!!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    image: {
        width: 200,
        height: 200,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
    input: {
        borderWidth: 1,
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: '#FE5B74',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 50,
    },
});

export default UploadScreen;
