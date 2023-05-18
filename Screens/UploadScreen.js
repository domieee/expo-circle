import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);

    const [postImage, setPostImage] = useState('');
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const [likes, setLikes] = useState(0);

    const [jobTitle, setJobTitle] = useState('');

    const [profileData, setProfileData] = useState([]);

    const [postDescription, setPostDescription] = useState('');

    const feedNavigation = () => {
        navigation.navigate('/feed');
        
    };



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
            navigation.navigate('Feed');
            feedNavigation;
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
            <ImageBackground source={require('../assets/img/wave-upload.png')} style={styles.imageBackground}>
                <View>
                    <Image style={styles.avatar} source={!postImage ? require('../assets/img/placeholderPost.png') : { uri: image }} />
                    <Button title="Upload Image" onPress={handleImageUpload} />
                </View>
                {/*  <Image style={styles.avatar} source={{ uri: profileImage }} /> */}

                {/* Button to trigger image upload */}
                <View style={styles.input}>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        onChangeText={setPostDescription}
                        value={postDescription}
                        style={{ padding: 10 }}
                        placeholder="Tell your Story..."
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={createPost}>
                    <Text style={styles.buttonText}>Create Post</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        /* flex: 1, */
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        /* paddingTop: 300, */
        paddingBottom: 30,
        height: '100%',
    },
    image: {
        width: 200,
        height: 200,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 20,
        marginTop:50
    },
    input: {
        borderWidth: 1,
        borderColor: '#E98090',
        borderRadius: 20,
        marginTop: 30,
        paddingRight: 200,
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: '#E98090',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
    },
    imageBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});

export default UploadScreen;
