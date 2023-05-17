import React from 'react';
import { View, StyleSheet } from 'react-native';


const SkeletonPost = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.avatarSkeleton} />
                    <View style={styles.textLineContainer}>
                        <View style={styles.textLine} />
                        <View style={styles.textLine} />
                    </View>
                </View>
                <View style={styles.contentSkeleton} />
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
        marginBottom: 30
    },
    avatarSkeleton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0E0E0',
        marginRight: 10,

    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    textLineContainer: {
        gap: 10,
    },
    textLine: {
        width: 250,
        height: 15,
        backgroundColor: '#E0E0E0',
        marginRight: 10,
        borderRadius: 7.5
    },
    contentSkeleton: {
        flex: 1,
        height: 300,
        width: 350,
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});

export default SkeletonPost;