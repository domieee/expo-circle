import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'


const Comment = ({ commentCreatorAvatar, commentCreator, commentCreatorJob, comment, likes, navigation, postId }) => {
    // like toggle for comments
    const [likeToggle, setLikeToggle] = useState(false);

    const liked = require('../../assets/img/heart_filled.png');
    const notLiked = require('../../assets/img/heart_outlined.png');

    const newLikeHigher = likes + 1;

    const likeHandlerToggle = () => {
        setLikeToggle((prev) => !prev);
    }

    const likeHandler = () => {
        if (!likedStatus) {
            fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/increase-comment-likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: postId,
                }),
            }).then(() => {
                setLikedStatus((prev) => !prev);
            });
        }
    };

    return (
        <View style={styles.commentContainer}>
            <Pressable onPress={() => navigation.reset('ProfileMember', { userIdParameter: commentCreator })} style={styles.commentCreatorContainer}>
                <Image style={styles.commentCreatorAvatar} source={{ uri: commentCreatorAvatar }} />
                <View>
                    <Text>{commentCreator}</Text>
                    <Text>{commentCreatorJob}</Text>
                </View>
            </Pressable>
            <Text>{comment}</Text>
            <View style={styles.flex}>
                <TouchableOpacity onPress={likeHandlerToggle}>
                    <Image source={likeToggle ? liked : notLiked} />
                </TouchableOpacity>
                <Text>{likeToggle === false ? likes : newLikeHigher}</Text>
            </View>
        </View>
    );
}

export default Comment;

const styles = StyleSheet.create({
    commentCreatorAvatar: {
        width: 50,
        height: 50,
        borderRadius: 200,
        marginRight: 20,
    },
    commentCreatorContainer: {
        flexDirection: "row",

    },
    commentContainer: {
        borderWidth: 1,
        borderColor: "lightgrey",
        padding: 10
    }
});