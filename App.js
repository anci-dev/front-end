import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './views/Home'
import { Dashboard } from './views/Dashboard'
import { Settings } from './views/Settings'
import { RepoStatus } from './views/RepoStatus'
import { BuildStatus } from './views/BuildStatus'
import globalStyle from './static/Style'

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

// From any Drawer screen, access authentication props via "props.route.params.auth"
function LandingPad(props) {
    return (
        <Drawer.Navigator initialRouteName="Dashboard"
                drawerType={Platform.OS === "web" ? "permanent" : "back"}>
            <Drawer.Screen name="Dashboard" component={Dashboard} initialParams={props.route.params}/>
            <Drawer.Screen name="RepoStatus" component={RepoStatus} initialParams={props.route.params}/>
            <Drawer.Screen name="BuildStatus" component={BuildStatus} initialParams={props.route.params}/>
            <Drawer.Screen name="Settings" component={Settings} initialParams={props.route.params}/>
        </Drawer.Navigator>
    );
}

export default function App() {

    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Login">
                <RootStack.Screen name="Login" component={Home} options={{headerShown: false}}/>
                <RootStack.Screen name="Authenticated" component={LandingPad} options={{headerShown: false}}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

// {...globalStyle, style dict specific to this component}
const styles = StyleSheet.create(globalStyle);
