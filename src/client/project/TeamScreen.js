import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import {
	Image,
	SectionList,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchApp from './SearchBar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon } from 'react-native-elements';
import Context from './Context';

const TeamScreen = ({ navigation }) => {

  const data = useContext(Context);
  const teams = data.teams;

	const teamNames = Object.keys(teams);

	const teamLogos = {
		'Boston Celtics': require('./logo/0.png'),
		'Brooklyn Nets': require('./logo/1.png'),
		'New York Knicks': require('./logo/2.png'),
		'Philadelphia 76ers': require('./logo/3.png'),
		'Toronto Raptors': require('./logo/4.png'),
		'Chicago Bulls': require('./logo/5.png'),
		'Cleveland Cavaliers': require('./logo/6.png'),
		'Detroit Pistons': require('./logo/7.png'),
		'Indiana Pacers': require('./logo/8.png'),
		'Milwaukee Bucks': require('./logo/9.png'),
		'Denver Nuggets': require('./logo/10.png'),
		'Minnesota Timberwolves': require('./logo/11.png'),
		'Oklahoma City Thunder': require('./logo/12.png'),
		'Portland Trail Blazers': require('./logo/13.png'),
		'Utah Jazz': require('./logo/14.png'),
		'Golden State Warriors': require('./logo/15.png'),
		'LA Clippers': require('./logo/16.png'),
		'Los Angeles Lakers': require('./logo/17.png'),
		'Phoenix Suns': require('./logo/18.png'),
		'Sacramento Kings': require('./logo/19.png'),
		'Atlanta Hawks': require('./logo/20.png'),
		'Charlotte Hornets': require('./logo/21.png'),
		'Miami Heat': require('./logo/22.png'),
		'Orlando Magic': require('./logo/23.png'),
		'Washington Wizards': require('./logo/24.png'),
		'Dallas Mavericks': require('./logo/25.png'),
		'Houston Rockets': require('./logo/26.png'),
		'Memphis Grizzlies': require('./logo/27.png'),
		'New Orleans Pelicans': require('./logo/28.png'),
		'San Antonio Spurs': require('./logo/29.png'),
	};

	const onPressButton = (props) => {
		navigation.navigate('Roster', { team: props });
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
            <SectionList
              sections={[
                { title: 'Atlantic', data: teamNames.slice(0, 5) },
                { title: 'Central', data: teamNames.slice(5, 10) },
                { title: 'Northwest', data: teamNames.slice(10, 15) },
                { title: 'Pacific', data: teamNames.slice(15, 20) },
                { title: 'Southeast', data: teamNames.slice(20, 25) },
                { title: 'Southwest', data: teamNames.slice(25, 30) },
              ]}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  onPress={() => {
                    onPressButton(item);
                  }}
                  underlayColor="white"
                >
                  <View style={styles.playerView}>
                    <Image
                      style={styles.playerIcon}
                      source={teamLogos[item]}
                      transition={false}
                    />
                    <Text style={styles.item}>{item}</Text>
                  </View>
                </TouchableHighlight>
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
	sectionHeader: {
		color: '#F1FAEE',
		backgroundColor: '#6d6875',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'left',
		padding: 15,
	},
	playerView: {
		backgroundColor: '#f0efeb',
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#cdcacc',
		borderBottomWidth: 1,
	},
	playerIcon: {
		width: 50,
		height: 50,
		margin: 10,
	},
	item: {
		color: '#594e36',
		fontSize: 22,
		fontWeight: 'bold',
	},
	menuIcon: {
		margin: 15,
	},
});

export default TeamScreen;
