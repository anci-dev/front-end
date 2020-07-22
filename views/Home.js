import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import styles from '../static/Style'
import { LoginButton } from '../Auth'
import logo from '../static/images/logo1.png'


export function Home({ navigation }) {
    // Hand off setAuth to the login handler. Have it update when oauth is over.
    const [auth, setAuth] = useState({});

    useEffect(() => {
        if(auth.success) navigation.navigate("Authenticated", {auth});
    }, [auth]);

    return (
        <View style={styles.base}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to anci!</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
                { LoginButton }
                <Image source={logo} style={styles.logo}/>
            </View>
        </View>
    );
}

// compose(globalStyle, style specific to this component)
