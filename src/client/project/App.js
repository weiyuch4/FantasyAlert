import React from 'react';
import { createDrawerNavigation, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{
          backgroundColor: '#2B5085'
        }}
        drawerContentOptions={{
          labelStyle: {color: '#F1FAEE', fontSize: 22, fontWeight: "bold"}
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}