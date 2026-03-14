import { Alert } from "react-native";
import { workOrdersRepository } from "../../database/repositories/workOrdersRepository";
import { workOrdersService } from "../../services/workOrdersService";
import { WorkOrder } from "../../types/workOrder";
import { workOrderFromApiToLocal } from "./workOrderFromApiToLocal";

type Props = {
    orderUpdate: WorkOrder & { apiId?: string };
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
        title: orderUpdate.title,
        updatedAt: new Date()
    }

    try {
        if(!isConnectedInternet) {
            const order = workOrdersRepository.getById(orderUpdate.id!);
            if(order) {
                const orderUpdateRealm = {
                    ...mountOrderUpdate,
                    apiId: order.apiId ? order.apiId : orderUpdate.apiId,
                    _id: orderUpdate.id!,
                    toSync: true
                }
                const orderUpdated = workOrdersRepository.update(orderUpdateRealm);
                if(orderUpdated) return Object.assign(orderUpdateRealm, orderUpdated);
            }
        } else {
            const orderUpdateApi = {
                ...mountOrderUpdate,
                id: orderUpdate.id!
            };
            const workOrderApiUpdated = await workOrdersService.update(orderUpdateApi);
 
            if(workOrderApiUpdated) {
                workOrderFromApiToLocal(workOrderApiUpdated);
            }
        }
    } catch(e: any) {
        Alert.alert("Erro", e.message);
    } finally {
        setIsLoading(false);
    }
}