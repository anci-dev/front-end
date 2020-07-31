import React, { useState } from 'react';
import GitHubLogin from 'react-github-login';
import PopupWindow from 'react-github-login/src/PopupWindow'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { globalStyle } from './static/Style'

const Cookies = require('js-cookie');
const COOKIE_OPTIONS = {
    expires: 1, // Auth cookie expires after 1 day
}

const LocalBackend = "http://localhost:3000";
const RemoteBackend = "https://ancitesting.herokuapp.com";
const Backend = window.location.origin.indexOf("localhost") > -1 ? LocalBackend : RemoteBackend;

function getAuth(setAuth, setProcessing) {
    setProcessing(true);

    // List scopes as space-delimited values
    const scopes = "scope=repo";
    const query = `client_id=13f6352ecd93ee690191&redirectUri=${Backend}/auth/get_code`
    const url = `https://github.com/login/oauth/authorize?${query}&${scopes}`;
    const tab = window.open(url);

    // add listener to recieve messages
    window.addEventListener("message", recieveMessage, false);

    function recieveMessage(event) {
        if (event.origin !== Backend) {
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

    // watch for aborted login attempts
    // might not be possible to catch users who navigate to a different page...
    var checkLoginState = setInterval(() => {
        try {
            if (!tab || tab.closed !== false) {
                setProcessing(false);
                clearInterval(checkLoginState);
            }
        } catch (error) {

        }
    }, 500);


}

function LoginButton(props) {
    const [processing, setProcessing] = useState(false);

    return processing ? (
        <ActivityIndicator size="large" color="#2a70f0" style={{margin: 25}}/>
    ) : (
        <TouchableOpacity style={globalStyle.buttonContainer} onPress={() => getAuth(props.setAuth, setProcessing)}>
            <Text style={globalStyle.buttonText}>Log in</Text>
        </TouchableOpacity>
    );
}

export {LoginButton, Backend};
