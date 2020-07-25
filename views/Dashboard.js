import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import globalStyle from '../static/Style'

export function Dashboard(props) {

    // Ensures webpage displays the correct title after auth redirection
    useEffect(() => {
        props.navigation.navigate("Dashboard");

        fetch("https://api.github.com/user/repos", {
            method: "GET",
            headers: {
                "Authorization": `token ${props.route.params.auth.access_token}`,
            }
        })
        .then(resp => resp.json())
        .then(data => console.log(data));
    }, []);


    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Dashboard!</Text>
            </View>
        </View>
    );
}

// {...globalStyle, style dict specific to this component}
const styles = StyleSheet.compose(globalStyle);
