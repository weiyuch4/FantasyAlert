import React, { useContext, useEffect, useState, useRef } from 'react';
import {
	Dimensions,
	Platform,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	View,
	ScrollView,
	Keyboard,
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import Animated, { Easing } from 'react-native-reanimated';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheSearch from './illustrations/TheSearch';
import Context from './Context';

const SearchApp = props => {
	const { Value, timing } = Animated;
	const width = Dimensions.get('window').width;
	const height = Dimensions.get('window').height;

	const [search, setSearch] = useState('');
	const [filteredData, setFilteredData] = useState([]);
	const [masterData, setMasterData] = useState([]);
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef(null);

	const inputBoxTranslateX = useRef(new Value(width)).current,
				backButtonOpacity = useRef(new Value(0)).current,
				contentTranslateY = useRef(new Value(height)).current,
				contentOpacity = useRef(new Value(0)).current;

	const data = useContext(Context);
	const allPlayerData = require('./search-full-roster.json');

	useEffect(() => {
		setFilteredData(allPlayerData);
		setMasterData(allPlayerData);
	}, []);

	useEffect(() => {
		storeData(data.followed);
	}, [data.followed]);

	const onFocus = () => {
		setIsFocused(true);
		// input box
		const inputBoxTranslateXConfig = {
			duration: 200,
			toValue: 0,
			easing: Easing.inOut(Easing.ease),
		};
		const backButtonOpacityConfig = {
			duration: 200,
			toValue: 1,
			easing: Easing.inOut(Easing.ease),
		};
		// content
		const contentTranslateYConfig = {
			duration: 0,
			toValue: 0,
			easing: Easing.inOut(Easing.ease),
		};
		const contentOpacityConfig = {
			duration: 200,
			toValue: 1,
			easing: Easing.inOut(Easing.ease),
		};

		timing(inputBoxTranslateX, inputBoxTranslateXConfig).start();
		timing(backButtonOpacity, backButtonOpacityConfig).start();
		timing(contentTranslateY, contentTranslateYConfig).start();
		timing(contentOpacity, contentOpacityConfig).start();
	};

	const onBlur = () => {
		setIsFocused(false);
		// input box
		const inputBoxTranslateXConfig = {
			duration: 200,
			toValue: width,
			easing: Easing.inOut(Easing.ease),
		};
		const backButtonOpacityConfig = {
			duration: 50,
			toValue: 0,
			easing: Easing.inOut(Easing.ease),
		};
		// content
		const contentTranslateYConfig = {
			duration: 0,
			toValue: height,
			easing: Easing.inOut(Easing.ease),
		};
		const contentOpacityConfig = {
			duration: 200,
			toValue: 0,
			easing: Easing.inOut(Easing.ease),
		};

		timing(inputBoxTranslateX, inputBoxTranslateXConfig).start();
		timing(backButtonOpacity, backButtonOpacityConfig).start();
		timing(contentTranslateY, contentTranslateYConfig).start();
		timing(contentOpacity, contentOpacityConfig).start();
	};

	const onChangeSearch = query => {
		if (query) {
			const newData = masterData.filter(function (item) {
				const itemKey = Object.keys(item)[0]
					? Object.keys(item)[0].toUpperCase()
					: ''.toUpperCase();
				const upperQuery = query.toUpperCase();
				if (itemKey.includes(upperQuery)) {
					return itemKey;
				}
			});
			setFilteredData(newData);
			setSearch(query);
		} else {
			setFilteredData(masterData);
			setSearch(query);
		}
	};

	const addPlayer = (playerName, playerTeam, playerIcon) => {
		if (data.followed[playerName]) {
			const temp = { ...data.followed };
			delete temp[playerName];
			data.setFollowed(temp);
		} else {
			data.setFollowed({
				...data.followed,
				[playerName]: [playerTeam, playerIcon],
			});
		}
	};

	const updateText = (playerName) => {
		if (data.followed[playerName]) {
			return 'Unfollow';
		} else {
			return 'Follow';
		}
	};

	const ItemView = ({ item }) => {
		return (
			<View style={styles.playerView}>
				<Image
					style={styles.playerIcon}
					source={{ uri: Object.values(item)[0][1] }}
					transition={false}
				/>

				<View style={styles.playerText}>
					<Text style={styles.item}>{Object.keys(item)[0]}</Text>
					<TouchableOpacity
						onPress={() =>
							addPlayer(
								Object.keys(item)[0],
								Object.values(item)[0][0],
								Object.values(item)[0][1]
							)
						}
						style={styles.button}
					>
						<Text style={styles.buttonText}>{`${updateText(
							Object.keys(item)[0]
						)}`}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
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

	return (
		<>
			<SafeAreaView style={styles.headerSafeArea}>
				<View style={styles.header}>
					<View style={styles.headerInner}>
						<Icon
							name="menu"
							size={30}
							color="#F1FAEE"
							onPress={() => props.navigation.openDrawer()}
							style={styles.menuIcon}
						/>
						<TouchableOpacity
							activeOpacity={0.5}
							underlayColor={'#CCD0D5'}
							onPress={onFocus}
							style={styles.searchIconBox}
						>
							<Icon name={'search'} size={30} color={'#F1FAEE'} />
						</TouchableOpacity>
						<Animated.View
							style={[
								styles.inputBox,
								{ transform: [{ translateX: inputBoxTranslateX }] },
							]}
						>
							<Animated.View style={{ opacity: backButtonOpacity }}>
								<TouchableOpacity
									activeOpacity={0.5}
									underlayColor={'#CCD0D5'}
									onPress={onBlur}
									style={styles.backIconBox}
									onPressOut={Keyboard.dismiss}
								>
									<Icon name={'arrow-back'} size={30} color={'#F1FAEE'} />
								</TouchableOpacity>
							</Animated.View>
							<TextInput
								ref={inputRef}
								placeholder="Search"
								clearButtonMode="always"
								value={search.value}
								onChangeText={query => onChangeSearch(query)}
								style={styles.input}
							/>
						</Animated.View>
					</View>
				</View>
			</SafeAreaView>

			<Animated.View
				style={[
					styles.content,
					{
						opacity: contentOpacity,
						transform: [{ translateY: contentTranslateY }],
					},
				]}
			>
				<SafeAreaView style={styles.contentSafeArea}>
					<View style={styles.contentInner}>
						<View style={styles.separator} />
						{search === '' ? (
							<View style={styles.imagePlaceholderContainer}>
								<View style={{marginTop: "25%"}}>
									<TheSearch />
									<Text style={styles.imagePlaceholderText}>
										Enter a few words to search
									</Text>
								</View>
							</View>
						) : (
							<FlatList
								data={filteredData}
								keyExtractor={(item, index) => index.toString()}
								renderItem={ItemView}
							/>
						)}
					</View>
				</SafeAreaView>
			</Animated.View>
		</>
	);
};

const styles = StyleSheet.create({
	headerSafeArea: {
		zIndex: 1000,
	},
	header: {
		height: 100,
		paddingHorizontal: 16,
	},
	headerInner: {
		flex: 1,
		overflow: 'hidden',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative',
	},
	menuIcon: {},
	searchIconBox: {
		width: 40,
		height: 40,
		borderRadius: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputBox: {
		height: 100,
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: '#6d6875',
		width: Dimensions.get('window').width - 32,
	},
	backIconBox: {
		width: 40,
		height: 40,
		borderRadius: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 5,
	},
	input: {
		flex: 1,
		height: 40,
		backgroundColor: '#e4e6eb',
		borderRadius: 16,
		paddingHorizontal: 16,
		fontSize: 15,
	},
	content: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		position: 'absolute',
		left: 0,
		bottom: 0,
		zIndex: 999,
	},
	contentSafeArea: {
		flex: 1,
		backgroundColor: '#6d6875',
	},
	contentInner: {
		flex: 1,
		paddingTop: 50,
	},
	separator: {
		marginTop: 50,
		height: 0,
		backgroundColor: '#e6e4eb',
	},
	imagePlaceholderContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: '-50%',
	},
	imagePlaceholderText: {
		textAlign: 'center',
		color: '#F1FAEE',
		top: '10%'
	},
	searchItem: {
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#e6e4eb',
		marginLeft: 16,
	},
	item_icon: {
		marginRight: 15,
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
	playerText: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		textAlign: 'left',
	},
	item: {
		color: '#F1FAEE',
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
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
});

export default SearchApp;
