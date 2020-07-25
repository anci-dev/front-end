import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import styles from '../static/Style'
import { LoginButton } from '../Auth'
import logo from '../static/images/logo1.png'

const Cookies = require('js-cookie');

export function Home({ navigation }) {
    // Hand off setAuth to the login handler. Have it update when oauth is over.
    const [auth, setAuth] = useState(Cookies.getJSON("auth") || {});

    useEffect(() => {
        if(auth.success) {
            navigation.navigate("Authenticated", {auth, setAuth});
        } else {
            navigation.navigate("Login");
            // Eventually, something should probably happen if the auth attempt is unsuccessful.
        }
    }, [auth]);

    // Smoothly display the login screen
    const fade = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(fade, {
            toValue: 1,
            duration: 750,
            easing: Easing.cubic,
        }).start();
    }, [fade]);

    return (
        <View style={styles.base}>
            <Animated.View style={[styles.base, {opacity: fade}]}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome to anci!</Text>
                    <LoginButton setAuth={setAuth} />
                    <Image source={logo} style={styles.logo}/>
                </View>
            </Animated.View>
        </View>
    );
}

// compose(globalStyle, style specific to this component)
