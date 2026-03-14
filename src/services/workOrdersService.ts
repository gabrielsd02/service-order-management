import { SaveWorkOrderDTO, WorkOrder, WorkOrdersSyncResponse } from "../types/workOrder";
import { api } from "./api";
import { handleApiError } from "./handleApiError";

export const workOrdersService = {
    async getAll(): Promise<WorkOrder[]> {
        try {
            const { data } = await api.get("/work-orders");
            return data;
        } catch(error) {
            throw new Error(handleApiError(error));
        }
    },
    async getById(id: string): Promise<WorkOrder> {
        try {
            const { data } = await api.get(`/work-orders/${id}`);
            return data;
        } catch(error) {
            throw new Error(handleApiError(error));
        }
    },
    async create(payload: SaveWorkOrderDTO): Promise<WorkOrder> {
        try {
            const { data } = await api.post("/work-orders", payload);
            return data;
        } catch(error) {
            throw new Error(handleApiError(error));
        }
    },
    async update(payload: SaveWorkOrderDTO): Promise<WorkOrder> {
        try {
            const { data } = await api.put(`/work-orders/${payload.id!}`, payload);
            return data;
        } catch(error) {
            throw new Error(handleApiError(error));
        }
    },
    async delete(id: string) {
        try {
            const { data } = await api.delete(`/work-orders/${id}`);
            return data;
        } catch(error) {
            throw new Error(handleApiError(error));
        }
    },
    async sync(date: Date): Promise<WorkOrdersSyncResponse> {
        try {
            const { data } = await api.get("/work-orders/sync", {
                params: {
                    since: date
                }
            });
            return data;
        } catch(error) {
            throw new Error(handleApiError(error));
        }
    },
}