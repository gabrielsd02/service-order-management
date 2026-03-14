import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        marginBottom: 10,
        flexDirection: 'row',
        gap: 10,
        overflow: 'hidden',
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: 'rgba(20, 20, 20, 0.8)',
    },
    containerCircleStatus: {
        paddingLeft: 10,
        paddingRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    circleStatus: {
        width: 34,
        height: 34,
        borderRadius: 50,
    },
    textsContainer: {
        flex: 1,
        gap: 2,
        paddingVertical: 6,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 4
    },
    description: {
        fontSize: 13,
    },
    containerIcon: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 50,
        alignItems: 'center'
    },
    containerBottomTexts: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    textBottom: {
        flexShrink: 1,
        fontSize: 13, 
        minWidth: 100,
        textAlign: 'right',
        fontStyle: 'italic'
    }
});
