import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Post = ({ profileImage, postImage, userName, jobTitle, likes, comments, navigation, postCaption, id }) => {
    const isSkeleton = !profileImage || !postImage;

    return (
        <View style={isSkeleton ? styles.skeletonPost : styles.post}>
            <View style={styles.container}>
                {isSkeleton ? (
                    <View style={styles.avatarSkeleton} />
                ) : (
                    <Image style={styles.imageProfile} source={{ uri: profileImage }} />
                )}
                <View>
                    {isSkeleton ? (
                        <View style={[styles.text, styles.skeletonText]} />
                    ) : (
                        <>
                            <Text style={styles.text}>{userName}</Text>
                            <Text style={styles.text}>{jobTitle}</Text>
                        </>
                    )}
                </View>
            </View>
            <View style={styles.postImgContainer}>
                {isSkeleton ? (
                    <View style={styles.contentSkeleton} />
                ) : (
                    <Image style={styles.imagePost} source={{ uri: postImage }} />
                )}
                <View style={styles.postStats}>
                    {isSkeleton ? (
                        <View style={[styles.touchableOpacity, styles.skeletonStats]} />
                    ) : (
                        <>
                            <Text>{postCaption}</Text>
                            <View style={styles.touchableOpacity}>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.vector}
                                        source={require('../../assets/img/heart_outlined.png')}
                                    />
                                </TouchableOpacity>
                                <Text>{likes}</Text>
                            </View>
                            <View style={styles.touchableOpacity}>
                                <TouchableOpacity onPress={() => navigation.navigate('Comments', { id: id })}>
                                    <Image
                                        style={styles.vector}
                                        source={require('../../assets/img/comment_outlined.png')}
                                    />
                                </TouchableOpacity>
                                <Text>{comments}</Text>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    post: {
        marginBottom: 10,
    },
    skeletonPost: {
        marginBottom: 10,
        opacity: 0.5,
    },
    touchableOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vector: {
        width: 24,
        marginRight: 7.5,
    },
    imageProfile: {
        width: 50,
        height: 50,
        borderRadius: 200,
        marginRight: 20,
    },
    postStats: {
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        marginTop: 5,
        marginBottom: 6,
    },
    postImgContainer: {
        padding: 20,
    },
    imagePost: {
        width: 350,
        height: 300,
        borderRadius: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 30,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
    },
    text: {
        height: 20,
    },
    skeletonText: {
        backgroundColor: '#E0E0E0',
    },
    avatarSkeleton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0E0E0',
        marginRight: 10,
    },
    contentSkeleton: {
        flex: 1,
        height: 100,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
    },
    skeletonStats: {
        width: 80,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E0E0E0',
    },
});

export default Post;