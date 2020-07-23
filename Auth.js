import React, { useState } from 'react';
import GitHubLogin from 'react-github-login';
import PopupWindow from 'react-github-login/src/PopupWindow'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './static/Style'

const Cookies = require('js-cookie');
const COOKIE_OPTIONS = {
    expires: 1, // Auth cookie expires after 1 day
}

const LocalBackend = "http://localhost:3000";
const RemoteBackend = "https://ancitesting.herokuapp.com";

function getAuth(setAuth, setProcessing) {
    setProcessing(true);

    // List scopes as space-delimited values
    const scopes = "scope=repo";
    const query = `client_id=13f6352ecd93ee690191&redirectUri=${window.location.origin.indexOf("localhost") > -1 ? LocalBackend : RemoteBackend}/auth/get_code`
    const url = `https://github.com/login/oauth/authorize?${query}&${scopes}`;
    const tab = window.open(url);

    // add listener to recieve messages
    window.addEventListener("message", recieveMessage, false);

    function recieveMessage(event) {
        if (event.origin !== (window.location.origin.indexOf("localhost") > -1 ? LocalBackend : RemoteBackend)) {
            console.log("Wrong domain!");
        } else {
            tab.close();
            // close listener when message recieved
            window.removeEventListener("message", recieveMessage, false);

            // Store auth data. Propagate the change directly and store it for later.
            let auth = {...JSON.parse(event.data), success: true};
            Cookies.set("auth", auth, COOKIE_OPTIONS);
            console.log(auth);
            setAuth(auth);
            setProcessing(false);
        }
    }
}

function logout(setAuth) {
    // technically a successful logout?
    // may want a new variable to represent login/out status?
    setAuth({success: false});
    Cookies.remove("auth");
    console.log("Logout!");
}

function LoginButton(props) {
    const [processing, setProcessing] = useState(false);

    return processing ? (
        <ActivityIndicator size="large" color="#2a70f0" style={{margin: 25}}/>
    ) : (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => getAuth(props.setAuth, setProcessing)}>
            <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
    );
}

function LogoutButton(props) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => logout(props.setAuth)}>
            <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
    );
}

export {LoginButton, LogoutButton};
