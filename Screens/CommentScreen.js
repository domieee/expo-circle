import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Vibration } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Comment from './components/Comment.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HapticFeedback from "react-native-haptic-feedback";

const CommentScreen = (params) => {

    const [userId, setUserId] = useState("")

    const [commentsData, setCommentsData] = useState([])

    const inputValueRef = useRef("");

    const [renderState, setRenderState] = useState(false)

    const postId = params.route.params.id


    useEffect(() => {
        const getUserId = async () => {
            const userId = await AsyncStorage.getItem('userID');
            setUserId(userId);
        };
        getUserId()

        const fetchComments = async () => {
            try {
                const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/get-post-comments', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        postId: params.route.params.id,
                    }),
                });
                const data = await response.json();
                setCommentsData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchComments();
    }, []);

    const createNewComment = async () => {

        try {
            const response = await fetch("https://circle-backend-2-s-guettner.vercel.app/api/v1/new-comment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    commentText: inputValueRef.current,
                    postId: params.route.params.id
                }),

            })
            const data = await response.json()
            console.log(data)
            setCommentsData(data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (text) => {
        inputValueRef.current = text;
    };

    const handlePress = () => {
        Vibration.vibrate(50)
        createNewComment()
    }

    return (
        <>
            <ScrollView style={styles.pageContainer}>
                <View style={styles.commentsContainer}>
                    {commentsData?.comments?.reverse().map((comment) => {
                        return (
                            <Comment
                                key={comment._id}
                                commentCreatorAvatar={comment.commentCreatorAvatar}
                                commentCreator={comment.commentCreator}
                                commentCreatorJob={comment.commentCreatorJob}
                                comment={comment.comment}
                                likes={comment.likes}

                            />

                        )
                    })}
                </View>

            </ScrollView>
            <View style={styles.postCommentContainer}>
                <TextInput
                    style={styles.inputComment}
                    onChangeText={handleInputChange}
                    placeholder="Your Comment..."
                />

                <TouchableOpacity onPress={handlePress}>
                    <Text>Post</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default CommentScreen;

const styles = StyleSheet.create({
    commentsContainer: {
        padding: 10,

    },
    inputComment: {
        padding: 10,
        marginLeft: 10,
        paddingRight: 100,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: "lightgray"
    },
    postCommentContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingRight: 40,
    }
});