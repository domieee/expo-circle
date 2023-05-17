import { TouchableOpacity, Linking, View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostLink from './components/PostLink.js';
import { useRoute } from '@react-navigation/native'

const ProfileMemberScreen = () => {
    const [postId, setPostId] = useState()

    const [profileData, setProfileData] = useState([])
    const [profileId, setProfileId] = useState()
    const [posts, setPosts] = useState([])
    const route = useRoute()

    const handlePress = () => {
        Linking.openURL(`${profileData?.website}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/get-member-profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName: route.params.userIdParameter
                    }),
                })
                const userData = await response.json();
                console.log(userData)
                setProfileData(userData);
                setPosts(userData?.posts)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])
    return (
        <View style={styles.pageContainer}>
            <ScrollView contentOffset={{ y: 0 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }} >
                <View style={styles.navBar}>
                    {/* <Image source={require('../assets/img/logoSmall.png')} /> */}
                    <Text style={styles.navBarText}>{profileData?.userName}</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Image style={styles.imageProfile} source={{ uri: profileData?.avatarMidsize }} />
                    <Text style={styles.userName}>{profileData?.fullName}</Text>
                    <Text style={styles.jobTitle}>{profileData?.jobTitle}</Text>
                    <Text style={styles.userDescription}>{profileData?.profileCaption}</Text>
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.websiteLink}>{profileData?.website}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.userStatsContainer}>

                    <View style={styles.userStats}>
                        <Text style={styles.statsText}>{profileData?.posts?.length}</Text>
                        <Text style={styles.statsDescription}>Posts</Text>
                    </View>

                    <View style={styles.statsBorder}>
                        <Text style={styles.statsText}>{profileData?.followerList?.length.toString()}</Text>
                        <Text style={styles.statsDescription}>Followers</Text>
                    </View>

                    <View style={styles.userStats}>
                        <Text style={styles.statsText}>{profileData?.followingList?.length}</Text>
                        <Text style={styles.statsDescription}>Following</Text>
                    </View>


                </View>



                {posts.map((post) => {
                    return (
                        <View key={post._id} style={styles.postLinkContainer}>
                            <PostLink
                                postImage={post.postImage}
                                postId={post._id}
                                setPostId={setPostId}
                            />
                        </View>

                    )
                })}
            </ScrollView>

        </View>
    )
}

export default ProfileMemberScreen

const styles = StyleSheet.create({
    postsContainer: {





        /*         gap:5,
                justifyContent:"flex-start",
                flexWrap:"wrap" */

    },
    postLinkContainer: {
        height: 110,
        width: 110,
        borderRadius: 10,

    },
    navBar: {
        marginLeft: 'auto',
        flexDirection: "row",
        alignItems: "center",
    },
    navBarText: {
        fontWeight: "700",
        fontSize: 17
    },
    pageContainer: {

        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: '#fff'
    },
    imageProfile: {
        width: 170,
        height: 170,
        borderRadius: 200,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 20,
        marginBottom: 10

    },
    jobTitle: {
        marginBottom: 15,
        textAlign: "center"
    },
    userDescription: {
        marginBottom: 10,
        textAlign: 'center',

    },
    userName: {
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 10,
        textAlign: "center"

    },
    profileContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    },
    websiteLink: {
        color: "#799df9",
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center"
    },
    userStatsContainer: {

        flexDirection: "row",

        justifyContent: "center",
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        /* marginBottom:10 */

    },
    userStats: {
        textAlign: 'center',
    },
    statsBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: "lightgrey",
        borderRightColor: "lightgrey",
        textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        marginLeft: 40,
        marginRight: 40
    },
    statsText: {
        fontSize: 21,
        fontWeight: "bold"
    },
    statsDescription: {
        fontSize: 15
    },

}); 