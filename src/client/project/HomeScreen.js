import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useState } from 'react';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
import SearchApp from './SearchBar';
import getAllPlayerStatus from './PlayerStatus';
import Context from './Context';
import { RefreshControl } from 'react-native';

const HomeScreen = ({ navigation }) => {

	const [refreshing, setRefreshing] = useState(false);

	const wait = (timeout) => {
		return new Promise(resolve => {
			setTimeout(resolve, timeout);
		});
	}

	const data = useContext(Context);

	let players = getAllPlayerStatus(data.followed),
			playerOn = [],
			playerOff = [],
			playerNoGame = [];

	for (let player in players) {
		if (players[player].status === 'on') {
			playerOn.push(player);
		} else if (players[player].status === 'off' || players[player].status === 'not-started') {
			playerOff.push(player);
		} else {
			playerNoGame.push(player);
		}
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => {
			setRefreshing(false);
			data.setUpdate(!data.update);
		})
	}, []);

	return (
		<Context.Consumer>
			{context => (
				<View style={{flex: 1}}>
					<View
						style={{ width: '100%', height: '100%', backgroundColor: '#1D3557', flex: 1}}
					>
						<StatusBar style="auto" />
						<SearchApp
							style={{ backgroundColor: '#457B9D' }}
							navigation={navigation}
						/>
						<SectionList
							sections={[
								{ title: 'ON', data: playerOn },
								{ title: 'OFF', data: playerOff },
								{ title: 'NO GAMES', data: playerNoGame },
							]}
							renderItem={({ item, index }) => (
								<View style={styles.playerView}>
									<Image
										style={styles.playerIcon}
										source={{uri: players[item].icon}}
										transition={false}
									/>
									<View style={styles.playerText}>
										<Text style={styles.item}>{item}</Text>
										<Text style={styles.itemDetail}>
											{players[item].quarter}{players[item].time}
										</Text>
									</View>
								</View>
							)}
							renderSectionHeader={({ section }) => (
								<Text style={styles.sectionHeader}>{section.title}</Text>
							)}
							keyExtractor={(item, index) => index}
							refreshControl={
								<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='#F1FAEE'/>
							}
							extraData={data.update}
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
