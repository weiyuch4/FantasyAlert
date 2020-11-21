import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
// import { MyStack, HomeScreen, ProfileScreen } from './index';
import SearchApp from './SearchBar';

export default function App() {
  return (
    <View style={{ width: 375, height: 175, backgroundColor: '#1D3557' }}>
      <StatusBar style="auto" />
      <SearchApp style={{ backgroundColor: '#457B9D' }}/>
      <Text style={{
        color: '#F1FAEE', 
        fontSize: 24, 
        fontWeight: 'bold', 
        left: 14,
        top: 21
      }}>ON</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
