import { StyleSheet } from 'react-native';

const colors = {
    base: '#212128',
    contrast: '#97BEE5',
    highlight: '#2a70f0',
}

const globalStyle = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        color: colors.contrast,
    },
    base: {
        backgroundColor: colors.base,
        height: "100%",
    },
    buttonContainer: {
        backgroundColor: colors.highlight,
    },
    buttonText: {
        margin: 4,
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
        fontWeight: "bold",
        color: colors.base,
        borderWidth: 4,
        borderColor: colors.base,
    },
    logo: {
        height: 450,
        width: 150,
        resizeMode: "contain",
    },
    list: {
        height: "100%",
        width: "100%",
        padding: 15
    },
    profileImage: {
        height: 50,
        width: 50,
        resizeMode: "contain",
        borderRightWidth: 2,
    },
    repoOverview: {
        backgroundColor: colors.contrast,
        borderColor: colors.base,
        borderWidth: 2,
        marginTop: 5,

        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    },
    repoName: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,

        color: colors.base,
    },
    fullRepoName: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: "auto",
        marginRight: 10,

        color: colors.base,
    }
};

export default StyleSheet.create(globalStyle);
