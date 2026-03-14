import AsyncStorage from "@react-native-async-storage/async-storage";
import { workOrdersRepository } from "../../database/repositories/workOrdersRepository";
import { workOrdersService } from "../../services/workOrdersService";
import { workOrderFromApiToLocal } from "./workOrderFromApiToLocal";

type Props = {
    setIsLoading: (value: boolean) => void;
}

export const syncWorkOrdersOnline = async ({
    setIsLoading
}: Props) => {
    setIsLoading(true);
    let lastSyncAt: Date;
    
    try {
        const lastSyncAtCache = await AsyncStorage.getItem('app-get-order:lastSyncAt');
        
        if(lastSyncAtCache) {        
            lastSyncAt = new Date(JSON.parse(lastSyncAtCache));
        } else {
            const now = new Date();

            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);

            lastSyncAt = new Date(yesterday);
        }
        
        const response = await workOrdersService.sync(lastSyncAt);
        
        const apiOrdersSaved = response.created.concat(response.updated);
        const apiOrdersDeleted = response.deleted;
        
        apiOrdersSaved.forEach(apiOrderSaved => {
            workOrderFromApiToLocal(apiOrderSaved);
        });

        apiOrdersDeleted.forEach(apiIdOrderDeleted => {
            const existing = workOrdersRepository.getByApiId(apiIdOrderDeleted);
            if(existing) workOrdersRepository.delete(existing._id);
        });
        
        const localOrders = workOrdersRepository.getAllToSync();
        if(!localOrders || localOrders.length === 0) return;

        const pendingCreates = localOrders.filter(order => !order.apiId && !order.deleted);
        const pendingUpdates = localOrders.filter(order => order.apiId && order.updatedAt && !order.deleted);
        const pendingDeletes = localOrders.filter(order => order.apiId && order.deleted);
        
        for(const localOrderCreated of pendingCreates) {
            const { _id, apiId, ...rest } = localOrderCreated;
            const workOrderApiCreated = await workOrdersService.create(rest);

            const { id: idApiCreated, ...payload } = workOrderApiCreated;
            workOrdersRepository.update({
                _id,
                apiId: idApiCreated,
                ...payload
            });
        }

        for(const localOrderUpdated of pendingUpdates) {
            const { _id, apiId, ...rest } = localOrderUpdated;

            if(apiId) {
                await workOrdersService.update({
                    id: apiId,
                    ...rest
                });
            }
        }

        for(const localOrderDeleted of pendingDeletes) {
            if(localOrderDeleted.apiId) {
                await workOrdersService.delete(localOrderDeleted.apiId);
                workOrdersRepository.delete(localOrderDeleted._id);
            } 
        }        

        await AsyncStorage.setItem('app-get-order:lastSyncAt', JSON.stringify(new Date().toString()))
    } catch(e) {
        console.error(e);
    } finally {
        setIsLoading(false);
    }
}