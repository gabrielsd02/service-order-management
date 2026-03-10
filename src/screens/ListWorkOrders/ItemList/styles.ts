import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%', height: 80, marginBottom: 10, flexDirection: 'row', gap: 10, borderRadius: 5, borderWidth: 2, backgroundColor: 'rgba(20, 20, 20, 0.8)'
    },
    containerCircleStatus: {
        paddingLeft: 10, paddingRight: 6, alignItems: 'center', justifyContent: 'center', height: '100%'
    },
    circleStatus: {
        width: 34,
        height: 34,
        borderRadius: 50,
    },
    textsContainer: {
        flex: 1, gap: 3, paddingVertical: 6, justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold', fontSize: 16, textAlign: 'left'
    },
    description: {
        fontSize: 13
    },
    containerOptions: {
        flexDirection: 'row', height: '100%', justifyContent: 'center', alignItems: 'center'
    },
    option: {
        width: 60,
        height: '100%',
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    }
});