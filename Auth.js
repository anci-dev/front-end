import React, { useState } from 'react';
import GitHubLogin from 'react-github-login';
import PopupWindow from 'react-github-login/src/PopupWindow'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './static/Style'

const Cookies = require('js-cookie');
const COOKIE_OPTIONS = {
    expires: 1, // Auth cookie expires after 1 day
}

function getAuth(setAuth, setProcessing) {
    setProcessing(true);

    const query = "client_id=13f6352ecd93ee690191&redirectUri=http://localhost:3000/auth/get_code"
    const url = "https://github.com/login/oauth/authorize?" + query;
    const tab = window.open(url);

    // add listener to recieve messages
    window.addEventListener("message", recieveMessage, false);

    function recieveMessage(event) {
        if (event.origin !== "http://localhost:3000") {
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


export {LoginButton};
