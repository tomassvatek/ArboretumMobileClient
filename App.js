import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Button} from 'react-native-elements';

import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import AddScreen from './src/screens/AddScreen';
import AuthScreen from './src/screens/AuthScreen';
import EditScreen from './src/screens/EditScreen';
import DetailScreen from './src/screens/DetailScreen';
import FilterScreen from './src/screens/FilterScreen';
import MainScreen from './src/screens/MainScreen';
import QuizScreen from './src/screens/QuizScreen';


const DATA = [
  {name: 'Lipa', text: 'popularni strom'},
  {name: 'Lipa', text: 'popularni strom'},
  {name: 'Lipa', text: 'popularni strom'},
  {name: 'Lipa', text: 'popularni strom'}
]



export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      auth: {screen: AuthScreen},
      main: createBottomTabNavigator({
        main: {screen: MainScreen},
        quiz: {screen: QuizScreen}
      })
    });

    return (
      <View style={styles.container}>
        <StatusBar 
          barStyle='light-content'/>
        <MainNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
