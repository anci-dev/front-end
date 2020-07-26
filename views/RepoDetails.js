import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import styles from '../static/Style';

const Cookies = require('js-cookie');

export function RepoDetails(props) {
    return (
        <Text>{JSON.stringify(props.route.params.repo)}</Text>
    );
}
