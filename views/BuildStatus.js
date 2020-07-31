import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { globalStyle } from '../static/Style'

export function BuildStatus(props) {

    return (
        <View>
            <View style={globalStyle.container}>
                <Text style={globalStyle.title}>Build Status!</Text>
            </View>
        </View>
    );
}
