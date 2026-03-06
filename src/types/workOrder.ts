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
    createdAt: string; // ISODate
    updatedAt: string; // ISODate
    deletedAt?: string; // ISODate
    completed: boolean;
    deleted: boolean;
};