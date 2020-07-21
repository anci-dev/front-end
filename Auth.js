import React from 'react';
import GitHubLogin from 'react-github-login';

function onSuccess(codeResponse) {
    fetch("http://localhost:3000/auth/get_token?code=" + codeResponse.code)
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        console.log(result.access_token);
    });

}
const onFailure = response => console.error(response);

const LoginButton = (
    <GitHubLogin clientId="13f6352ecd93ee690191"
    redirectUri="http://localhost:19006/auth/github/login/return"
  onSuccess={onSuccess}
  onFailure={onFailure}/>
);

export {LoginButton};
