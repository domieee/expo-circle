import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, } from 'react-native';
import React, { useState } from 'react';

const Post = ({ profileImage, postImage, timestamp, userName, jobTitle, hashtags, likes, comments, navigation, postCaption, id }) => {
    console.log(postCaption)
    console.log(hashtags)
    console.log(timestamp)

    const [likeToggle, setLikeToggle] = useState(false)

    const liked = require('../../assets/img/heart_filled.png')
    const notLiked = require('../../assets/img/heart_outlined.png')

    const newLikeHigher = likes + 1

    const likeHandler = () => {
        setLikeToggle((prev) => !prev)
    }

    return (
        <>
            <View style={styles.container}>
                <Pressable style={styles.row} onPress={() => navigation.navigate('ProfileMember', { userIdParameter: userName })}>
                    <Image style={styles.avatar} source={{ uri: profileImage }} />
                    return (
                    <>
                        <View style={styles.container}>
                            <Pressable
                                onPress={() => { navigation.navigate('ProfileMember', { userIdParameter: userName }) }}
                                style={styles.row}>
                                < Image style={styles.avatar} source={{ uri: profileImage }} />

                                <TouchableOpacity style={styles.stats} onPress={() => navigation.navigate('Comments', { id: id })}>
                                    <Image style={styles.vector} source={require('../../assets/img/comment_outlined.png')} />

                                    <TouchableOpacity
                                        style={styles.stats}
                                        onPress={() => navigation.navigate('Comments', { id: id, navigation: navigation })}>
                                        <Image
                                            style={styles.vector}
                                            source={require('../../assets/img/comment_outlined.png')} />
                                    </TouchableOpacity>
                                    <Text style={styles.statsText}>{comments}</Text>
                                </View>
                            </Pressable>
                        </View>
                        <Text style={styles.caption}>{postCaption}</Text>
                        <View style={styles.hashtags}>
                            {hashtags.map((hashtag) => (
                                <Text style={styles.hashtag}>{hashtag}</Text>
                            ))}
                        </View>
                    </View>
                </>
                );
};

                const styles = StyleSheet.create({
                    container: {
                    borderWidth: 0.2,
                borderColor: '#ffffff',
                borderRadius: 20,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderColor: 'black',
                flexDirection: 'column',
                marginBottom: 15,
                width: 370,
                padding: 10,
    },
                avatar: {
                    width: 50,
                height: 50,
                borderRadius: 25,
    },
                row: {
                    flexDirection: 'row',
                marginBottom: 10,
                marginLeft: 15
    },
                textLineContainer: {
                    justifyContent: 'center',
                gap: 2.5
    },
                textLine: {
                    width: 250,
                height: 20,
                backgroundColor: '#E0E0E0',
                marginRight: 10,
                borderRadius: 7.5
    },
                imagePost: {
                    flex: 1,
                height: 300,
                width: 350,
                borderRadius: 20,
                marginLeft: 'auto',
                marginRight: 'auto'
    },
                postStats: {
                    flexDirection: 'row',
                gap: 7.5,
                marginLeft: 15,
                marginTop: 10
    },
                vector: {
                    width: 26,
                height: 26
    },
                touchableOpacity: {
                    flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5
    },
                hashtags: {
                    marginLeft: 15,
                width: 300,
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 2.5,
    },
                hashtag: {
                    color: 'navy',
                fontWeight: 'bold',
                fontSize: 12
    },
                stats: {
                    justifyContent: 'center',
    },
                statsText: {
                    marginLeft: 3
    },
                text: {
                    marginLeft: 15,

    },
                textBold: {
                    fontWeight: '600',
                marginLeft: 15
    },
                caption: {
                    marginTop: 10,
                marginBottom: 2.5,
                marginLeft: 15,
                fontSize: 14
    }
});

                export default Post;