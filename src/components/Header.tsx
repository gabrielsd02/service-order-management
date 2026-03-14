import { StyleSheet, View } from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import TextWhite from "./TextWhite";
import Button from "./Button";

type Props = NativeStackHeaderProps & {
    title: string;
    isConnectedInternet: boolean;
};

function Header({ 
    title,
    isConnectedInternet, 
    navigation 
}: Props) {

    return (
        <View style={styles.header}>
            <Button 
                style={styles.left}
                onPress={() => navigation.goBack()}
            >
                <FontAwesomeFreeSolid 
                    name="arrow-left"
                    size={26}
                    color={'white'}
                />
            </Button>
            <View style={styles.center}>
                <TextWhite style={styles.title}>
                    {title}
                </TextWhite>
            </View>
            <View style={styles.right}>
                <FontAwesomeFreeSolid 
                    name="wifi-strong"
                    size={18}
                    color={isConnectedInternet ? 'green' : 'red'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        backgroundColor: '#222',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    left: {
        width: 70,
        height: 35,
        marginTop: 2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    center: {
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        width: 70,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20        
    }
});

export default Header;