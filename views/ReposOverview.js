import React, { useReducer, useEffect } from 'react';
import { TouchableOpacity, Image, SectionList, StyleSheet, Text, View, Button, Alert, ActivityIndicator } from 'react-native';
import { globalStyle } from '../static/Style';
import { Backend } from '../Auth';

export function ReposOverview({ navigation, route }) {

    const [repoData, dispatchRepoData] = useReducer((state, {type, data}) => {
        switch(type) {
            case "set":
                return {
                    repos: data,
                    loading: false
                }

            case "unload":
                return {
                    repos: [],
                    loading: true
                }

            default:
                return state;
        }
    }, {
        repos: [],
        loading: true,
    });

    // separate function instead of some clever combo w/ reposWithCI
    // for clarity and future potential sections
    const reposWithoutCI = data => data.filter(({integrated}) => !integrated);
    const reposWithCI = data => data.filter(({integrated}) => integrated);

    function renderRepo(repo) {
        return (
            <TouchableOpacity style={globalStyle.listItem} onPress={() => navigation.navigate("RepoDetails", {repo})}>
                <Image style={globalStyle.profileImage} source={repo.owner.avatar_url}/>
                <View>
                    <Text style={globalStyle.subtitle}>{repo.name}</Text>
                    <Text style={globalStyle.text}>{repo.owner.login}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        // Ignore the loading update which sets it to false
        if(!repoData.loading) return;
        fetch(`${Backend}/api/getAllRepos?access_token=${route.params.auth.access_token}`, {
            method: "GET",
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            dispatchRepoData({
                type: "set",
                data
            });
        });
    }, [repoData.loading]);

    return repoData.loading ? (
        <View style={globalStyle.container, globalStyle.base}>
            <ActivityIndicator size="large" color="#2a70f0" style={{margin: 200}}/>
        </View>
    ) : (
        <View style={globalStyle.container, globalStyle.base}>
            <SectionList
                renderItem={({item}) => renderRepo(item)}
                keyExtractor={item => item.id.toString()}
                style={globalStyle.list}

                renderSectionHeader={({ section: { title } }) => (
                <Text style={globalStyle.title}>{title}</Text>
                )}
                sections={[
                    { title: 'Repos with CI', data: reposWithCI(repoData.repos) },
                    { title: 'Repos without CI', data: reposWithoutCI(repoData.repos) },
                ]}
            />
        </View>
    );
}

// {...globalStyle, style dict specific to this component}
