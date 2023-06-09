import { ScrollView, Text, StyleSheet, StatusBar, View, FlatList, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Post from './components/Post';
import SkeletonPost from './components/SkeletonPost';
import { useRoute } from '@react-navigation/native';

const FeedScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [feed, setFeed] = useState([]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [scrollPosition, setScrollPosition] = useState(0);

    const [reload, setReload] = useState(false)

    const [isTabActive, setIsTabActive] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsTabActive(true);
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setIsTabActive(false);
        });

        return unsubscribe;
    }, [navigation]);


    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const userID = await AsyncStorage.getItem('userID');
                const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/get-feed', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userID,
                    }),
                });
                setUser(userID);
                const feedData = await response.json();
                console.log(feedData);

                const sortedPosts = await feedData.sort((a, b) => {
                    const timestampA = new Date(a.timestamp);
                    const timestampB = new Date(b.timestamp);
                    return timestampB - timestampA;
                });

                setFeed(feedData);

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFeed();
    }, [isTabActive]);

    const renderPost = ({ item }) => {
        return (
            <View>
                <Post
                    id={item.postId}
                    navigation={navigation}
                    profileImage={item.creatorAvatarSmall}
                    postImage={item.postImage}
                    userName={item.postCreator}
                    jobTitle={item.postCreatorJob}
                    postCaption={item.postCaption}
                    postDescription={item.postDescription}
                    hashtags={item.hashtags}
                    timestamp={item.timestamp}
                    likes={item.likes}
                    comments={item.comments.length.toString()}
                />
            </View>
        );
    };

    const renderSkeletonPost = () => {
        return <SkeletonPost />;
    };

    const renderFooter = () => {
        return isLoading ? (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#999999" />
            </View>
        ) : null;
    };

    return (
        <View style={styles.container}>

            {isTabActive && isLoading ? (
                <FlatList
                    style={styles.postContainer}
                    data={new Array(10).fill(null)}
                    renderItem={renderSkeletonPost}
                    keyExtractor={(item, index) => `skeleton-${index}`}
                    ListFooterComponent={renderFooter}
                />
            ) : (
                <FlatList
                    style={styles.postContainer}
                    data={feed}
                    renderItem={renderPost}
                    keyExtractor={(item) => item._id.toString()}
                    ListFooterComponent={renderFooter}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    postContainer: {
        paddingTop: 10,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
});

export default FeedScreen;