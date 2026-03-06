import Realm from "realm";
import { WorkOrder } from "./schemas/WorkOrder";

export const realm = new Realm({
    schema: [WorkOrder]
})