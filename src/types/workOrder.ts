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
}

export type SaveWorkOrderDTO = {
    id?: string;
    title: string;
    description: string;
    status: WorkOrderStatus;
    assignedTo: string;
    updatedAt?: Date; 
}

export type WorkOrderStore = Omit<WorkOrder, 'id' | 'completed' | 'deleted'> & {
    id: string | null;
    idRealm: string | null;
    completed?: boolean;
    deleted?: boolean;
};