import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ListWorkOrders from "../screens/ListWorkOrders";
import Header from "../components/Header";
import WorkOrderForm from "../screens/WorkOrderForm";

export type RootStackParamList = {
    Home: undefined;
    WorkOrderForm: {
        id?: string;
    } | undefined;
    ListWorkOrders: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
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
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="ListWorkOrders"
                    component={ListWorkOrders}
                    options={{
                        // eslint-disable-next-line react/no-unstable-nested-components
                        header: (props) => <Header {...props} title="Ordens de serviço" />
                    }}
                />
                <Stack.Screen 
                    name="WorkOrderForm"
                    component={WorkOrderForm}
                    options={{
                        // eslint-disable-next-line react/no-unstable-nested-components
                        header: (props) => <Header {...props} title="Ficha ordem de serviço" />
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}