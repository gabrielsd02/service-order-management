import { useCallback, useState } from "react";
import { Alert, FlatList, RefreshControl, View } from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNetworkStore } from "../../store/useNetworkStore";
import { useIsLoadingState } from "../../store/useIsLoadingStore";
import { styles } from "./styles";
import { RootStackParamList } from "../../navigation";
import { useWorkOrders } from "../../store/useWorkOrders";
import { getWorkOrders } from "../../actions/workOrders/getWorkOrders";
import { WorkOrderStore } from "../../types/workOrder";
import Container from "../../components/Container";
import ItemList from "./ItemList";
import ListVoid from "./ListVoid";
import Button from "../../components/Button";

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
            
            if(orders) setWorkOrders([...orders]);
        } catch(e: any) {
            Alert.alert("Erro", e.message);
        }
    }

    const editItem = (id: string) => {
        navigation.navigate('WorkOrderForm', {
            id
        })
    }

    const handleEditItem = (item: WorkOrderStore) => {
        isConnectedInternet ?
            editItem(item.id!) :
            editItem(item.idRealm!)
        ;
    }

    useFocusEffect(
        useCallback(() => {
            loadOrders();
        }, [isConnectedInternet])
    )
    
    return (
        <Container>
            <FlatList 
                data={workOrders}
                renderItem={({ index, item }) => <ItemList 
                    key={index} 
                    item={item}
                    editItem={() => handleEditItem(item)}
                />}                
                contentContainerStyle={styles.contentContainerStyleList}
                style={styles.list}
                ListEmptyComponent={ListVoid}
                refreshControl={
                    <RefreshControl 
                        refreshing={isLoadingList}
                        onRefresh={loadOrders}
                    />
                }
            />
            <View style={styles.containerButtonRegister}>
                <Button onPress={() => navigation.navigate('WorkOrderForm')}>
                    <FontAwesomeFreeSolid 
                        name="plus-circle"
                        size={64}
                        color={'white'}
                    />
                </Button>
            </View>
        </Container>
    )
}

export default ListWorkOrders;