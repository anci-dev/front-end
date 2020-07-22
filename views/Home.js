import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styles from '../static/Style'
import { LoginButton } from '../Auth'
import logo from '../static/images/logo1.png'


export function Home({ navigation }) {
    return (
        <View style={styles.base}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to anci!</Text>
                { LoginButton }
                <Image source={logo} style={styles.logo}/>
            </View>
        </View>
    );
}

// compose(globalStyle, style specific to this component)
