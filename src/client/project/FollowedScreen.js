import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Image, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import SearchApp from './SearchBar';
import Context from './Context';
import getAllPlayerStatus from './PlayerStatus';

const FollowedScreen = ({ route, navigation }) => {

	const data = useContext(Context);
  
  const players = getAllPlayerStatus(data.followed);

  const playerNames = Object.keys(players),
        playerInfo = Object.values(players),
        playerIcons = playerInfo.map(player => player['icon']);
	
	const unfollowPlayer = (playerName) => {
		if (data.followed[playerName]) {
			const temp = {...data.followed};
			delete temp[playerName];
			data.setFollowed(temp);
		} else {
			console.log('Error: unfollowPlayer');
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
              { title: 'Followed Players', data: playerNames },
            ]}
            renderItem={({ item, index }) => (
              <View style={styles.playerView}>
                <Image
                  style={styles.playerIcon}
                  source={{uri: playerIcons[index]}}
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
		backgroundColor: '#457B9D',
		alignSelf: 'flex-end',
		width: 68,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		padding: 3,
		fontWeight: 'bold',
	},
});

export default FollowedScreen;
