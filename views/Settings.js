import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { globalStyle } from '../static/Style'

export function Settings(props) {

    return (
        <View>
            <View style={globalStyle.container}>
                <Text style={globalStyle.title}>Settings!</Text>
            </View>
        </View>
    );
}
