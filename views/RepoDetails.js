import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { globalStyle, colors } from '../static/Style';
import backArrow from '../static/images/back_arrow.png'
import { Backend } from '../Auth';

const Cookies = require('js-cookie');

export function RepoDetails( {route, navigation} ) {

    const [builds, setBuilds] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // use setLoading if we need to run this effect again
        // setLoading(true);
        fetch(`${Backend}/api/getBuilds?repo=${route.params.repo.id}`, {
            method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
            setBuilds(data);
            setLoading(false);
        });
    }, []);

    function renderBuild(build) {
        return (
            <View>
                <Text>{build.status}</Text>
                <Text>{build.output}</Text>
            </View>
        );
    }

    function BuildList() {
        return loading ? (
            <View style={globalStyle.container, globalStyle.base}>
                <ActivityIndicator size="large" color="#2a70f0" style={{margin: 200}}/>
            </View>
        ) : (
            <FlatList
                data={builds}
                renderItem={({item}) => renderBuild(item)}
                keyExtractor={item => item.id.toString()}
                style={globalStyle.list}
            />
        );
    }
    // Need:
    // Current status
    // Activate repo / take over payment
        // Link to stripe if no stripe account is active yet
    // List of past x builds (status, content, etc)
        // Show more builds/auto load more builds

    var status = route.params.repo.status || "Inactive";
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
                <Text>  {status}</Text>
            </Text>
            <BuildList/>
        </View>
    );
}
