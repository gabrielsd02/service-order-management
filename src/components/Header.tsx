import { StyleSheet, View } from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import TextWhite from "./TextWhite";
import Button from "./Button";

type Props = NativeStackHeaderProps & {
    title: string;
};

function Header({ title, navigation }: Props) {
    return (
        <View style={styles.header}>
            <Button 
                style={styles.containerIcone}
                onPress={() => navigation.goBack()}
            >
                <FontAwesomeFreeSolid 
                    name="arrow-left"
                    size={26}
                    color={'white'}
                />
            </Button>
            <TextWhite style={styles.title}>
                {title}
            </TextWhite>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#222',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    containerIcone: {
        left: 30,
        height: '100%',
        paddingTop: 5,
        position: 'absolute',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default Header;