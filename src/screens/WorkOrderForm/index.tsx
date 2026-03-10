import { useCallback, useEffect, useState } from "react";
import { Alert, Keyboard, ScrollView, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation";
import { useIsLoadingState } from "../../store/useIsLoadingStore";
import { SaveWorkOrderDTO, WorkOrder } from "../../types/workOrder";
import { styles } from "./styles";
import { useNetworkStore } from "../../store/useNetworkStore";
import { getWorkOrderByid } from "../../actions/workOrders/getWorkOrderById";
import { createWorkWorder } from "../../actions/workOrders/createWorkOrder";
import { updateWorkWorder } from "../../actions/workOrders/updateWorkOrder";
import Container from "../../components/Container";
import FormField from "../../components/FormField";
import ButtonIcon from "../../components/ButtonIcon";
import TextWhite from "../../components/TextWhite";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";

type WorkOrderFormProps = NativeStackScreenProps<RootStackParamList, 'WorkOrderForm'>;

const STATUS = [
    {
        value: 'Pending',
        label: 'Pendente',
        color: '#ffc228'
    },
    {
        value: 'In Progress',
        label: 'Em andamento',
        color: '#db6f03'
    },
    {
        value: 'Completed',
        label: 'Concluído',
        color: '#2E7D32'
    }
];

function WorkOrderForm({ route, navigation }: WorkOrderFormProps) {
    const { id } = route?.params ?? { id: null };
    
    const isConnectedInternet = useNetworkStore((state) => state.isConnectedInternet);
    const setIsLoading = useIsLoadingState((state) => state.setIsLoading);
    
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [form, setForm] = useState<SaveWorkOrderDTO>({
        id: undefined,
        title: '',
        description: '',
        status: 'Pending',
        assignedTo: ''
    });

    const getOrder = async () => {
        try {
            const order = await getWorkOrderByid({
                id: id!,
                isConnectedInternet,
                setIsLoading
            });
            if(order) {
                setForm({
                    id: '_id' in order ? order._id : order.id,
                    assignedTo: order.assignedTo,
                    title: order.title,
                    description: order.description,
                    status: order.status
                });
            }
        } catch(e: any) {
            Alert.alert("Erro", e.message);
        }
    }

    const saveOrder = async () => {
        try {
            const payload = {                
                title: form.title,
                status: form.status,
                description: form.description,
                assignedTo: form.assignedTo
            };

            if(id) {
                const orderUpdate = {
                    ...payload,
                    id
                } as WorkOrder;
                
                await updateWorkWorder({
                    orderUpdate,
                    isConnectedInternet,
                    setIsLoading
                });
            } else {
                await createWorkWorder({
                    isConnectedInternet,
                    orderCreate: payload,
                    setIsLoading,
                });
            }
        } catch(e: any) {
            Alert.alert("Erro", e.message);
        } finally {
            navigation.goBack();
        }
    }

    const handleChange = (field: keyof SaveWorkOrderDTO, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const validadeForm = () => {
        if(!form.title.trim()) {
            return 'Título é obrigatório';
        }

        if(!form.description.trim()) {
            return 'Descrição é obrigatória';
        }

        if(!form.status) {
            return 'Status é obrigatório';
        }

        if(!form.assignedTo.trim()) {
            return 'Responsável é obrigatório';
        }

        return null;
    }

    const handleSubmit = () => {
        const error = validadeForm();

        if(error) {
            Alert.alert('Erro', error);
            return;
        }

        saveOrder();
    };

    useFocusEffect(
        useCallback(() => {
            if(id) getOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isConnectedInternet])
    )

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setIsKeyboardOpen(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsKeyboardOpen(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            {id && (
                <View style={styles.containerButtonTrash}>
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        style={styles.buttonTrash}
                        onPress={() => {}}
                    >
                        <FontAwesomeFreeSolid 
                            name="trash"
                            size={18}
                            color={'#dddddd'}
                        />
                    </TouchableOpacity>
                </View>
            )}
            <ScrollView 
                nestedScrollEnabled
                showsVerticalScrollIndicator
                style={styles.list}
                contentContainerStyle={styles.containerForm} 
            >
                <FormField 
                    label="Título*"
                    placeholder="Digite o título da ordem de serviço"
                    value={form.title}
                    onChangeText={value => handleChange('title', value)}
                />
                <FormField 
                    label="Descrição"
                    placeholder="Digite a descrição da ordem de serviço"
                    value={form.description}
                    onChangeText={value => handleChange('description', value)}
                    multiline
                    textAlignVertical={'top'}
                    numberOfLines={3}
                    style={{ height: 100 }}
                />
                <FormField 
                    label="Responsável*"
                    placeholder="Digite o nome do responsável"
                    value={form.assignedTo}
                    onChangeText={value => handleChange('assignedTo', value)}
                />
                <TextWhite style={styles.label}>
                    Status*
                </TextWhite>
                <View style={styles.containerButtonsSelect}>
                    {STATUS.map((s, i) => (
                        <ButtonIcon
                            key={s.value}
                            text={s.label}
                            onPress={() => handleChange('status', s.value)}
                            iconProps={{
                                name: 'circle',
                                size: 18,
                                color: s.value === form.status ? s.color : 'black',
                                style: { marginTop:2 }
                            }}
                            textStyle={[styles.textStyleButtonSelect, {
                                color: s.color
                            }]}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={[styles.buttonSelect, {
                                borderBottomWidth: i === STATUS.length - 1 ? 0 : 2,
                            }]}
                        />
                    ))}
                </View>
            </ScrollView>
            {!isKeyboardOpen && <View style={styles.buttonsContainer}>
                <ButtonIcon
                    onPress={() => navigation.goBack()}
                    text="Cancelar" 
                    iconProps={{
                        name: "arrow-left",
                        size: 24,
                        style: {
                            marginTop: 2
                        }
                    }}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={[styles.button, {
                         backgroundColor: '#8B1E1E'
                    }]}
                />
                <ButtonIcon
                    onPress={handleSubmit}
                    text="Salvar" 
                    iconProps={{
                        name: "check",
                        size: 24
                    }}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={[styles.button, {
                         backgroundColor: '#2E7D32'
                    }]}
                />
            </View>}
            
        </Container>
    )
}

export default WorkOrderForm;