import { Alert } from "react-native";
import { workOrdersRepository } from "../../database/repositories/workOrdersRepository";
import { workOrdersService } from "../../services/workOrdersService";

type Props = {
    id: string;
    isConnectedInternet: boolean;
    setIsLoading: (value: boolean) => void;
}

export const deleteWorkWorder = async ({
    id,
    isConnectedInternet,
    setIsLoading
}: Props) => {
    setIsLoading(true);

    try {
        if(!isConnectedInternet) {
            const order = workOrdersRepository.getById(id);
            if(order) {
                workOrdersRepository.update({
                    ...order,
                    deleted: true,
                    deletedAt: new Date()
                });
            }
        } else {
            const order = await workOrdersService.getById(id);
            if(order) {
                await workOrdersService.delete(id);
            }
        }
    } catch(e: any) {
        Alert.alert("Erro", e.message);
    } finally {
        setIsLoading(false);
    }
}