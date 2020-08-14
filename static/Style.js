import { StyleSheet } from 'react-native';

const colors = {
    base: '#212128',
    baseDark: '#09090E',
    contrast: '#97BEE5',
    highlight: '#2a70f0',
}

const styles = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        height: 54,
        width: "100%",
        backgroundColor: colors.baseDark,
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        color: colors.contrast,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.contrast,
    },
    text: {
        fontSize: 18,
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
    logoutButton: {
        backgroundColor: colors.highlight,
        position: "absolute",
        left: 20,
        bottom: 20,
        zIndex: 1,
    },
    backButton: {
        backgroundColor: colors.base,
        borderColor: colors.baseDark,
        borderWidth: 2,
        marginRight: "auto",
    },
    backButtonImage: {
        height: 30,
        width: 50,
        resizeMode: "contain",
        margin: 10,
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
        resizeMode: "cover",
        margin: 10,
    },
    listItem: {
        borderColor: colors.contrast,
        borderTopWidth: 1,

        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    },
};

const globalStyle = StyleSheet.create(styles);

export {globalStyle, colors};
