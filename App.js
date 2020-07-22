import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './views/Home'
import { Dashboard } from './views/Dashboard'
import { Settings } from './views/Settings'
import { RepoStatus } from './views/RepoStatus'
import { BuildStatus } from './views/BuildStatus'

const Stack = createStackNavigator();


export default function App() {
    var loggedIn = false;
    if (loggedIn) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Dashboard">
                    <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}/>
                    <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
                    <Stack.Screen name="RepoStatus" component={RepoStatus} options={{headerShown: false}}/>
                    <Stack.Screen name="BuildStatus" component={BuildStatus} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

// compose(globalStyle, style specific to this component)
