import { View } from "react-native";
import { WorkOrder } from "../../../types/workOrder";
import { styles } from './styles'
import TextWhite from "../../../components/TextWhite";

type Props = {
    item: WorkOrder;
}

function ItemList({ item }: Props) {

    return (
        <View>
            <TextWhite>
                {item.title}
            </TextWhite>
        </View>
    )
}

export default ItemList;