import { ScrollView, View, TextField, TextInput, Text, Button, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FollowButton from './components/FollowButton';

const Search = ({navigation}) => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [shouldRender, setShouldRender] = useState(true);
    const [endOfData, setEndOfData] = useState(false);



    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [searchedUser, setSearchedUser] = useState([])
    const [renderState, setRenderState] = useState(false)

    const fetchUserList = async () => {
        try {
            const userID = await AsyncStorage.getItem('userID');
            setUserId(userID)

            const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/search-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    fullName: userName,
                }),
            });
            const data = await response.json()
            console.log(data)
            setSearchedUser(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUserList();

    }, [userName, renderState]);

    console.log(userId)

    const follow = async (fullNameToAdd, _id) => {
        try {
            const response = await fetch("https://circle-backend-2-s-guettner.vercel.app/api/v1/add-following", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    fullNameToAdd: fullNameToAdd,
                    _id: _id
                })
            })
            const data = await response.json()
            console.log(data)
            console.log(data)

        } catch (err) {
            console.log(err)
        }
    }


    const unfollow = async (fullNameToRemove) => {
        try {
            const response = await fetch("https://circle-backend-2-s-guettner.vercel.app/api/v1/remove-following", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    fullNameToRemove: fullNameToRemove
                })
            })
            const data = await response.json()
            console.log(data)

        } catch (err) {
            console.log(err)
        }
    }



    /*     const followUser = (IdOfUserToFollow) => {
        fetch("https://circle-backend-2-s-guettner.vercel.app/api/v1/follow-user" , {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId:userId,
                IdOfUserToFollow:IdOfUserToFollow
            })
        })
    }
 */


    /*     const renderUsers = ({ item, index }) => {
            const user = item
            const idHandler = () => {
                followUser(user._id)
            }
            return (
                < View style={styles.userContainer} >
                    < View >
                        <Text>{user.fullName}</Text>
                        <Text>{user.jobTitle}</Text>
                    </View >
                    <Button onPress={idHandler} title={user.followingStatus === 'not_following' ? 'Follow' : 'Following'} />
                </View >
            );
        };
     */
    console.log(searchedUser)

    /*     const handleLoadMore = () => {
      if (!isLoading && !endOfData) {
        setPage(prevPage => prevPage + 1);
        fetchUserList();
      }
    };
    
        const renderFooter = () => {
      if (endOfData) {
        return <Text>End of data reached</Text>;
      }
      return isLoading ? (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="#999999" />
        </View>
      ) : null;
    };
    
        useEffect(() => {
            if (users.length >= 20) {
                setShouldRender(false);
            }
        }, [users]);
    
     */
    const followHandler = (fullNameToAdd) => {
        /*  follow(fullNameToAdd) */
        setRenderState(prev => !prev)
    }

    const unfollowHandler = (fullNameToRemove, _id) => {
        /*  unfollow(fullNameToRemove, _id) */
        setRenderState(prev => !prev)
    }


    const [followedArray, setFollowedArray] = useState([])


    return (
        <>
            <SafeAreaView>
                <TextInput
                    placeholder="Search for users..."
                    placeholderTextColor="#808080"
                    style={styles.input}
                    onChangeText={setUserName}
                    value={userName}
                />
                {/*                 <FlatList
                    data={users.slice(0, shouldRender ? users * 20 : users.length)}
                    renderItem={renderUsers}
                    keyExtractor={(item, index) => item._id.toString() + '_' + index}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
                {isLoading && <ActivityIndicator />} */}

                <ScrollView style={styles.scrollViewContainer}>
                    {searchedUser &&
                        searchedUser.map((user) => {
                            console.log(user.avatarSmall);
                            return <FollowButton key={user._id} navigation={navigation} fullName={user.fullName} image={user.avatarSmall} />;
                        })}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

/*                         <View style={styles.searchedUserContainer} key={user._id}>
                            <Text>{user.fullName}</Text>
                            {renderState ? (
                                <Button onPress={() => unfollowHandler(user.fullName)} color="#d11d1d" title="unfollow" />
                            ) : (
                                <Button onPress={() => followHandler(user.fullName, user._id)} title="follow" />
                            )}
                        </View> */
const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingInline: 20
    },
    scrollViewContainer:{
        backgroundColor:"white"
    },
    input: {
        top: -10,
        paddingLeft: 20,
        height: 50,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: "lightgray",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    searchedUserContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default Search