import { BaseRouter } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import {
	SectionList,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
//import ContentLoader from "react-native-easy-content-loader";
import SearchApp from './SearchBar';
import Context from './Context';
import { Icon } from 'react-native-elements';
import ContentLoader, { Bullets } from 'react-native-easy-content-loader';
import { SafeAreaView } from 'react-navigation';
import { ScrollView, Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CachedImage from 'react-native-expo-cached-image';
import { Image } from 'react-native-expo-image-cache';

const RosterScreen = ({ route, navigation }) => {
	const data = useContext(Context);
	const allPlayerData = require('./full-roster.json');

  const [roster, setRoster] = useState([]);

	useEffect(() => {
		callRoster();
	}, [route.params['team']]);

	useEffect(() => {
		storeData(data.followed);
	}, [data.followed]);

	const callRoster = () => {
		const info = allPlayerData[route.params['team']];
		setRoster(info);
	};

	const addPlayer = (playerName, playerIcon) => {
		if (data.followed[playerName]) {
			const temp = { ...data.followed };
			delete temp[playerName];
			data.setFollowed(temp);
		} else {
			data.setFollowed({
				...data.followed,
				[playerName]: [route.params['team'], playerIcon],
			});
		}
	};

	const storeData = async (value) => {
		if (data.isLoaded === true) {
			try {
				const jsonValue = JSON.stringify(value);
				await AsyncStorage.setItem('@followed', jsonValue);
			} catch (err) {
				alert(err);
			}
		}
	};

	const updateText = playerName => {
		if (data.followed[playerName]) {
			return 'Unfollow';
		} else {
			return 'Follow';
		}
  };

	return (
		<Context.Consumer>
			{context => (
				<View style={{ flex: 1 }}>
					<View
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: '#6d6875',
							flex: 1,
						}}
					>
						<StatusBar style="auto" />
						<SearchApp
							style={{ backgroundColor: '#457B9D' }}
							navigation={navigation}
						/>
						<SectionList
							sections={[{ title: 'Players', data: roster }]}
							renderItem={({ item, index }) => (
								<View style={styles.playerView}>
									<Image
                    style={styles.playerIcon}
										uri={Object.values(item)[0]}
									/>
									<View style={styles.playerText}>
										<Text style={styles.item}>{Object.keys(item)[0]}</Text>
										<TouchableHighlight
											onPress={() =>
												addPlayer(Object.keys(item)[0], Object.values(item)[0])
											}
											style={styles.button}
										>
											<Text style={styles.buttonText}>{`${updateText(
												Object.keys(item)[0]
											)}`}</Text>
										</TouchableHighlight>
									</View>
								</View>
							)}
							renderSectionHeader={({ section }) => (
								<Text style={styles.sectionHeader}>{section.title}</Text>
							)}
							keyExtractor={(item, index) => index}
						/>
					</View>
				</View>
			)}
		</Context.Consumer>
	);
};

const styles = StyleSheet.create({
	itemDetail: {
		color: '#F1FAEE',
		fontSize: 18,
		fontWeight: '500',
		// left: 81,
		//paddingTop: 10,
	},
	sectionHeader: {
		color: '#F1FAEE',
		backgroundColor: '#6d6875',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'left',
		padding: 15,
	},
	playerView: {
		backgroundColor: '#f0efeb',
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#cdcacc',
		borderBottomWidth: 1,
	},
	playerIcon: {
		width: 50,
		height: 50,
		margin: 10,
	},
	item: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#594e36',
		alignSelf: 'center',
	},
	playerText: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		color: '#222725',
		justifyContent: 'space-between',
	},
	button: {
		backgroundColor: '#cdcacc',
		width: 68,
		borderRadius: 25,
		margin: 8,
		paddingVertical: 4,
		alignSelf: 'center',
		position: 'absolute',
		right: 0,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		padding: 3,
		fontWeight: 'bold',
	},
	menuIcon: {
		margin: 15,
	},
});

export default RosterScreen;
