import { View } from "react-native";
import { WorkOrderStore } from "../../../types/workOrder";
import { styles } from './styles'
import { formatDate, formatTime } from "../../../functions";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import TextWhite from "../../../components/TextWhite";
import Button from "../../../components/Button";

type Props = {
    item: WorkOrderStore;
    editItem: () => void;
}

function ItemList({ 
    item,
    editItem
}: Props) {
    const handleOnPress = () => {
        if(item.deleted) return;
        editItem();
    }

    return (
        <Button style={styles.container} onPress={handleOnPress}>
            <View style={styles.containerCircleStatus}>
                <View 
                    style={[styles.circleStatus, {
                        backgroundColor: item.deleted ? 'red' : (
                            item.status === 'Completed' 
                                ? '#2E7D32' 
                                : item.status === 'In Progress' 
                                    ? '#db6f03' 
                                    : '#ffc228'
                            )
                    }]}
                />
            </View>
            <View style={styles.textsContainer}>
                <TextWhite style={styles.title} numberOfLines={1}>
                    {item.title}
                </TextWhite>
                <TextWhite numberOfLines={2} style={styles.description}>
                    {item.description}
                </TextWhite>
                <View style={styles.containerBottomTexts}>
                    <TextWhite style={[styles.textBottom, { textAlign: 'left' }]} numberOfLines={1}>
                        Resp.: {item.assignedTo}
                    </TextWhite>
                    <TextWhite style={styles.textBottom} numberOfLines={1}>
                        {formatDate(item.updatedAt ? item.updatedAt : item.createdAt, false)}
                        {' '}
                        {formatTime(item.updatedAt ? item.updatedAt : item.createdAt)}
                    </TextWhite>
                </View>
            </View>
            <View style={styles.containerIcon}>
                <View style={styles.icon}>
                    <FontAwesomeFreeSolid 
                        name="chevron-right"
                        size={28}
                        color={'white'}
                    />
                </View>
            </View>
        </Button>
    )
}

export default ItemList;