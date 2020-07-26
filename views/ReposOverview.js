import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, SectionList, StyleSheet, Text, View, Button, Alert } from 'react-native';
import styles from '../static/Style';
import { Backend } from '../Auth';

const Cookies = require('js-cookie');

export function ReposOverview({ navigation, props }) {

    function reposWithCI(data) {
        var hasCI = [];
        for (var repo of data) {
            if (repo.integrated) {
                hasCI.push(repo);
            }
        }
        return hasCI;
    }

    // separate function instead of some clever combo w/ reposWithCI
    // for clarity and future potential sections
    function reposWithoutCI(data) {
        var noCI = [];
        for (var repo of data) {
            if (!repo.integrated) {
                noCI.push(repo);
            }
        }
        return noCI;
    }

    function renderRepo(repo) {
        return (
            <TouchableOpacity style={styles.repoOverview} onPress={() => navigation.navigate("RepoDetails", {repo})}>
                <Image style={styles.profileImage} source={repo.owner.avatar_url}/>
                <Text style={styles.repoName}>{repo.name}</Text>
                <Text style={styles.fullRepoName} onPress={() => window.open(repo.html_url)}>({repo.full_name})</Text>
            </TouchableOpacity>
        );
    }

    const [ repos, setRepos ] = useState([]);

    useEffect(() => {
        fetch(`${Backend}/db/repo_status?access_token=${Cookies.getJSON("auth").access_token}`, {
            method: "GET",
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
            <SectionList
                renderItem={({item}) => renderRepo(item)}
                keyExtractor={item => item.id.toString()}
                style={styles.list}

                renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.title}>{title}</Text>
                )}
                sections={[
                    { title: 'Repos with CI (currently randomly determined in anci db.js)', data: reposWithCI(repos) },
                    { title: 'Repos without CI', data: reposWithoutCI(repos) },
                ]}
            />
        </View>
    );
}

// {...globalStyle, style dict specific to this component}
