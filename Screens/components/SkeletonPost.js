import React from 'react';
import { View, StyleSheet } from 'react-native';


const SkeletonPost = () => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarSkeleton} />
            <View style={styles.contentSkeleton} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
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
});

export default SkeletonPost;