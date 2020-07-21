import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import globalStyle from '../static/Style'

export function BuildStatus() {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Build Status!</Text>
            </View>
        </View>
    );
}

// {...globalStyle, style dict specific to this component}
const styles = StyleSheet.create(globalStyle);
