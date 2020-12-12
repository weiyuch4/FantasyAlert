import { BaseRouter } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState ,useContext } from 'react';
import { Button, Image, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
//import ContentLoader from "react-native-easy-content-loader";
import SearchApp from './SearchBar';
import Context from './Context';
import { Icon } from 'react-native-elements';
import ContentLoader, { Bullets } from 'react-native-easy-content-loader';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

const RosterScreen = ({ route, navigation }) => {

	const data = useContext(Context);
	const allPlayerData = require('./full-roster.json');

	const [roster, setRoster] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		callRoster();
	}, [route.params['team']]);

	const callRoster = () => {
		const info = allPlayerData[route.params['team']];
		setRoster(info);
	}
	
	const addPlayer = (playerName, playerIcon) => {
		if (data.followed[playerName]) {
			const temp = {...data.followed};
			delete temp[playerName];
			data.setFollowed(temp);
		} else {
			data.setFollowed({...data.followed, [playerName]: [route.params['team'], playerIcon]});
		}
	}

	return (
		<Context.Consumer>
			{context => (
			<View style={{flex: 1}}>
				<View style={{ width: '100%', height: 105, backgroundColor: '#1D3557' }}>
					<StatusBar style="auto" />
					<SearchApp
						style={{ backgroundColor: '#457B9D' }}
						navigation={navigation}
					/>
				</View>
				<View
					style={{ width: '100%', height: '100%', backgroundColor: '#1D3557', flex: 1}}
				>
					<SectionList
						sections={[
							{ title: 'Players', data: roster },
						]}
						renderItem={({ item, index }) => (
							<View style={styles.playerView}>
								<Image
									style={styles.playerIcon}
									source={{uri: Object.values(item)[0]}}
									transition={false}
								/>
								<View style={styles.playerText}>
									<Text style={styles.item}>{Object.keys(item)[0]}</Text>
									<TouchableHighlight 
										onPress={() => addPlayer(Object.keys(item)[0], Object.values(item)[0])}
										style={styles.button}
									>
										<Text style={styles.buttonText}>Follow</Text>
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
		backgroundColor: '#1D3557',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'left',
		padding: 15,
	},
	playerView: {
		flex: 1,
		backgroundColor: '#1D3557',
		flexDirection: 'row',
		alignItems: 'center',
	},
	playerIcon: {
		width: 50,
		height: 50,
		margin: 10,
	},
	item: {
		color: '#F1FAEE',
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	playerText: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		textAlign: 'left',
	},
	button: {
		alignItems: 'flex-end',
		backgroundColor: '#457B9D',
		alignSelf: 'flex-end',
		width: 52,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		padding: 3,
		fontWeight: 'bold',
	},
});

export default RosterScreen;
