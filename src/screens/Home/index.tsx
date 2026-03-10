import { useCallback, useState } from "react";
import { View } from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { RootStackParamList } from "../../navigation";
import { useWorkOrders } from "../../store/useWorkOrders";
import { useNetworkStore } from "../../store/useNetworkStore";
import { useIsLoadingState } from "../../store/useIsLoadingStore";
import { getWorkOrders } from "../../actions/workOrders/getWorkOrders";
import TextWhite from "../../components/TextWhite";
import Button from "../../components/Button";
import Container from "../../components/Container";
import ButtonIcon from "../../components/ButtonIcon";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({ navigation }: Props) {
    const { workOrders, setWorkOrders } = useWorkOrders((state) => state);
    const setIsLoading = useIsLoadingState((state) => state.setIsLoading);
    const isConnectedInternet = useNetworkStore((state) => state.isConnectedInternet);

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

    const changeAmount = async () => {
        const orders = await getWorkOrders({
            isConnectedInternet,
            setIsLoading
        });
        if(!orders) return;

        let total = orders.length;
        let pending = 0;
        let inProgress = 0;
        let completed = 0;

        orders.forEach(({ status }) => {
            if(status === 'Pending') {
                pending += 1;
            } else if(status === 'In Progress') {
                inProgress += 1;
            } else if(status === 'Completed') {
                completed += 1;
            }
        });

        setAmountItems([
            { label: 'Total:', value: total },
            { label: 'Pendente:', value: pending },
            { label: 'Em andamento:', value: inProgress },
            { label: 'Finalizadas:', value: completed }
        ]);
        setWorkOrders(orders);
    }

    useFocusEffect(
        useCallback(() => {
            changeAmount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isConnectedInternet, workOrders])
    )
    
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
                                <TextWhite style={styles.textItemLabel}>{amountItem.label}</TextWhite>
                                <TextWhite style={styles.textItemValue}>{amountItem.value}</TextWhite>
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
                    <ButtonIcon
                        onPress={() => navigation.navigate('ListWorkOrders')}
                        style={styles.button}
                        text="Consultar OS(s)"
                        iconProps={{
                            name: 'list',
                            size: 20,
                            style: { 
                                marginTop: 2 
                            }
                        }}
                    />
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