import { ScrollView, View, TextField, TextInput, Text, Button, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {

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
                    userId: '64642974166b995d5d457384',
                    fullName: userName
                }),
            })
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
        follow(fullNameToAdd)
        setRenderState(prev => !prev)
    }

    const unfollowHandler = (fullNameToRemove, _id) => {
        unfollow(fullNameToRemove, _id)
        setRenderState(prev => !prev)
    }




    return (
        <>
            <SafeAreaView>
                <TextInput
                    placeholder='Search for users'
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



                {searchedUser && searchedUser.map((user) => {
                    return (
                        <View style={styles.searchedUserContainer}
                            key={user._id}>
                            <Text>{user.fullName}</Text>
                            {user.isFollowing ?
                                <Button onPress={() => unfollowHandler(user.fullName)} color="#d11d1d" title='unfollow' /> :
                                <Button onPress={() => followHandler(user.fullName, user._id)} title='follow' />}
                            <Text>{user._id}</Text>
                        </View>

                    )
                })}

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingInline: 20
    },
    input: {
        top: -10,
        paddingLeft: 20,
        height: 50,
        backgroundColor: '#fff'
    },
    searchedUserContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default Search