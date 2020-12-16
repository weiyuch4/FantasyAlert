import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
	Image,
	FlatList,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
} from 'react-native';
import { API_URL } from 'react-native-dotenv';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchApp from './SearchBar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon } from 'react-native-elements';

const SettingsScreen = ({ navigation }) => {

  const allSettings = ['Account', 'Notifications'];
	
	/*
	const onPressButton = (props) => {
		navigation.navigate('', { selected: props });
	};*/

	return (
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
				<View style={styles.settingView}>
					<View style={styles.settinglist}>
						<Icon name={'person'} size={30} color={'#f0efeb'} />
						<Text style={styles.textItem}>Account</Text>
					</View>
					<View style={styles.settinglist}>
						<Icon name={'notifications'} size={30} color={'#f0efeb'} />
						<Text style={styles.textItem}>Notifications</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	settingView: {
		backgroundColor: '#6d6875',
		flexDirection: 'column',
	},
	textItem: {
		color: '#f0efeb',
		fontSize: 22,
		fontWeight: 'bold',
		paddingLeft: 25,
	},
	settinglist: {
		display: 'flex',
		flexDirection: 'row',
		//borderBottomColor: '#cdcacc',
		//borderBottomWidth: 1,
		margin: 15,
		padding: 8,
		alignItems: 'center',
	}
});

export default SettingsScreen;
