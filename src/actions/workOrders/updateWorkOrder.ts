import { Alert } from "react-native";
import { workOrdersRepository } from "../../database/repositories/workOrdersRepository";
import { workOrdersService } from "../../services/workOrdersService";
import { WorkOrder } from "../../types/workOrder";

type Props = {
    orderUpdate: WorkOrder;
    isConnectedInternet: boolean;
    setIsLoading: (value: boolean) => void;
}

export const updateWorkWorder = async ({
    orderUpdate,
    isConnectedInternet,
    setIsLoading
}: Props) => {
    setIsLoading(true);

    const mountOrderUpdate = {
        assignedTo: orderUpdate.assignedTo,
        description: orderUpdate.description,
        status: orderUpdate.status,
        apiId: orderUpdate.id,
        title: orderUpdate.title,
        updatedAt: new Date()
    }

    try {
        if(!isConnectedInternet) {
            const order = workOrdersRepository.getById(orderUpdate.id!);
            if(order) {
                const orderUpdateRealm = {
                    ...mountOrderUpdate,
                    _id: orderUpdate.id!,
                }
                const orderUpdated = workOrdersRepository.update(orderUpdateRealm);
                if(orderUpdated) return Object.assign(orderUpdateRealm, orderUpdated);
            }
        } else {
            const orderUpdateApi = {
                ...mountOrderUpdate,
                id: orderUpdate.id!
            };
            await workOrdersService.update(orderUpdateApi);
        }
    } catch(e: any) {
        Alert.alert("Erro", e.message);
    } finally {
        setIsLoading(false);
    }
}