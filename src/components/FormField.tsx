import { 
    View,
    TextInput, 
    ViewStyle,
    TextStyle,
    TextInputProps,
    StyleSheet, 
} from "react-native";
import TextWhite from "./TextWhite";

type Props = TextInputProps & {
    label?: string
    containerStyle?: ViewStyle
    labelStyle?: TextStyle
}

function FormField({ 
    label,
    labelStyle,
    containerStyle,
    ...props
}: Props) {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <TextWhite style={[styles.label, labelStyle]}>
                    {label}
                </TextWhite>
            )}
            <TextInput 
                placeholderTextColor={'#bbb'}
                textAlignVertical="center"
                {...props}
                style={[styles.input, props?.style ?? {}]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 6,
        height: 'auto'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        color: 'white',
        borderWidth: 1.5,
        borderColor: '#888888',
        borderRadius: 6,
        minHeight: 48,
        fontSize: 14,
        paddingHorizontal: 10
    }
});

export default FormField;