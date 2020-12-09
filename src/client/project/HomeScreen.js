import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
import SearchApp from './SearchBar';
import getAllPlayerStatus from './PlayerStatus';
import Context from './Context';

const HomeScreen = ({ navigation }) => {

	const data = useContext(Context);
	console.log(data);

	const players = getAllPlayerStatus(),
		playerOn = [],
		playerOff = [],
		playerStatus = Object.values(players);
	for (const player in players) {
		if (players[player].status === 'on') {
			playerOn.push(player);
		} else if (players[player].status === 'off') {
			playerOff.push(player);
		} else {
			console.log('end of game');
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
								{ title: 'ON', data: playerOn },
								{ title: 'OFF', data: playerOff },
							]}
							renderItem={({ item, index }) => (
								<View style={styles.playerView}>
									<Image
										style={styles.playerIcon}
										source={require('./logos/nba/lakers.png')}
									/>
									<View style={styles.playerText}>
										<Text style={styles.item}>{item}</Text>
										<Text style={styles.itemDetail}>
											{playerStatus[index].quarter} - {playerStatus[index].time}
										</Text>
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

export default HomeScreen;
