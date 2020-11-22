import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, SectionList, StyleSheet, Text, View } from 'react-native';
import SearchApp from './SearchBar';

export default function HomeScreen({ navigation }) {
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
  playerView: {
    width: '100%',
    height: 67,
    backgroundColor: '#1D3557',
    padding: 0
  },
  sectionHeader: {
    color: '#F1FAEE', 
    fontSize: 24, 
    fontWeight: 'bold', 
    left: 14,
    marginVertical: 21
  },
  item: {
    color: '#F1FAEE', 
    fontSize: 22, 
    fontWeight: 'bold', 
    left: 81,
    top: 8
  },
});
