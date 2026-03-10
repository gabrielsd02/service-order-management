import { Alert } from "react-native";
import { workOrdersRepository } from "../../database/repositories/workOrdersRepository";
import { workOrdersService } from "../../services/workOrdersService";

type Props = {
    id: string;
    isConnectedInternet: boolean;
    setIsLoading: (value: boolean) => void;
}

export const getWorkOrderByid = async ({
    id,
    isConnectedInternet,
    setIsLoading
}: Props) => {
    setIsLoading(true);

    try {
        if(!isConnectedInternet) {
            const localOrder = workOrdersRepository.getById(id);
            if(localOrder) return localOrder;
        } else {
            const response = await workOrdersService.getById(id);
            return response;
        }
    } catch(e: any) {
        Alert.alert("Erro", e.message);
    } finally {
        setIsLoading(false);
    }
}