import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useState } from 'react';
import {
	Image,
	SectionList,
	StyleSheet,
	Text,
	View,
	FlatList,
} from 'react-native';
import SearchApp from './SearchBar';
import getAllPlayerStatus from './PlayerStatus';
import Context from './Context';
import { RefreshControl } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GreekFreak from './illustrations/GreekFreak';
import RefreshingBeverage from './illustrations/RefreshingBeverage';
import GameDay from './illustrations/GameDay';

const HomeScreen = ({ navigation }) => {
	const [refreshing, setRefreshing] = useState(false);

	const wait = timeout => {
		return new Promise(resolve => {
			setTimeout(resolve, timeout);
		});
	};

	const data = useContext(Context);

	let players = getAllPlayerStatus(data.followed),
		playerOn = [],
		playerOff = [],
		playerNoGame = [];

	for (let player in players) {
		if (players[player].status === 'on') {
			playerOn.push(player);
		} else if (
			players[player].status === 'off' ||
			players[player].status === 'not-started'
		) {
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
		});
	}, []);

	const Tab = createMaterialTopTabNavigator();

	const onScreen = () => {
		return (
			<View
				style={{
					width: '100%',
					height: '100%',
					backgroundColor: '#6d6875',
					flex: 7,
				}}
			>
				{playerOn.length === 0 ? (
					<View style={styles.imagePlaceholderContainer}>
						<View style={{marginTop: "-25%"}}>
							<GreekFreak />
							<Text style={styles.imagePlaceholderText}>
								None of the players you follow are on the court
							</Text>
						</View>
					</View>
				) : (
					<FlatList
						data={playerOn}
						renderItem={({ item }) => (
							<View style={styles.playerView}>
								<Image
									style={styles.playerIcon}
									source={{ uri: players[item].icon }}
									transition={false}
								/>
								<View style={styles.playerText}>
									<Text style={styles.item}>{item}</Text>
									<Text style={styles.itemDetail}>
										{players[item].quarter}
										{players[item].time}
									</Text>
								</View>
							</View>
						)}
						keyExtractor={(item, index) => index.toString()}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={onRefresh}
								tintColor="#F1FAEE"
							/>
						}
						extraData={data.update}
					/>
				)}
			</View>
		);
	};

	const offScreen = () => {
		return (
			<View
				style={{
					width: '100%',
					height: '100%',
					backgroundColor: '#6d6875',
					flex: 7,
				}}
			>
				{playerOff.length === 0 ? (
					<View style={styles.imagePlaceholderContainer}>
						<View style={{marginTop: "-25%"}}>
							<RefreshingBeverage />
							<Text style={styles.imagePlaceholderText}>
								None of the players you follow are off the court
							</Text>
						</View>
					</View>
				) : (
					<FlatList
						data={playerOff}
						renderItem={({ item }) => (
							<View style={styles.playerView}>
								<Image
									style={styles.playerIcon}
									source={{ uri: players[item].icon }}
									transition={false}
								/>
								<View style={styles.playerText}>
									<Text style={styles.item}>{item}</Text>
									<Text style={styles.itemDetail}>
										{players[item].quarter}
										{players[item].time}
									</Text>
								</View>
							</View>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
			</View>
		);
	};

	const noGameScreen = () => {
		return (
			<View
				style={{
					width: '100%',
					height: '100%',
					backgroundColor: '#6d6875',
					flex: 7,
				}}
			>
				{playerNoGame.length === 0 ? (
					<View style={styles.imagePlaceholderContainer}>
						<View style={{marginTop: "-25%"}}>
							<GameDay />
							<Text style={styles.imagePlaceholderText}>
								Every player you follow have a game today
							</Text>
						</View>
					</View>
				) : (
					<FlatList
						data={playerNoGame}
						renderItem={({ item }) => (
							<View style={styles.playerView}>
								<Image
									style={styles.playerIcon}
									source={{ uri: players[item].icon }}
									transition={false}
								/>
								<View style={styles.playerText}>
									<Text style={styles.item}>{item}</Text>
									<Text style={styles.itemDetail}>
										{players[item].quarter}
										{players[item].time}
									</Text>
								</View>
							</View>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
			</View>
		);
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
						<Tab.Navigator
							tabBarOptions={{
								style: styles.sectionHeader,
								labelStyle: styles.tabText,
								activeTintColor: 'white',
								indicatorStyle: { backgroundColor: '#f0efeb' },
							}}
						>
							<Tab.Screen name="ON" component={onScreen} />
							<Tab.Screen name="OFF" component={offScreen} />
							<Tab.Screen name="NO GAME" component={noGameScreen} />
						</Tab.Navigator>
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
		flex: 1,
		backgroundColor: '#6d6875',
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
		color: 'white',
	},
	playerText: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		textAlign: 'left',
	},
	menuIcon: {
		margin: 15,
	},
	rightAction: {
		justifyContent: 'center',
		flex: 1,
		backgroundColor: '#ff4747',
	},
	actionText: {
		color: '#ffffff',
		fontWeight: '600',
		padding: 20,
		alignSelf: 'flex-end',
	},
	tabText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	tabOject: {
		backgroundColor: 'white',
		borderRadius: 25,
	},
	imagePlaceholderContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		top: -1,
	},
	imagePlaceholderText: {
		textAlign: 'center',
		color: '#F1FAEE',
		top: '10%'
	},
});

export default HomeScreen;

/*
<View
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: '#6d6875',
							flex: 7,
						}}
					>
						<SectionList
							sections={[
								{ title: 'ON', data: playerOn },
								{ title: 'OFF', data: playerOff },
								{ title: 'NO GAMES', data: playerNoGame },
							]}
							renderItem={({ item, index }) => (
								<Swipeable renderRightActions={rightActions}>
									<View style={styles.playerView}>
										<Image
											style={styles.playerIcon}
											source={{ uri: players[item].icon }}
											transition={false}
										/>
										<View style={styles.playerText}>
											<Text style={styles.item}>{item}</Text>
											<Text style={styles.itemDetail}>
												{players[item].quarter}
												{players[item].time}
											</Text>
										</View>
									</View>
								</Swipeable>
							)}
							renderSectionHeader={({ section }) => (
								<Text style={styles.sectionHeader}>{section.title}</Text>
							)}
							keyExtractor={(item, index) => index}
							refreshControl={
								<RefreshControl
									refreshing={refreshing}
									onRefresh={onRefresh}
									tintColor="#F1FAEE"
								/>
							}
							extraData={data.update}
						/>
          </View>
          */
