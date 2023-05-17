import React, { useState } from 'react';
import { View, StyleSheet, Button, Image,TouchableOpacity , Text, ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';




const UploadScreen = () => {


    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState({});

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
        
              const localUri = result.assets[0].uri;
              setImage(result.assets[0].uri);

              const name = `image/${localUri.split('/')[1].split(';')[0]}`;
              const type = `image.${localUri.split('/')[1].split(';')[0]}`;

              const newFile = {
                uri: image,
                type: 'image/jpeg',
                name: 'image.jpg',
               
              }

              setImageData(newFile)

              console.log(imageData)
            }
          };

          const handelpost = async() => {
            const formData = new FormData();
  
             formData.append('file', imageData); 
             formData.append('upload_preset', 'socialimg' ) 

            let apiUrl = 'https://api.cloudinary.com/v1_1/dkg83oxgc/upload'

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
      const data = {
          postDescription: title,
          postImage: imgUrl,
          userId:id
      }
      let id = '645cf948b78d21a328568d27'
      try {
      const res = await axios.post(`http://localhost:3000/api/v1/new-post/${id}`, data);
      console.log(res.data)

      } catch (e) {
          console.log(e)
          console.log(e.message)
      }
    }

   /*       

     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                throw new Error('Permission to access media library not granted');
            }

            const imagePickerResult = await ImagePicker.launchImageLibraryAsync({ mediaType: 'photo' });
            if (imagePickerResult.cancelled) {
                console.log('Image picker cancelled');
                return;
            }
   
   
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
     } */
        
    
    return (
    <View style={styles.container}>
          <TouchableOpacity
          style={styles.add}
          onPress={pickImage}>
                <Text style={styles.textL}>
                ⊕</Text>

          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.button }
          onPress={handelpost}
          >
             <Text style={styles.text}
             > Upload </Text>
          </TouchableOpacity>

           <Image
        source={{uri: image}}
        style={styles.image}
         />

          {imageUrlC&& <Image
        source={{uri: imageUrlC}}
        style={styles.image}
         />}
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
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    add: {
        position: 'relative',
        width: 200,
        height: 200,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    image: {
      width: 150,
      height: 150,
      marginVertical: 10,
    },
    text: {
        color: 'white',
    },
    textL: {
        color: 'white',
        fontSize: '30px',
        fontWeight:'bold',
    },
    
  });

export default UploadScreen;