import { create } from "zustand";
import { WorkOrderStore } from "../types/workOrder";

type WorkOrderState = {
    workOrders: WorkOrderStore[];
    setWorkOrders: (value: WorkOrderStore[]) => void;
};

export const useWorkOrders = create<WorkOrderState>((set) => ({
    workOrders: [],
    setWorkOrders: (value) => set({ workOrders: value }),
}));