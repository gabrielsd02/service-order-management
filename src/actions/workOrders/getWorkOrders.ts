import { Alert } from "react-native";
import { mapApiToWorkOrder, mapRealmToWorkOrder } from "../../mappers/workOrder.mapper";
import { WorkOrderStore } from "../../types/workOrder";
import { workOrdersRepository } from "../../database/repositories/workOrdersRepository";
import { workOrdersService } from "../../services/workOrdersService";
import { workOrderFromApiToLocal } from "./workOrderFromApiToLocal";

type Props = {
    isConnectedInternet: boolean;
    setIsLoading: (value: boolean) => void;
}

export const getWorkOrders = async ({
    isConnectedInternet,
    setIsLoading
}: Props): Promise<WorkOrderStore[] | undefined> => {
    setIsLoading(true);

    try {
        if(!isConnectedInternet) {
            const localOrders = workOrdersRepository.getAll();
            return localOrders.map(mapRealmToWorkOrder);
        } else {
            const workOrdersApi = await workOrdersService.getAll();

            if(workOrdersApi?.length > 0) {
                for(const orderApi of workOrdersApi) {
                    workOrderFromApiToLocal(orderApi);
                }
            }

            return workOrdersApi.map(mapApiToWorkOrder);
        }
    } catch(e: any) {
        Alert.alert("Erro", e.message);
    } finally {
        setIsLoading(false);
    }
}