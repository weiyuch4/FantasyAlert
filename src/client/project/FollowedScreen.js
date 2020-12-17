import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import {
	Image,
	SectionList,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchApp from './SearchBar';
import Context from './Context';
import getAllPlayerStatus from './PlayerStatus';
import Void from './illustrations/Void';

const FollowedScreen = ({ route, navigation }) => {
	const data = useContext(Context);

	const players = getAllPlayerStatus(data.followed);

	const playerNames = Object.keys(players),
				playerInfo = Object.values(players),
				playerIcons = playerInfo.map(player => player['icon']);

	const unfollowPlayer = playerName => {
		if (data.followed[playerName]) {
			const temp = { ...data.followed };
			delete temp[playerName];
			data.setFollowed(temp);
		} else {
			console.log('Error: unfollowPlayer');
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

	useEffect(() => {
		storeData(data.followed);
	}, [data.followed]);

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
						{playerNames.length === 0 ? (
							<View style={styles.imagePlaceholderContainer}>
								<Text style={styles.noDataSectionHeader}>
										Followed Players
								</Text>
								<View style={{marginTop: "-25%"}}>
									<Void />
									<Text style={styles.imagePlaceholderText}>
										You are not following anyone
									</Text>
								</View>
							</View>
						) : (
						<SectionList
							sections={[{ title: 'Followed Players', data: playerNames }]}
							renderItem={({ item, index }) => (
								<View style={styles.playerView}>
									<Image
										style={styles.playerIcon}
										source={{ uri: playerIcons[index] }}
										transition={false}
									/>
									<View style={styles.playerText}>
										<Text style={styles.item}>{item}</Text>
										<TouchableHighlight
											onPress={() => unfollowPlayer(item)}
											style={styles.button}
										>
											<Text style={styles.buttonText}>Unfollow</Text>
										</TouchableHighlight>
									</View>
								</View>
							)}
							renderSectionHeader={({ section }) => (
								<Text style={styles.sectionHeader}>{section.title}</Text>
							)}
							keyExtractor={(item, index) => index}
						/>
						)}
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
	noDataSectionHeader: {
		color: '#F1FAEE',
		backgroundColor: '#6d6875',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'left',
		paddingLeft: 15,
		bottom: '25%',
	},
	sectionHeader: {
		color: '#F1FAEE',
		backgroundColor: '#6d6875',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'left',
		paddingLeft: 15,
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

export default FollowedScreen;
