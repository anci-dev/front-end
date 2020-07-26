import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Animated, Easing } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './views/Home'
import { Dashboard } from './views/Dashboard'
import { Settings } from './views/Settings'
import { RepoStatus } from './views/RepoStatus'
import { BuildStatus } from './views/BuildStatus'
import styles from './static/Style'

const Cookies = require('js-cookie');
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

// From any Drawer screen, access authentication props via "props.route.params.auth"
function LandingPad(props) {
    const fade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fade, {
            toValue: 1,
            duration: 500,
            easing: Easing.cubic,
        }).start();
    }, [fade]);

    console.log(props);

    return (
        <View style={{flex: 1, backgroundColor: "#212128"}}>
            <Animated.View style={{flex: 1, opacity: fade}}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                            Cookies.remove("auth");
                            props.route.params.setAuth({});
                        }}>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
                <Drawer.Navigator initialRouteName="Repo Status"
                        drawerType={"permanent"}
                        drawerStyle={{backgroundColor: "#212128"}}
                        drawerContentOptions={{
                            activeTintColor: "#2a70f0",
                            inactiveTintColor: "#97BEE5",
                        }}>
                    <Drawer.Screen name="Dashboard" component={Dashboard} initialParams={props.route.params}/>
                    <Drawer.Screen name="Repo Status" component={RepoStatus} initialParams={props.route.params}/>
                    <Drawer.Screen name="Build Status" component={BuildStatus} initialParams={props.route.params}/>
                    <Drawer.Screen name="Settings" component={Settings} initialParams={props.route.params}/>
                </Drawer.Navigator>
            </Animated.View>
        </View>
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

// compose(globalStyle, style specific to this component)
