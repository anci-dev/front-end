import React, { useState, useEffect } from 'react';
import { Image, SectionList, StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../static/Style';
import { Backend } from '../Auth';
import { ReposOverview } from './ReposOverview';
import { RepoDetails } from './RepoDetails';

const Cookies = require('js-cookie');

const RootStack = createStackNavigator();

export function RepoStatus(props) {
    return (
        <RootStack.Navigator initialRouteName="ReposOverview">
            <RootStack.Screen name="ReposOverview" component={ReposOverview} options={{headerShown: false}}/>
            <RootStack.Screen name="RepoDetails" component={RepoDetails} options={{headerShown: false}}/>
        </RootStack.Navigator>
    );
}

// {...globalStyle, style dict specific to this component}
