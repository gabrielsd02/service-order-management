import { StyleSheet, View } from "react-native";
import TextWhite from "../../components/TextWhite";

function ListVoid() {

    return (
        <View style={styles.container}>
            <TextWhite style={styles.text}>
                Nenhuma ordem de serviço foi encontrada.                
            </TextWhite>
            <TextWhite style={styles.text}>
                Cadastre para aparecer aqui!
            </TextWhite>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'semibold',
        textAlign: 'center',
        fontSize: 15
    }
});

export default ListVoid;