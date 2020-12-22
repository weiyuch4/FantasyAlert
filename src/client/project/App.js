import React, { useEffect, useRef, useState } from 'react';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, View, Image } from 'react-native';
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
import getAllPlayerStatus from './PlayerStatus';
import getTeams from './Team';
import dailyUpdate from './DailyUpdate';
import getFullRoster from './GetFullRoster';

const CustomDrawerContent = props => {
	return (
		<SafeAreaProvider>
			<View>
				<DrawerItem
					label="FantasyAlert"
					labelStyle={styles.labelSize}
					style={
						{
							paddingTop: '15%', 
							borderBottomColor: '#cdcacc',
							borderBottomWidth: 1,
						}
					}
				/>
			</View>
			<DrawerContentScrollView {...props} style={{top: '-5%'}} scrollEnabled={false}>
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

const allPlayerData = require('./search-full-roster.json');
const allPlayerImg = allPlayerData.map(player => Object.values(player)[0][1]);

const App = (props) => {
	const [followed, setFollowed] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
  const [followedStatus, setFollowedStatus] = useState({});
  const [teams, setTeams] = useState({});
  const [fullRoster, setFullRoster] = useState({});
	
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

  const loadFullRoster = async () => {

    getFullRoster(setFullRoster).then(res => console.log(fullRoster));

    /*
		try {
      const jsonValue = await AsyncStorage.getItem('@roster3');
      console.log(jsonValue);
			if (jsonValue !== null) {
        console.log('not null');
        setFullRoster(JSON.parse(jsonValue));
			} else {
        console.log('null');
        await getFullRoster(fullRoster, setFullRoster);
        console.log(fullRoster);
        const jsonRoster = JSON.stringify(fullRoster);
        await AsyncStorage.setItem('@roster3', jsonRoster);
        setFullRoster(fullRoster);
        console.log('set again');
        console.log(fullRoster);
      }
		} catch (err) {
			alert(err);
    }
    */
  };
	
	useEffect(() => {
    loadData();
    //loadFullRoster();
    //dailyUpdate();
    getTeams(setTeams);
    setIsLoaded(true);
	}, []);
	
	useEffect(() => {
		getAllPlayerStatus(followed, setFollowedStatus);
		const interval = setInterval(() => {
			getAllPlayerStatus(followed, setFollowedStatus);
			//console.log('refresh every 10 sec');
		}, 10000);
		return () => clearInterval(interval);
  }, [followed]);
	

	return (
    <Context.Provider 
      value={{ 
        followed, setFollowed, 
        isLoaded, setIsLoaded, 
        followedStatus, setFollowedStatus,
        teams, setTeams,
        fullRoster, setFullRoster
      }}
    >
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
