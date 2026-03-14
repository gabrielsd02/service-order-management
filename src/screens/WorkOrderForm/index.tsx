import { useCallback, useEffect, useState } from "react";
import { Alert, Keyboard, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation";
import { useIsLoadingState } from "../../store/useIsLoadingStore";
import { SaveWorkOrderDTO, WorkOrder, WorkOrderRealm } from "../../types/workOrder";
import { styles } from "./styles";
import { useNetworkStore } from "../../store/useNetworkStore";
import { getWorkOrderByid } from "../../actions/workOrders/getWorkOrderById";
import { createWorkWorder } from "../../actions/workOrders/createWorkOrder";
import { updateWorkWorder } from "../../actions/workOrders/updateWorkOrder";
import { formatDate, formatTime } from "../../functions";
import { deleteWorkWorder } from "../../actions/workOrders/deleteWorkOrder";
import Container from "../../components/Container";
import FormField from "../../components/FormField";
import ButtonIcon from "../../components/ButtonIcon";
import TextWhite from "../../components/TextWhite";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import Button from "../../components/Button";

type WorkOrderFormProps = NativeStackScreenProps<RootStackParamList, 'WorkOrderForm'>;

type FormProps = Omit<WorkOrderRealm, '_id'> & { 
    id: string | null;
    apiId?: string; 
};

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
    const [form, setForm] = useState<FormProps>({
        id: null,
        title: '',
        description: '',
        status: 'Pending',
        assignedTo: '',
        completed: false,
        deleted: false        
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
                    status: order.status,
                    updatedAt: order.updatedAt, 
                    createdAt: order.createdAt,
                    completed: order.completed ?? false,
                    deleted: order.deleted ?? false,
                    deletedAt: order.deletedAt
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

    const deleteOrder = async () => {
        if(!id) return;

        try { 
            await deleteWorkWorder({
                id,
                isConnectedInternet,
                setIsLoading
            });
        } catch(e: any) {
            Alert.alert("Erro", e.message);
        } finally {
            navigation.goBack();
        }
    }

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

    const handleChange = (field: keyof SaveWorkOrderDTO, value: string) => {
        if(form.deleted) return;

        setForm(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDelete = () => {
        Alert.alert(
            "Remover ordem de serviço",
            "Você deseja remover essa ordem de serviço?",
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: () => deleteOrder()
                }
            ],
            { cancelable: true }
        );
    }

    const handleSubmit = () => {
        const error = validadeForm();

        if(error) {
            Alert.alert('Erro', error);
            return;
        }

        saveOrder();
    };

    const handleTextDate = () => {
        let textDate = '';

        if(form.deletedAt) {
            textDate = `Deletado em: ${formatDate(form.deletedAt)} às ${formatTime(form.deletedAt)}`;
        } else if(form.updatedAt) {
            textDate = `Editado em: ${formatDate(form.updatedAt)} às ${formatTime(form.updatedAt)}`;
        } else if(form.createdAt) {
            textDate = `Criado em: ${formatDate(form.createdAt)} às ${formatTime(form.createdAt)}`;
        }

        return textDate;
    }

    const isStatusBlocked = useCallback((currentStatus: string) => {
        return (!id && currentStatus !== 'Pending') 
            ? true
            : false
        ;
    }, [id]);

    useFocusEffect(
        useCallback(() => {
            if(id) getOrder();
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
    }, [])

    return (
        <Container>
            {id && (
                <View style={styles.containerButtonTrash}>
                    <TextWhite style={styles.textDate}>
                        {handleTextDate()}
                    </TextWhite>
                    <Button 
                        style={styles.buttonTrash}
                        onPress={handleDelete}
                    >
                        <FontAwesomeFreeSolid 
                            name="trash"
                            size={18}
                            color={'#dddddd'}
                        />
                    </Button>
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
                    editable={!form.deleted}
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
                    editable={!form.deleted}
                />
                <FormField 
                    label="Responsável*"
                    placeholder="Digite o nome do responsável"
                    value={form.assignedTo}
                    onChangeText={value => handleChange('assignedTo', value)}
                    editable={!form.deleted}
                />
                <TextWhite style={styles.label}>
                    Status*
                </TextWhite>
                <View style={styles.containerButtonsSelect}>
                    {STATUS.map((s, i) => (
                        <ButtonIcon
                            key={s.value}
                            text={s.label}
                            onPress={() => {
                                if(isStatusBlocked(s.value)) return;
                                handleChange('status', s.value);
                            }}
                            iconProps={{
                                name: 'circle',
                                size: 18,
                                color: s.value === form.status ? s.color : 'black',
                                style: { marginTop:2 }
                            }}
                            textStyle={[styles.textStyleButtonSelect, {
                                color: s.color
                            }]}
                            style={[styles.buttonSelect, {
                                opacity: isStatusBlocked(s.value) ? 0.5 : 1, 
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
                    style={[styles.button, {
                         backgroundColor: '#2E7D32'
                    }]}
                />
            </View>}            
        </Container>
    )
}

export default WorkOrderForm;