import { TouchableOpacity, View } from "react-native";
import { WorkOrderStore } from "../../../types/workOrder";
import { styles } from './styles'
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import TextWhite from "../../../components/TextWhite";

type Props = {
    item: WorkOrderStore;
    editItem: () => void;
    deleteItem: () => void;
}

function ItemList({ 
    item,
    editItem,
    deleteItem
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.containerCircleStatus}>
                <View 
                    style={[styles.circleStatus, {
                        backgroundColor: item.status === 'Completed' 
                            ? '#2E7D32' 
                            : item.status === 'In Progress' 
                                ? '#db6f03' 
                                : '#ffc228',
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
            </View>
            <View style={styles.containerOptions}>
                <TouchableOpacity
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={[styles.option, {
                        backgroundColor: '#b61414',
                    }]}
                    onPress={deleteItem}
                >
                    <FontAwesomeFreeSolid 
                        name="trash"
                        size={24}
                        color={'white'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={[styles.option, {
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        backgroundColor: '#173da5',
                    }]}
                    onPress={editItem}
                >
                    <FontAwesomeFreeSolid 
                        name="pen"
                        size={24}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemList;