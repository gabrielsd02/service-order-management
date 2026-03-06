import { StyleSheet, View, ViewProps } from "react-native";

function Overlay({ style, ...props }: ViewProps) {
    return (
        <View 
            {...props}
            style={[styles.overlay, style]}  
        />
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 10,
    }
});

export default Overlay;