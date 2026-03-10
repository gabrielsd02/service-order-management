import Realm from "realm";
import { WorkOrder } from "./schemas/WorkOrderSchema";

export const realm = new Realm({
    schema: [WorkOrder],
    schemaVersion: 2
})