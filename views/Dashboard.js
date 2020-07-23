import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import globalStyle from '../static/Style'
import { LogoutButton } from '../Auth'

const Cookies = require('js-cookie');

export function Dashboard(props) {
    // Logout Logic
    const [auth, setAuth] = useState(Cookies.getJSON("auth") || {});
    useEffect(() => {
        if(!auth.success) props.navigation.navigate("Login", {auth});
        // Eventually, something should probably happen if the auth attempt is unsuccessful.
    }, [auth]);

    // Ensures webpage displays the correct title after auth redirection
    useEffect(() => {
        props.navigation.navigate("Dashboard");
    }, []);


    fetch("https://api.github.com/user/repos", {
        method: "GET",
        headers: {
            "Authorization": `token ${props.route.params.auth.access_token}`,
        }
    })
    .then(resp => resp.json())
    .then(data => console.log(data));

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Dashboard!</Text>
                <LogoutButton setAuth={setAuth}/>
            </View>
        </View>
    );
}

// {...globalStyle, style dict specific to this component}
const styles = StyleSheet.compose(globalStyle);
