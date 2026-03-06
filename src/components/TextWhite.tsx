import { Text, TextProps, StyleSheet } from "react-native";

function TextWhite({ style, ...props }: TextProps) {
    return (
        <Text 
            {...props}
            style={[styles.text, style]}
        />
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#FFF'
    }
});

export default TextWhite