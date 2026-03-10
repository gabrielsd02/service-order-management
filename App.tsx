import { useEffect } from 'react';
import { 
	KeyboardAvoidingView,
	StatusBar, 
	StyleSheet,
	Platform,
	useColorScheme 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';
import { useNetworkStore } from './src/store/useNetworkStore';
import { useIsLoadingState } from './src/store/useIsLoadingStore';
import NetInfo from "@react-native-community/netinfo";
import Loading from './src/components/Loading';

function App() {
	const isDarkMode = useColorScheme() === 'dark';
	const isLoading = useIsLoadingState((state) => state.isLoading);
	const setIsConnectedInternet = useNetworkStore((state) => state.setIsConnectedInternet);
	
	useEffect(() => {
		const unsubscribe  = NetInfo.addEventListener(state => {
			setIsConnectedInternet(!!state.isConnected);
		});

		return () => unsubscribe();
	}, [setIsConnectedInternet])
	
	return (
		<SafeAreaProvider>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.keyboard}
				>
					<Navigation />
				</KeyboardAvoidingView>
				<Loading isLoading={isLoading} />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'hidden',
		position: 'relative',
		backgroundColor: '#3b3b3b'
	},
	keyboard: {
		flex: 1
	}
});

export default App;
