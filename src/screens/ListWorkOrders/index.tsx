import { useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useNetworkStore } from "../../store/useNetworkStore";
import { useIsLoadingState } from "../../store/useIsLoadingStore";
import { styles } from "./styles";
import { workOrdersService } from "../../services/workOrdersService";
import { WorkOrder } from "../../types/workOrder";
import Container from "../../components/Container";
import ItemList from "./ItemList";
import ListVoid from "./ListVoid";

function ListWorkOrders() {
    const isConnectedInternet = useNetworkStore((state) => state.isConnectedInternet);
    const setIsLoading = useIsLoadingState((state) => state.setIsLoading);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

    const getWorkWorders = async () => {        
        workOrders.length === 0 ?
            setIsLoading(true) :
            setIsLoadingList(true)
        ;

        try {
            const response = await workOrdersService.getAll();
            setWorkOrders(response);
        } catch(e: any) {
            Alert.alert("Erro", e.message);
        } finally {
            workOrders.length === 0 ?
                setIsLoading(false) :
                setIsLoadingList(false)
            ;
        }
    }

    useEffect(() => {
        // getWorkWorders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <Container>
            <FlatList 
                data={workOrders}
                renderItem={ItemList}
                refreshing={isLoadingList}
                ListEmptyComponent={ListVoid}
                contentContainerStyle={{ flex: 1, paddingBottom: 30 }}
            />
            <View style={styles.containerButtonRegister}>
                <TouchableOpacity>
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