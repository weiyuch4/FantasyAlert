import React, { useEffect, useState } from 'react';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

const CustomDrawerContent = (props) => {
	return (
		<SafeAreaProvider>
			<DrawerContentScrollView {...props}>
				<DrawerItem
					label="Home"
					labelStyle={styles.labelSize}
					icon={() => <Icon name={'home'} size={30} color={'#F1FAEE'} />}
					onPress={() => props.navigation.navigate('Home')}
				/>
				<DrawerItem
					label="Settings"
					labelStyle={styles.labelSize}
					icon={() => <Icon name={'settings'} size={30} color={'#F1FAEE'} />}
					onPress={() => {}}
				/>
			</DrawerContentScrollView>
		</SafeAreaProvider>
	);
}

const Drawer = createDrawerNavigator();

const App = (props) => {
	/*
	const [apiResponse, setApiResponse] = useState("");

	const callAPI = () => {
		fetch(`${process.env.API_URL}/testAPI`)
			.then(res => res.json())
			.then(res => setApiResponse({ apiResponse: res }))
		
	};

	useEffect(() => {
		callAPI();
	}, []);
	*/
	// console.log(apiResponse);

	return (
		<NavigationContainer>
			<Drawer.Navigator
				initialRouteName="Home"
				drawerStyle={{
					backgroundColor: '#2B5085',
				}}
				drawerContent={props => <CustomDrawerContent {...props} />}
			>
				<Drawer.Screen name="Home" component={HomeScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	labelSize: {
		color: '#F1FAEE',
		fontSize: 22,
		fontWeight: 'bold',
	},
});

export default App;
