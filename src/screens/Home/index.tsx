import { useCallback, useMemo } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { RootStackParamList } from "../../navigation";
import { useWorkOrders } from "../../store/useWorkOrders";
import { useNetworkStore } from "../../store/useNetworkStore";
import { useIsLoadingState } from "../../store/useIsLoadingStore";
import { getWorkOrders } from "../../actions/workOrders/getWorkOrders";
import { useFocusEffect } from "@react-navigation/native";
import TextWhite from "../../components/TextWhite";
import Container from "../../components/Container";
import ButtonIcon from "../../components/ButtonIcon";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({ navigation }: Props) {
    const { workOrders, setWorkOrders } = useWorkOrders((state) => state);
    const setIsLoading = useIsLoadingState((state) => state.setIsLoading);
    const isConnectedInternet = useNetworkStore((state) => state.isConnectedInternet);
    
    const getTotalOrders = async () => {
        if(workOrders.length > 0) return;

        const orders = await getWorkOrders({
            isConnectedInternet,
            setIsLoading
        });

        if(!orders) return;
        setWorkOrders([...orders]);
    }

    const totals = useMemo(() => {
        let pending = 0;
        let inProgress = 0;
        let completed = 0;

        workOrders.forEach(({ status }) => {
            if(status === 'Pending') pending++;
            if(status === 'In Progress') inProgress++;
            if(status === 'Completed') completed++;
        });

        return [
            {label: "Total:", value: workOrders.length},
            {label: "Pendentes:", value: pending},
            {label: "Em progresso:", value: inProgress},
            {label: "Concluídas:", value: completed}
        ]
    }, [workOrders])

    useFocusEffect(
        useCallback(() => {
            getTotalOrders();
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
                    {totals.map((total, index) => {
                        return (
                            <View 
                                key={index} 
                                style={[
                                    styles.containerQuantityItem, 
                                    { borderBottomWidth: index === totals.length - 1 ? 0 : 1 }
                                ]}
                            >
                                <TextWhite style={styles.textItemLabel}>{total.label}</TextWhite>
                                <TextWhite style={styles.textItemValue}>{total.value}</TextWhite>
                            </View>
                        )
                    })}
                </View>
                <View style={{ gap: 20 }}>
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