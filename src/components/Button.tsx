import { TouchableOpacity, TouchableOpacityProps } from "react-native";

function Button({ ...props }: TouchableOpacityProps) {
    return (
        <TouchableOpacity {...props} activeOpacity={0.5} />
    )
}

export default Button;