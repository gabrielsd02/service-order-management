import { realm } from "..";
import { BSON, Results, UpdateMode } from 'realm';
import { WorkOrder } from "../schemas/WorkOrderSchema";
import { WorkOrderRealm } from "../../types/workOrder";

const TYPE_OBJECT = "WorkOrder";

const transformResultObject = (result: WorkOrder | WorkOrderRealm): WorkOrderRealm => {
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

const transformResultArray = (results: Results<WorkOrder>): WorkOrderRealm[] => {
    const assembleResults: WorkOrderRealm[] = results
        .map(r => transformResultObject(r))
    ;
    return assembleResults;
}

const toObjectId = (id: string | BSON.ObjectId) => {
    return id instanceof BSON.ObjectId
        ? id
        : new BSON.ObjectId(id)
    ;
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
    getAllExcludingIds(_ids: string[]): WorkOrderRealm[] {        
        try {
            if(!_ids.length) {
                return workOrdersRepository.getAll();
            }

            const idsToIgnore = _ids.map(toObjectId);
            const result = (
                realm.objects<WorkOrder>(TYPE_OBJECT)
                    .filtered("NOT (_id IN $0)", idsToIgnore)
            );
            return transformResultArray(result);
        } catch(e) {
            console.error('Error fetching ignoring ids',e);
            throw new Error("Houve um erro ao consultar ordens de serviço");
        }
    },
    getAllToSync(): WorkOrderRealm[] {
        try {
            const result = (
                realm.objects<WorkOrder>(TYPE_OBJECT)
                    .filtered("toSync == $0", true)
            );
            return transformResultArray(result);
        } catch(e) {
            console.error('Error fetching by api id',e);
            throw new Error("Houve um erro ao consultar ordens de serviço");
        }
    },
    getById(_id: string): WorkOrderRealm | undefined {
        try {
            const objectId = toObjectId(_id);
            const result = realm.objectForPrimaryKey<WorkOrder>(TYPE_OBJECT, objectId);
            if(result) return transformResultObject(result);
        } catch(e) {
            console.error('Error fetching by id',e);
            throw new Error("Houve um erro ao consultar ordens de serviço");
        }
    },
    getByApiId(apiId: string) {
        try {
            const result = (
                realm.objects<WorkOrder>(TYPE_OBJECT)
                    .filtered("apiId == $0", apiId)[0] ?? null
            );
            if(result) return transformResultObject(result);
        } catch(e) {
            console.error('Error fetching by api id',e);
            throw new Error("Houve um erro ao consultar ordens de serviço");
        }
    },    
    getLast() {
        try {
            const result = (
                realm.objects<WorkOrder>(TYPE_OBJECT)
                    .sorted("createdAt", true)[0] ?? null
            );
            return transformResultObject(result);
        } catch(e) {
            console.error('Error fetching last',e);
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
                _id: toObjectId(order._id),
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
            const objectId = toObjectId(_id);
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