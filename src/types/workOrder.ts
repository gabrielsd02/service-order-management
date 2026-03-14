export type WorkOrderStatus =
    | "Pending"
    | "In Progress"
    | "Completed"
;

export type WorkOrder = {
    id: string;
    title: string;
    description: string;
    status: WorkOrderStatus;
    assignedTo: string;
    createdAt?: Date; 
    updatedAt?: Date; 
    deletedAt?: Date;
    completed: boolean;
    deleted: boolean;
};

export type WorkOrderRealm = {
    _id: string;
    apiId?: string | null;
    title: string;
    description: string;
    status: WorkOrderStatus;
    assignedTo: string;
    createdAt?: Date; 
    updatedAt?: Date; 
    deletedAt?: Date;
    completed?: boolean;
    deleted?: boolean;
    toSync?: boolean;
}

export type SaveWorkOrderDTO = {
    id?: string;
    apiId?: string | null;
    title: string;
    description: string;
    status: WorkOrderStatus;
    assignedTo: string;
    updatedAt?: Date; 
    deletedAt?: Date;
    completed?: boolean;
    deleted?: boolean;
}

export type WorkOrderStore = Omit<WorkOrder, 'id' | 'completed' | 'deleted'> & {
    id: string | null;
    idRealm: string | null;
    completed?: boolean;
    deleted?: boolean;
};

export type WorkOrdersSyncResponse = {
    created: WorkOrder[];
    updated: WorkOrder[];
    deleted: string[];
}