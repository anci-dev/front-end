import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import globalStyle from '../static/Style'

export function Dashboard(props) {

    // Ensures webpage displays the correct title after auth redirection
    useEffect(() => {
        props.navigation.navigate("Dashboard");
    }, []);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Dashboard!</Text>
            </View>
        </View>
    );
}

// {...globalStyle, style dict specific to this component}
const styles = StyleSheet.compose(globalStyle);
