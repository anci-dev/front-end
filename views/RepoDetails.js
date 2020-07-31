import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { globalStyle } from '../static/Style';

const Cookies = require('js-cookie');

export function RepoDetails( {route, navigation} ) {
    console.log(route);
    return (
        <View>
            <TouchableOpacity style={globalStyle.repoOverview} onPress={() => navigation.navigate("ReposOverview")}>
                <Text>Back</Text>
            </TouchableOpacity>
            <Text>{JSON.stringify(route.params.repo)}</Text>
        </View>
    );
}
