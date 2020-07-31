import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { globalStyle } from '../static/Style'

export function Dashboard(props) {

    // Ensures webpage displays the correct title after auth redirection
    useEffect(() => {
        props.navigation.navigate("Dashboard");
    }, []);


    return (
        <View>
            <View style={globalStyle.container}>
                <Text style={globalStyle.title}>Dashboard!</Text>
            </View>
        </View>
    );
}
