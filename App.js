import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Button} from 'react-native-elements';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Provider} from 'react-redux';

import store from './src/store';
import AddScreen from './src/screens/AddScreen';
import AuthScreen from './src/screens/AuthScreen';
import EditScreen from './src/screens/EditScreen';
import DetailScreen from './src/screens/DetailScreen';
import FilterScreen from './src/screens/FilterScreen';
import MainScreen from './src/screens/MainScreen';
import QuizScreen from './src/screens/QuizScreen';


export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      auth: {screen: AuthScreen},
      main: createBottomTabNavigator({
        main: createStackNavigator({
          main: {screen: MainScreen},
          detail: {screen: DetailScreen},
          filter: {screen: FilterScreen},
          add: {screen: AddScreen}
        }),
        quiz: {screen: QuizScreen}
      })
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
