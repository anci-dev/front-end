import React, { useState, useEffect } from 'react';
import { Image, FlatList, StyleSheet, Text, View, Button, Alert } from 'react-native';
import styles from '../static/Style'

export function RepoStatus(props) {

    function renderRepo( {item} ) {
        // console.log(item);

        return (
            <View style={styles.repoOverview}>
                <Image style={styles.profileImage} source={item.owner.avatar_url}/>
                <Text style={styles.repoName}>{item.name}</Text>
                <Text style={styles.repoName} onPress={() => window.open(item.html_url)}>({item.full_name})</Text>
            </View>
        );
    }

    const [ repos, setRepos ] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/user/repos", {
            method: "GET",
            headers: {
                "Authorization": `token ${props.route.params.auth.access_token}`,
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            setRepos(data);
        });
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Repo Status!</Text>
            <FlatList
                data={repos}
                renderItem={renderRepo}
                keyExtractor={item => item.id.toString()}
                style={styles.list}
            />
        </View>
    );
}

// {...globalStyle, style dict specific to this component}
