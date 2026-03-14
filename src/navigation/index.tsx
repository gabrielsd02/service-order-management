import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetworkStore } from "../store/useNetworkStore";
import Home from "../screens/Home";
import ListWorkOrders from "../screens/ListWorkOrders";
import Header from "../components/Header";
import WorkOrderForm from "../screens/WorkOrderForm";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";

export type RootStackParamList = {
    Home: undefined;
    WorkOrderForm: {
        id?: string;
    } | undefined;
    ListWorkOrders: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
    const isConnectedInternet = useNetworkStore(state => state.isConnectedInternet);

    const headerRight = useCallback(() => (
        <FontAwesomeFreeSolid 
            name="wifi-strong"
            size={18}
            color={isConnectedInternet ? 'green' : 'red'}
        />
    ), [isConnectedInternet])
    
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    animation: 'slide_from_right',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: 'transparent' },
                    contentStyle: { backgroundColor: 'transparent' }
                }}
            >
                <Stack.Screen 
                    name="Home"
                    component={Home}
                    options={{ 
                        headerTitle: '',
                        headerRight
                    }}
                />
                <Stack.Screen 
                    name="ListWorkOrders"
                    component={ListWorkOrders}
                    options={{
                        header: (props) => <Header 
                            {...props} 
                            isConnectedInternet={isConnectedInternet}
                            title="Ordens de serviço" 
                        />
                    }}
                />
                <Stack.Screen 
                    name="WorkOrderForm"
                    component={WorkOrderForm}
                    options={{
                        header: (props) => <Header 
                            {...props} 
                            isConnectedInternet={isConnectedInternet}
                            title="Ficha ordem de serviço" 
                        />
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}