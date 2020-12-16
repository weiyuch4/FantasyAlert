import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchApp from './SearchBar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const SettingsScreen = ({ navigation }) => {

  const allSettings = ['Account', 'Notifications'];
	
	/*
	const onPressButton = (props) => {
		navigation.navigate('', { selected: props });
	};*/

	const onPressButton = (props) => {
		alert('Tina');
	};

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
				<ScrollView>
					<View style={styles.settingView}>
						<TouchableOpacity onPress={onPressButton} activeOpacity={0.5}>
							<View style={styles.settinglist}>
								<Icon name={'person'} size={30} color={'#f0efeb'} />
								<View style={styles.setting}>
									<Text style={styles.textItem}>Account</Text>
									<Icon name={'keyboard-arrow-right'} size={30} color={'#f0efeb'} style={{alignSelf: 'flex-end'}}/>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={onPressButton} activeOpacity={0.5}>
							<View style={styles.settinglist}>
								<Icon name={'notifications'} size={30} color={'#f0efeb'} />
								<View style={styles.setting}>
									<Text style={styles.textItem}>Notifications</Text>
									<Icon name={'keyboard-arrow-right'} size={30} color={'#f0efeb'} style={{alignSelf: 'flex-end'}}/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	settingView: {
		backgroundColor: '#6d6875',
		flexDirection: 'column',
	},
	setting: {
		flex: 1, 
		flexDirection: 'row', 
		justifyContent: 'space-between',
	},
	textItem: {
		color: '#f0efeb',
		fontSize: 22,
		fontWeight: 'bold',
		paddingLeft: 25,
		alignSelf: 'center',
	},
	settinglist: {
		display: 'flex',
		flexDirection: 'row',
		//borderBottomColor: '#cdcacc',
		//borderBottomWidth: 1,
		margin: 15,
		padding: 8,
		justifyContent: 'space-between',
		
	},
	arrowView: {
		alignSelf: 'flex-end',
	}
});

export default SettingsScreen;
