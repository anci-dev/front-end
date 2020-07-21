import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import globalStyle from '../static/Style'
import { LoginButton } from '../Auth'
import logo from '../static/images/logo1.png'


export function Home({ navigation }) {
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
const styles = StyleSheet.create(globalStyle);