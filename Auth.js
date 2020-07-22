import React from 'react';
import GitHubLogin from 'react-github-login';
import PopupWindow from 'react-github-login/src/PopupWindow'
import { TouchableOpacity, Text } from 'react-native';
import styles from './static/Style'

function callBackend(codeResponse) {
    fetch("http://localhost:3000/auth/get_token?code=" + codeResponse.code)
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        console.log(result.access_token);
    });
    // todo error catching
}

// Pulled code from react-github-logic/src/GitHubLogin.js
// in order to implement PopupWindow so that a custom button
// could trigger a new PopupWindow
function getCode() {
    console.log("here");
    const query = "client_id=13f6352ecd93ee690191&redirectUri=http://localhost:3000/auth/get_code"

    window.open("https://github.com/login/oauth/authorize?" + query);


    // const popup = PopupWindow.open(
    //     'github-oauth-authorize',
    //     'https://github.com/login/oauth/authorize?' + query,
    //     { height: 1000, width: 600 }
    // );
    //
    // popup.then(
    //     data => console.log(data),
    //     error => console.log(error)
    // );

    // fetch("https://github.com/login/oauth/authorize?client_id=13f6352ecd93ee690191&redirectUri=http://localhost:19006/auth/github/login/return")
    // .then(response => response.json())
    // .then(result => {
    //     console.log('Success:', result);
    // });
    // todo error catching
}
const onFailure = response => console.error(response);

const LoginButton = (
    <TouchableOpacity style={styles.buttonContainer} onPress={getCode}>
        <Text style={styles.buttonText}>Log in</Text>
    </TouchableOpacity>
  //   <GitHubLogin clientId="13f6352ecd93ee690191"
  //   redirectUri="http://localhost:19006/auth/github/login/return"
  // onSuccess={callBackend}
  // onFailure={onFailure}/>
);

export {LoginButton};
