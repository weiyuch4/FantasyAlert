import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
import SearchApp from './SearchBar';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <View style={{ width: '100%', height: 105, backgroundColor: '#1D3557' }}>
        <StatusBar style="auto" />
        <SearchApp style={{ backgroundColor: '#457B9D' }} navigation={navigation} />
      </View>
      <View style={{ width: '100%', height: '100%', backgroundColor: '#1D3557'}}>
        <SectionList
          sections={[
            {title: 'ON', data: ['Player1', 'Player2', 'Player3']},
            {title: 'OFF', data: ['Player4', 'Player5']},
          ]}
          renderItem={({item}) => 
            <View style={styles.playerView}>
              <Text style={styles.item}>{item}</Text>
              <Text style={styles.itemDetail}>4th Quarter - 2:20</Text>
              <Image style={styles.playerIcon} source={require('./logos/nba/lakers.png')}/>
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
    top: -50
  },
  item: {
    color: '#F1FAEE', 
    fontSize: 22, 
    fontWeight: 'bold', 
    left: 81,
    top: 8,
  },
  itemDetail: {
    color: '#F1FAEE', 
    fontSize: 18, 
    fontWeight: '500', 
    left: 81,
    paddingTop: 10
  },
});

export default HomeScreen;