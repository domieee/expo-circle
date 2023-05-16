import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Comment from './components/Comment.js';

const CommentScreen = (params) => {
    
    const [userId, setUserId] = useState("")

    const [commentsData, setCommentsData] = useState([])

    const [newCommentText, setNewCommentText] = useState("")

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
        const response = await fetch("https://circle-backend-2-s-guettner.vercel.app/api/v1/new-comment" , {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId:userId,
                comment:newCommentText,
                postId:params.route.params.id
            }),
            
        })
        const data = await response.json()
        console.log(data)
        setCommentsData(data)
        } 


    return (
        <View style={styles.pageContainer}>
            <View style={styles.commentsContainer}>
                {commentsData?.comments?.map((comment) => {
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
            <View style={styles.postCommentContainer}>
                <TextInput
                    style={styles.inputComment}
                    onChangeText={(e) => setNewCommentText(e)}
                    value={newCommentText}
                    placeholder="Your Comment..."
                />
                
                <TouchableOpacity onPress={createNewComment}> 
                    <Text>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        borderRadius: 5,
        borderColor: "lightgray"
    },
    postCommentContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingRight: 40,


    },
    pageContainer: {
        flexDirection: "column",
        justifyContent: "space-between"
    }
});