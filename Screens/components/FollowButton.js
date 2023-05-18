import { TouchableOpacity, Linking, View, Text, StyleSheet, Image, ScrollView ,Button,Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';

const FollowButton = ({ fullName, image }) => {
    const [renderState, setRenderState] = useState(false);
    
    return (
        <View style={styles.searchedUserContainer}>
            <View style={styles.nameContainer}>
                <Image style={styles.image} source={{ uri: image }} />
                <Text style={styles.textName}>{fullName}</Text>
            </View>
            <Pressable onPress={() => setRenderState((prev) => !prev)} style={renderState ? styles.buttonClicked : styles.button}>
                <Text style={renderState ? styles.textClicked : styles.text}>{renderState ? 'Unfollow' : 'Follow'}</Text>
            </Pressable>
        </View>
    );
};

export default FollowButton;

const styles = StyleSheet.create({
    searchedUserContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    nameContainer: {
        flexDirection: 'row',
        width: 210,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight:10
    },
    textName: {
        fontSize: 15,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        width: 70,
        marginLeft: "auto",
        marginRight:"auto"
    },
    textClicked: {
        textAlign: 'center',
        color: '#e98090',
        fontWeight: 'bold',
        width: 70,
        marginLeft: "auto",
        marginRight:"auto"
    },
    button: {
        borderRadius: 10,
        borderWidth: 1,
        width: 120,
        padding: 5,
        margin: 5,
        borderColor: 'lightgray',
        backgroundColor: '#e98090',
        textAlign: 'center',
    },
    buttonClicked: {
        borderRadius: 10,
        borderWidth: 1,
        width: 120,
        padding: 5,
        margin: 5,
        borderColor: '#e98090',
        textAlign: 'center',
    },
});