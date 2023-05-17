import React, { useState } from 'react';
import { View, StyleSheet, Button, Image,TouchableOpacity , Text, ImageBackground, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';




const UploadScreen = () => {

   
    const [image, setImage] = useState(null);

    const [imageUrlC, setImageUrlC] = useState(null);


        const pickImage = async () => {

           const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                throw new Error('Permission to access media library not granted');
            }
   
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaType: 'photo',
                quality: 1,
            });
        
            if (!result.canceled) {
        
              setImage(result.assets[0].uri);

              console.log(imageData)
            }
          };

          const handelpost = async() => {
            const formData = new FormData();
  
             formData.append('file', {
                uri: image,
                type: 'image/jpeg',
                name: 'image.jpg',
             }); 
             formData.append('upload_preset', 'gtythqdr') 

            let apiUrl = 'https://api.cloudinary.com/v1_1/djcnvsofd/image/upload'

            console.log(formData)

            try {
             const response = await axios.post(apiUrl , formData);

             const imgUrl = response.data.url 

             setImageUrlC(response.data.url)

             saveImageToMongoDB(imgUrl); 

            } catch (error) {
            console.log(error);
            }
          };

    
    const saveImageToMongoDB = async (imgUrl) => {
        const id = await AsyncStorage.getItem('userID');
        const data = {
          postDescription: title,
          postImage: imgUrl,
          userId:id
      }
     
      try {
      const res = await axios.post(`http://localhost:3000/api/v1/new-post/${id}`, data);
      console.log(res.data)

      } catch (e) {
          console.log(e)
          console.log(e.message)
      }
    }

    
    return (
    <View style={styles.container}>

         <Image
        source={{uri: image}}
        style={styles.image}
         />   

          <TouchableOpacity
          style={styles.add}
          onPress={pickImage}>
                <Text style={styles.textL}>
                ⊕</Text>

          </TouchableOpacity>

          <TextInput
          styles={styles.input}
          placeholder='Title'
          />

          <TouchableOpacity 
          style={styles.button }
          onPress={handelpost}
          >
             <Text style={styles.text}
             > Post </Text>
          </TouchableOpacity>

    </View>
    );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 200,
      height: 50,
      backgroundColor: '#FF6247',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      borderRadius:50,
    },
    add: {
        position: 'relative',
        width: 40,
        height: 40,
        backgroundColor: '#FF6247',
        alignItems: 'center',
        justifyContent: 'center',
        /* marginVertical: 0, */
        fontSize: '40px',
        borderRadius:'50%',

    },
    image: {
      width: 200,
      height: 200,
      marginVertical: 10,
      borderWidth:1,
      borderColor: '#FF6247',
      borderStyle: 'dotted',
      borderRadius: 20,
    },
    text: {
        color: 'white',
    },
    textL: {
        color: 'white',
        fontSize: '30px',
        fontWeight:'bold',
    },
    input: {
        borderWidth: 1,
    }
    
  });

export default UploadScreen;