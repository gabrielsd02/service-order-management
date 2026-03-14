import { Alert } from "react-native";
import { workOrdersRepository } from "../../database/repositories/workOrdersRepository";
import { workOrdersService } from "../../services/workOrdersService";
import { WorkOrder } from "../../types/workOrder";

type Props = {
    orderCreate: Omit<WorkOrder, | 'id' | 'completed' | 'deleted'>;
    isConnectedInternet: boolean;
    setIsLoading: (value: boolean) => void;
}

export const createWorkWorder = async ({
    orderCreate,
    isConnectedInternet,
    setIsLoading
}: Props) => {
    setIsLoading(true);

    const orderToCreate = {
        assignedTo: orderCreate.assignedTo,
        description: orderCreate.description,
        status: 'Pending',
        title: orderCreate.title,
        createdAt: new Date(),
        updatedAt: new Date()
    } as Omit<WorkOrder, 'id'>;

    try {
        if(!isConnectedInternet) {
            const orderCreated = workOrdersRepository.create({
                ...orderToCreate,
                toSync: true
            });
            if(orderCreated) {
                const assign = Object.assign(orderToCreate, orderCreated);
                return {
                    ...assign,
                    idRealm: assign._id
                }
            };
        } else {
            const newApiOrder = await workOrdersService.create(orderToCreate);
            const { id, ...rest } = newApiOrder;

            workOrdersRepository.create({
                apiId: id,
                ...rest
            });
        }
    } catch(e: any) {
        Alert.alert("Erro", e.message);
    } finally {
        setIsLoading(false);
    }
}