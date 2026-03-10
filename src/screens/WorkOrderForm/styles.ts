import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    list: {
        marginBottom: 10
    },
    containerForm: {
        gap: 16,
        padding: 10,
        paddingTop: 4
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        width: 145
    },
    buttonSelect: {
        justifyContent: 'flex-start',
        width: '100%',
        paddingVertical: 12,
        borderWidth: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderRadius: 0,
    },
    textStyleButtonSelect: {
        textAlign: 'left',        
        marginLeft: 10,
        fontSize: 16,
    },
    containerButtonsSelect: {
        width: '100%', 
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: 'black',
        borderRadius: 6,
        borderWidth: 3,
        borderBottomWidth: 3,
        marginTop: -8
    },
    containerButtonTrash: {
        width: '100%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        paddingRight: 10,
        paddingTop: 4,
    },
    buttonTrash: {
        width: 42, 
        height: 42, 
        borderRadius: 100, 
        borderWidth: 1, 
        alignItems: 'center', 
        justifyContent:'center', 
        borderColor: 'white'
    }
});