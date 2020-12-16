import React, { useEffect, useState } from 'react';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import TeamScreen from './TeamScreen';
import RosterScreen from './RosterScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import Context from './Context';
import FollowedScreen from './FollowedScreen';
import SettingsScreen from './SettingsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = props => {
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
					label="Players"
					labelStyle={styles.labelSize}
					icon={() => <Icon name={'people'} size={30} color={'#F1FAEE'} />}
					onPress={() => props.navigation.navigate('Players')}
				/>
				<DrawerItem
					label="Followed"
					labelStyle={styles.labelSize}
					icon={() => (
						<Icon name={'playlist-add-check'} size={30} color={'#F1FAEE'} />
					)}
					onPress={() => props.navigation.navigate('Followed')}
				/>
				
			</DrawerContentScrollView>
			<View>
					<DrawerItem
						label="Settings"
						labelStyle={styles.labelSize}
						icon={() => <Icon name={'settings'} size={30} color={'#F1FAEE'} />}
						onPress={() => props.navigation.navigate('Settings')}
						style={
							{
								paddingBottom: '5%', 
								borderTopColor: '#cdcacc',
								borderTopWidth: 1,
							}
						}
					/>
				</View>
		</SafeAreaProvider>
	);
};

const Drawer = createDrawerNavigator();

const App = (props) => {
	const [followed, setFollowed] = useState({});
	const [update, setUpdate] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	
	const loadData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('@followed');
			if (jsonValue !== null) {
				setFollowed(JSON.parse(jsonValue));
			}
		} catch (err) {
			alert(err);
		}
	};
	
	useEffect(() => {
		loadData();
		setIsLoaded(true);
	}, []);

	return (
		<Context.Provider value={{ followed, setFollowed, update, setUpdate, isLoaded, setIsLoaded }}>
			<NavigationContainer>
				<Drawer.Navigator
					initialRouteName="Home"
					drawerStyle={{
						backgroundColor: '#9a8c98',
					}}
					drawerContent={props => <CustomDrawerContent {...props} />}
					edgeWidth={0}
				>
					<Drawer.Screen name="Home" component={HomeScreen} />
					<Drawer.Screen name="Players" component={TeamScreen} />
					<Drawer.Screen name="Roster" component={RosterScreen} />
					<Drawer.Screen
						name="Followed"
						component={FollowedScreen}
						//options={{ gestrueEnabled: false }}
					/>
					<Drawer.Screen name="Settings" component={SettingsScreen} />
				</Drawer.Navigator>
			</NavigationContainer>
		</Context.Provider>
	);
};

const styles = StyleSheet.create({
	labelSize: {
		color: '#F1FAEE',
		fontSize: 22,
		fontWeight: 'bold',
	},
});

export default App;
