import { StyleSheet, View, ViewProps } from "react-native";

function Container({ style, ...props }: ViewProps) {
    return (
        <View 
            {...props}
            style={[styles.container, style]}  
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        padding: 8
    }
});

export default Container;