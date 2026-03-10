import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerTitle: {
        width: '100%', 
        height: '20%', 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        gap: 12
    },
    title: {
        fontWeight: 'bold', 
        fontSize: 26
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center', 
    },
    content: {
        flex: 1, 
        alignItems: 'center', 
        paddingVertical: 10,
        justifyContent: 'space-evenly'
    },
    containerQuantityItems: {
        width: 280,
        gap: 5,
        borderWidth: 1.5,
        borderColor: 'black',
        paddingVertical: 10, 
        paddingHorizontal: 14,
        borderRadius: 5
    },
    containerQuantityItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 4,
        justifyContent: 'space-between'
    },
    textItemLabel: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textItemValue: {
        fontSize: 16,
        fontWeight: 'semibold'
    },
    button: {
        width: 280,
    },
    containerVersion: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '6%'
    },
    textVersion: {
        fontSize: 11
    }
});