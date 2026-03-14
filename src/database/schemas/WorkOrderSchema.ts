import Realm from "realm";
import { WorkOrderStatus } from "../../types/workOrder";

export class WorkOrder extends Realm.Object<WorkOrder> {
    _id!: Realm.BSON.ObjectId;
    apiId?: string | null;
    title!: string;
    description!: string;
    status!: WorkOrderStatus;
    assignedTo!: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    completed?: boolean;
    deleted?: boolean;
    toSync?: boolean;

    static schema: Realm.ObjectSchema = {
        name: "WorkOrder",
        primaryKey: "_id",
        properties: {
            _id: {
                type: 'objectId',
                default: () => new Realm.BSON.ObjectId()
            },
            apiId: "string?",
            title: "string",
            description: "string",
            status: {
                type: 'string',
                default: 'Pending'
            },
            assignedTo: "string",
            createdAt: {
                type: 'date',
                default: new Date()
            },
            updatedAt: 'date?',
            deletedAt: 'date?',
            completed: {
                type: 'bool',
                default: false
            },
            deleted: {
                type: 'bool',
                default: false
            },
            toSync: {
                type: 'bool',
                default: false
            }
        },
    };
}