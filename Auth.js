import React from 'react';
import GitHubLogin from 'react-github-login';
import PopupWindow from 'react-github-login/src/PopupWindow'
import { TouchableOpacity, Text } from 'react-native';
import styles from './static/Style'

function getAuth() {
    const query = "client_id=13f6352ecd93ee690191&redirectUri=http://localhost:3000/auth/get_code"
    const url = "https://github.com/login/oauth/authorize?" + query;
    const tab = window.open(url);

    // add listener to recieve messages
    window.addEventListener("message", recieveMessage, false);

    function recieveMessage(event) {
        if (event.origin !== "http://localhost:3000") {
            console.log("Wrong domain!");

        } else {
            console.log(event.data);
            tab.close();
            // close listener when message recieved
            window.removeEventListener("message", recieveMessage, false);

            // add hooks here: we have our auth stored in event.data!
        }
    }
}

const LoginButton = (
    <TouchableOpacity style={styles.buttonContainer} onPress={getAuth}>
        <Text style={styles.buttonText}>Log in</Text>
    </TouchableOpacity>
);

export {LoginButton};
