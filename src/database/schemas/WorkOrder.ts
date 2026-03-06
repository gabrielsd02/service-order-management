import Realm from "realm";

export class WorkOrder extends Realm.Object<WorkOrder> {
    _id!: Realm.BSON.ObjectId;
    title!: string;
    description!: string;
    status!: string;
    assignedTo!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static schema: Realm.ObjectSchema = {
        name: "WorkOrder",
        primaryKey: "_id",
        properties: {
            _id: "objectId",
            title: "string",
            description: "string",
            status: "string",
            assignedTo: "string",
            createdAt: "date",
            updatedAt: "date",
        },
    };
}