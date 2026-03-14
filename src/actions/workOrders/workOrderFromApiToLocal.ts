import { workOrdersRepository } from "../../database/repositories/workOrdersRepository";
import { getLastDateOrder } from "../../functions";
import { WorkOrder, WorkOrderRealm } from "../../types/workOrder";

export const workOrderFromApiToLocal = (apiOrder: WorkOrder) => {
    let newWorkOrder: WorkOrderRealm;
    const localWorkOrder = workOrdersRepository.getByApiId(apiOrder.id);

    const { id, ...rest } = apiOrder;
    
    if(!localWorkOrder) {
        newWorkOrder = workOrdersRepository.create({
            apiId: id,
            ...rest
        });
    } else if(localWorkOrder && apiOrder.deleted) {        
        workOrdersRepository.delete(localWorkOrder._id);
        return;
    } else {
        const workOrderApi = rest;

        const lastDateOrderApi = getLastDateOrder(workOrderApi);
        const lastDateOrderLocal = getLastDateOrder(localWorkOrder);
        
        const isApiMostCurrent = lastDateOrderApi > lastDateOrderLocal;
        const workOrderToUpdate = (
            isApiMostCurrent
                ? workOrderApi 
                : localWorkOrder
        );

        newWorkOrder = workOrdersRepository.update({
            _id: localWorkOrder._id,
            apiId: id,
            toSync: !isApiMostCurrent,
            ...workOrderToUpdate
        });
    }

    return newWorkOrder;
}