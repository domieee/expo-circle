import React, { useState } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadScreen = () => {
    const [image, setImage] = useState(null);

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
            const responseData = await response.json();
            console.log('Image uploaded successfully:', responseData);
        } catch (error) {
            console.log('Image upload error:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Display the uploaded image */}
            {image && <Image source={{ uri: image }} style={styles.image} />}

            {/* Button to trigger image upload */}
            <Button title="Upload Image" onPress={handleImageUpload} />
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
});

export default UploadScreen;