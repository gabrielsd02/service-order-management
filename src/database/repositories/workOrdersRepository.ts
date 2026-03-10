import { realm } from "..";
import { BSON, Results, UpdateMode } from 'realm';
import { WorkOrder } from "../schemas/WorkOrderSchema";
import { WorkOrderRealm } from "../../types/workOrder";

const TYPE_OBJECT = "WorkOrder";

function transformResultObject(result: WorkOrder | WorkOrderRealm): WorkOrderRealm {
    const assembleResults = {
        _id: typeof result._id === 'string' ? result._id : result._id.toHexString(),
        apiId: result.apiId,
        assignedTo: result.assignedTo,
        completed: result.completed,
        title: result.title,
        description: result.description,
        status: result.status,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        deletedAt: result.deletedAt,
        deleted: result.deleted
    };
    return assembleResults;
}

function transformResultArray(results: Results<WorkOrder>): WorkOrderRealm[] {
    const assembleResults: WorkOrderRealm[] = results
        .map(r => transformResultObject(r))
    ;
    return assembleResults;
}

export const workOrdersRepository = {
    getAll(): WorkOrderRealm[] {
        try {
            const results = realm.objects<WorkOrder>(TYPE_OBJECT).sorted("createdAt", true);
            return transformResultArray(results);
        } catch(e) {
            console.error('Error fetching all',e);
            throw new Error("Houve um erro ao consultar ordens de serviço");
        }
    },
    getById(_id: string): WorkOrderRealm | undefined {
        try {
            const objectId = new BSON.ObjectId(_id);
            const result = realm.objectForPrimaryKey<WorkOrder>(TYPE_OBJECT, objectId);
            if(result) return transformResultObject(result);
        } catch(e) {
            console.error('Error fetching all',e);
            throw new Error("Houve um erro ao consultar ordens de serviço");
        }
    },
    create(order: Omit<WorkOrderRealm, '_id'>) {
        try {
            const created = realm.write(() => {
                return realm.create<WorkOrderRealm>(TYPE_OBJECT, order)
            })
            return transformResultObject(created);
        } catch(e) {
            console.error('Error create order',e);
            throw new Error("Houve um erro ao criar a ordem de serviço");
        }
    },
    update(order: WorkOrderRealm) {
        try {
            const objectOrder = {
                ...order,
                _id: new BSON.ObjectId(order._id),
                updatedAt: new Date()
            }
            const updated = realm.write(() => {
                return realm.create<WorkOrder>(TYPE_OBJECT, objectOrder, UpdateMode.Modified);
            });
            return transformResultObject(updated);
        } catch(e) {
            console.error('Error update order',e);
            throw new Error("Houve um erro ao atualizar ordem de serviço");
        }
    },
    delete(_id: string) {
        try {
            const objectId = new BSON.ObjectId(_id);
            realm.write(() => {
                const order = realm.objectForPrimaryKey(TYPE_OBJECT, objectId)
                if(order) realm.delete(order);
            })
        } catch(e) {
            console.error('Error delete order',e);
            throw new Error("Houve um erro ao remover ordem de serviço");
        }
    },
}