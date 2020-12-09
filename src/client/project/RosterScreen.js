import { BaseRouter } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState ,useContext } from 'react';
import { Button, Image, SectionList, StyleSheet, Text, View } from 'react-native';
import SearchApp from './SearchBar';
import Context from './Context';

const RosterScreen = ({ route, navigation }) => {

	const data = useContext(Context);
	const allPlayerData = require('./full-roster.json');

	const [roster, setRoster] = useState([]);

	useEffect(() => {
		callRoster();
	}, [route.params['team']]);

	const callRoster = () => {
		const info = allPlayerData[route.params['team']];
		setRoster(info);
	}
	
	const addPlayer = (player) => {
		if (data.followed[player]) {
			const temp = {...data.followed};
			delete temp[player];
			data.setFollowed(temp);
		} else {
			data.setFollowed({...data.followed, [player]: route.params['team']});
		}
	}

	return (
		<Context.Consumer>
			{context => (
				<View>
				<View style={{ width: '100%', height: 105, backgroundColor: '#1D3557' }}>
					<StatusBar style="auto" />
					<SearchApp
						style={{ backgroundColor: '#457B9D' }}
						navigation={navigation}
					/>
				</View>
				<View
					style={{ width: '100%', height: '100%', backgroundColor: '#1D3557' }}
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
									<Text style={styles.item} onPress={() => addPlayer(Object.keys(item)[0])}>{Object.keys(item)[0]}</Text>
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
		fontSize: 22,
		fontWeight: 'bold',
	},
	playerText: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		textAlign: 'left',
	},
});

export default RosterScreen;
