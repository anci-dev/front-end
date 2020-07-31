import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { globalStyle, colors } from '../static/Style';
import backArrow from '../static/images/back_arrow.png'

const Cookies = require('js-cookie');

export function RepoDetails( {route, navigation} ) {
    console.log(route);
    return (
        <View style={globalStyle.base}>
            <View style={globalStyle.header}>
                <TouchableOpacity style={globalStyle.backButton} onPress={() => navigation.navigate("ReposOverview")}>
                    <Image source={backArrow} style={globalStyle.backButtonImage}/>
                </TouchableOpacity>
            </View>
            <Text style={globalStyle.title} onPress={() => window.open(route.params.repo.html_url)}>{route.params.repo.name}</Text>
            <Text style={globalStyle.title}>
                Owner:
                <Image style={globalStyle.profileImage} source={route.params.repo.owner.avatar_url}/>
                <Text style={globalStyle.title} onPress={() => window.open(route.params.repo.owner.html_url)}>{route.params.repo.owner.login}</Text>
            </Text>
        </View>
    );
}
