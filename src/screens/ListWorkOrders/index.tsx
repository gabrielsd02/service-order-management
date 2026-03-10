import { useCallback, useState } from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNetworkStore } from "../../store/useNetworkStore";
import { useIsLoadingState } from "../../store/useIsLoadingStore";
import { styles } from "./styles";
import { RootStackParamList } from "../../navigation";
import { useWorkOrders } from "../../store/useWorkOrders";
import { getWorkOrders } from "../../actions/workOrders/getWorkOrders";
import Container from "../../components/Container";
import ItemList from "./ItemList";
import ListVoid from "./ListVoid";

type ListWorkOrdersProps = NativeStackScreenProps<RootStackParamList, 'ListWorkOrders'>;

function ListWorkOrders({ navigation }: ListWorkOrdersProps) {
    const { workOrders, setWorkOrders } = useWorkOrders((state) => state);
    const isConnectedInternet = useNetworkStore((state) => state.isConnectedInternet);
    const setIsLoading = useIsLoadingState((state) => state.setIsLoading);
    
    const [isLoadingList, setIsLoadingList] = useState(false);
    
    const loadOrders = async () => {
        try {
            const orders = await getWorkOrders({
                isConnectedInternet,
                setIsLoading: workOrders.length === 0 
                    ? setIsLoading
                    : setIsLoadingList
            });
            if(orders) setWorkOrders(orders);
        } catch(e: any) {
            Alert.alert("Erro", e.message);
        }
    }

    const editItem = (id: string) => {
        navigation.navigate('WorkOrderForm', {
            id
        })
    }

    useFocusEffect(
        useCallback(() => {
            loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isConnectedInternet])
    )
    
    return (
        <Container>
            <FlatList 
                data={workOrders}
                renderItem={(props) => <ItemList 
                    key={props.index} 
                    item={props.item}
                    editItem={() => editItem(props.item.id ? props.item.id : props.item.idRealm!)}
                    deleteItem={() => {}}
                />}
                refreshing={isLoadingList}
                ListEmptyComponent={ListVoid}
                contentContainerStyle={{ flex: 1, paddingBottom: 30, paddingTop: 10 }}
            />
            <View style={styles.containerButtonRegister}>
                <TouchableOpacity 
                    activeOpacity={0.5} 
                    onPress={() => navigation.navigate('WorkOrderForm')}
                >
                    <FontAwesomeFreeSolid 
                        name="plus-circle"
                        size={62}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default ListWorkOrders;