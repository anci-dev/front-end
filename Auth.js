import React, { useState } from 'react';
import GitHubLogin from 'react-github-login';
import PopupWindow from 'react-github-login/src/PopupWindow'
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { globalStyle } from './static/Style'

import {Elements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51HEn6TIXCgM7c7D0FeZCTyK4iem7YTi0qPoMrzIdgE290lMQXb5qAJKBclBEFFvFsHpHzHBvbmz0huG6jKz8n9d400QuKwVucA");

const Cookies = require('js-cookie');
const COOKIE_OPTIONS = {
    expires: 1, // Auth cookie expires after 1 day
}

const LocalBackend = "https://localhost:3000";
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
        console.log(event.origin);
        console.log(Backend);
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


function setUpStripe(access_token) {
    console.log(access_token);
    fetch(`${Backend}/api/createStripeCustomer`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({access_token: access_token})
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    });
}

function AddPaymentMethod(props) {
    const [processing, setProcessing] = useState(false);

    return processing ? (
        <ActivityIndicator size="large" color="#2a70f0" style={{margin: 25}}/>
    ) : (
        <TouchableOpacity style={globalStyle.buttonContainer} onPress={() => setUpStripe(props.access_token)}>
            <Text style={globalStyle.buttonText}>Set Up Account for Payments</Text>
        </TouchableOpacity>
    );
}

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

function AddPaymentMethod2(props) {
    return (
        <Elements stripe={stripePromise}>
            <View style={globalStyle.creditCardInput}>
                <CardElement options={CARD_ELEMENT_OPTIONS}/>
            </View>
        </Elements>
    );
}

export {LoginButton, Backend, AddPaymentMethod, AddPaymentMethod2};
