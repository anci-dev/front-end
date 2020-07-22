import React from 'react';
import GitHubLogin from 'react-github-login';
import PopupWindow from 'react-github-login/src/PopupWindow'
import { TouchableOpacity, Text } from 'react-native';
import styles from './static/Style'


function getAuth(setAuth) {
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

            // add hooks here
            setAuth({...JSON.parse(event.data), success: true});
        }
    }
}

function LoginButton(props) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => getAuth(props.setAuth)}>
            <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
    );
}


export {LoginButton};
