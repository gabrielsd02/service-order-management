import { WorkOrder, WorkOrderRealm } from "../types/workOrder";

export function mapApiToWorkOrder(r: WorkOrder) {
    return {
        id: r.id ?? null,
        idRealm: null,
        title: r.title,
        description: r.description,
        status: r.status,
        assignedTo: r.assignedTo,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
        deletedAt: r.deletedAt,
        completed: r.completed,
        deleted: r.deleted
    };
}

export function mapRealmToWorkOrder(lo: WorkOrderRealm) {
    return {
        id: lo.apiId ?? null,
        idRealm: lo._id,
        title: lo.title,
        description: lo.description,
        status: lo.status,
        assignedTo: lo.assignedTo,
        createdAt: lo.createdAt,
        updatedAt: lo.updatedAt,
        deletedAt: lo.deletedAt,
        completed: lo.completed,
        deleted: lo.deleted
    };
}