import { useState } from "react";
import { View } from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { styles } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import TextWhite from "../../components/TextWhite";
import Button from "../../components/Button";
import Container from "../../components/Container";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({ navigation }: Props) {
    const [amountItems, setAmountItems] = useState([
        {
            label: 'Total:',
            value: 0
        },
        {
            label: 'Pendente:',
            value: 0
        },
        {
            label: 'Em andamento:',
            value: 0
        },
        {
            label: 'Finalizadas:',
            value: 0
        }
    ]);

    return (
        <Container>
            <View style={styles.containerTitle}>
                <TextWhite style={styles.title}>
                    Gerenciamento de OS(s)
                </TextWhite>
                <TextWhite style={styles.subtitle}>
                    Visualize, crie, edite e remova ordens de serviço mesmo offline!
                </TextWhite>
            </View>
            <View style={styles.content}>
                <View style={styles.containerQuantityItems}>
                    {amountItems.map((amountItem, index) => {
                        return (
                            <View 
                                key={index} 
                                style={[
                                    styles.containerQuantityItem, 
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    { borderBottomWidth: index === amountItems.length - 1 ? 0 : 1 }
                                ]}
                            >
                                <TextWhite style={styles.textQuantityItem}>{amountItem.label}</TextWhite>
                                <TextWhite style={styles.textQuantityItem}>{amountItem.value}</TextWhite>
                            </View>
                        )
                    })}
                </View>
                <View style={{ gap: 20 }}>
                    {/* <Button
                        onPress={() => {}}
                        style={styles.button}
                    >
                        <FontAwesomeFreeSolid 
                            name="user"
                            size={20}
                            color={'white'}
                            style={{ marginTop: 1.5 }}
                        />
                        <TextWhite style={styles.textButton}>
                            Lista de técnicos
                        </TextWhite>
                    </Button> */}
                    <Button
                        onPress={() => navigation.navigate('ListWorkOrders')}
                        style={styles.button}
                    >
                        <FontAwesomeFreeSolid 
                            name="list"
                            size={20}
                            color={'white'}
                            style={{ marginTop: 1.5 }}
                        />
                        <TextWhite style={styles.textButton}>
                            Consultar OS(s)
                        </TextWhite>
                    </Button>
                </View>
            </View>
            <View style={styles.containerVersion}>
                <TextWhite style={styles.textVersion}>
                    v.1.0
                </TextWhite>
            </View>
        </Container>
    )
}

export default Home;