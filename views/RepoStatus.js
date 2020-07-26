import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ReposOverview } from './ReposOverview';
import { RepoDetails } from './RepoDetails';

const RootStack = createStackNavigator();

export function RepoStatus(props) {
    console.log(props);
    return (
        <RootStack.Navigator initialRouteName="ReposOverview">
            <RootStack.Screen name="ReposOverview" component={ReposOverview} initialParams={props.route.params} options={{headerShown: false}}/>
            <RootStack.Screen name="RepoDetails" component={RepoDetails} initialParams={props.route.params}/>
        </RootStack.Navigator>
    );
}
