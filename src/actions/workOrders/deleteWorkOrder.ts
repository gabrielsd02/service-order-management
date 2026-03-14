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
            const localOrder = workOrdersRepository.getById(id);
            if(localOrder) {
                workOrdersRepository.update({
                    ...localOrder,
                    deleted: true,
                    toSync: true,
                    deletedAt: new Date()
                });
            }
        } else {
            const order = await workOrdersService.getById(id);
            if(order) {
                await workOrdersService.delete(id);

                const localOrder = workOrdersRepository.getByApiId(id);
                if(localOrder) workOrdersRepository.delete(localOrder._id);
            }
        }
    } catch(e: any) {
        Alert.alert("Erro", e.message);
    } finally {
        setIsLoading(false);
    }
}