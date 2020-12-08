import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
import SearchApp from './SearchBar';

const TeamScreen = ({ navigation }) => {

  const [teams, setTeams] = useState({});

  const callAPI = () => {
    fetch(`http://192.168.1.65:3000/testTeamUrl`, {
        method: 'GET',
    },
    )
      .then(res => {
        if (res.ok) {
          res.json().then(res => setTeams({...res}));
        } else {
          throw new Error('Something went wrong');
        }
      })
      .catch((error) => {
        console.log(error);
    });
    
  };

  useEffect(() => {
    callAPI();
  }, []);

  const teamNames = Object.keys(teams);
  const teamInfo = Object.values(teams);

  const teamLogos = {
    'Boston Celtics': require('./logo/0.png'),'Brooklyn Nets': require('./logo/1.png'),'New York Knicks': require('./logo/2.png'),'Philadelphia 76ers': require('./logo/3.png'),'Toronto Raptors': require('./logo/4.png'),
    'Chicago Bulls': require('./logo/5.png'),'Cleveland Cavaliers': require('./logo/6.png'),'Detroit Pistons': require('./logo/7.png'),'Indiana Pacers': require('./logo/8.png'),'Milwaukee Bucks': require('./logo/9.png'),
    'Denver Nuggets': require('./logo/10.png'),'Minnesota Timberwolves': require('./logo/11.png'),'Oklahoma City Thunder': require('./logo/12.png'),'Portland Trail Blazers': require('./logo/13.png'),'Utah Jazz': require('./logo/14.png'),
    'Golden State Warriors': require('./logo/15.png'),'LA Clippers': require('./logo/16.png'),'Los Angeles Lakers': require('./logo/17.png'),'Phoenix Suns': require('./logo/18.png'),'Sacramento Kings': require('./logo/19.png'),
    'Atlanta Hawks': require('./logo/20.png'),'Charlotte Hornets': require('./logo/21.png'),'Miami Heat': require('./logo/22.png'),'Orlando Magic': require('./logo/23.png'),'Washington Wizards': require('./logo/24.png'),
    'Dallas Mavericks': require('./logo/25.png'),'Houston Rockets': require('./logo/26.png'),'Memphis Grizzlies': require('./logo/27.png'),'New Orleans Pelicans': require('./logo/28.png'),'San Antonio Spurs': require('./logo/29.png'),
  }

  return (
    <View>
      <View style={{ width: '100%', height: 105, backgroundColor: '#1D3557' }}>
        <StatusBar style="auto" />
        <SearchApp style={{ backgroundColor: '#457B9D' }} navigation={navigation} />
      </View>
      <View style={{ width: '100%', height: '100%', backgroundColor: '#1D3557'}}>
        <SectionList
          sections={[
            {title: 'Atlantic', data: teamNames.slice(0, 5)},
            {title: 'Central', data: teamNames.slice(5, 10)},
            {title: 'Northwest', data: teamNames.slice(10, 15)},
            {title: 'Pacific', data: teamNames.slice(15, 20)},
            {title: 'Southeast', data: teamNames.slice(20, 25)},
            {title: 'Southwest', data: teamNames.slice(25, 30)},
          ]}
          renderItem={({item, index}) => 
            <View style={styles.playerView}>
              <Text style={styles.item}>{item}</Text>
              <Image style={styles.playerIcon} source={teamLogos[item]}/>
            </View>
          }
          renderSectionHeader={({section}) => 
          <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    color: '#F1FAEE', 
    fontSize: 24, 
    fontWeight: 'bold', 
    left: 14,
    marginVertical: 21
  },
  playerView: {
    width: '100%',
    height: 67,
    backgroundColor: '#1D3557',
  },
  playerIcon: {
    width: 50,
    height: 50,
    left: 14,
    top: -20,
  },
  item: {
    color: '#F1FAEE', 
    fontSize: 22, 
    fontWeight: 'bold', 
    left: 81,
    top: 20,
  },
  itemDetail: {
    color: '#F1FAEE', 
    fontSize: 18, 
    fontWeight: '500', 
    left: 81,
    paddingTop: 10
  },
});

export default TeamScreen;