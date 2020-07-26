import React, { useState, useEffect } from 'react';
import { Image, SectionList, StyleSheet, Text, View, Button, Alert } from 'react-native';
import styles from '../static/Style';
import { Backend } from '../Auth';

const Cookies = require('js-cookie');

export function RepoStatus(props) {

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

    function renderRepo(item) {
        return (
            <View style={styles.repoOverview}>
                <Image style={styles.profileImage} source={item.owner.avatar_url}/>
                <Text style={styles.repoName}>{item.name}</Text>
                <Text style={styles.fullRepoName} onPress={() => window.open(item.html_url)}>({item.full_name})</Text>
            </View>
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
