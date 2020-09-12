import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { globalStyle } from '../static/Style'
import { SyncStripeButton } from '../Auth';

export function Settings(props) {

    return (
        <View>
            <View style={globalStyle.container}>
                <Text style={globalStyle.title}>Settings!</Text>
                <SyncStripeButton/>
            </View>
        </View>
    );
}
