import { StyleSheet, TextStyle, TouchableOpacityProps } from "react-native";
import { FontAwesomeFreeSolid, FontAwesomeFreeSolidIconName } from "@react-native-vector-icons/fontawesome-free-solid";
import { IconProps } from '@react-native-vector-icons/common';
import TextWhite from "./TextWhite";
import Button from "./Button";

type Props = TouchableOpacityProps & {
    text: string
    iconProps: IconProps<FontAwesomeFreeSolidIconName>;
    textStyle?: TextStyle | TextStyle[]
}

function ButtonIcon({ 
    text,
    textStyle,
    iconProps,
    ...props
}: Props) {
    return (
        <Button 
            {...props}
            style={[styles.button, props.style]}
        >
            <FontAwesomeFreeSolid
                color={'white'}
                {...iconProps}
            />
            <TextWhite style={[styles.textButton, textStyle]}>
                {text}
            </TextWhite>
        </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        gap: 10,
        paddingVertical: 10, 
        paddingHorizontal: 14,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    textButton: {
        fontSize: 18, 
        textAlign: 'right', 
        fontWeight: 'bold'
    }
});

export default ButtonIcon;