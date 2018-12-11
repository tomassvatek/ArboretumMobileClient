import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import { Icon } from 'react-native-elements';

import store from './src/store';
import AddScreen from './src/screens/AddScreen';
import AuthScreen from './src/screens/AuthScreen';
import DetailScreen from './src/screens/DetailScreen';
import FilterScreen from './src/screens/FilterScreen';
import MainScreen from './src/screens/MainScreen';
import QuizScreen from './src/screens/QuizScreen';
import ModalTester from './src/screens/Modal';
import TestScreen from './src/screens/geolocationTest';
import { MAIN_SCREEN, DETAIL_SCREEN, ADD_SCREEN, QUIZ_SCREEN } from './src/config/screen-routes';
import QuizGuideScreen from './src/screens/QuizGuideScreen';
import LearningScreen from './src/screens/LearningScreen';


export default class App extends React.Component {
  render() {

    const HomeStack = createStackNavigator({
      main_screen: {screen: MainScreen},
      detail_screen: {screen: DetailScreen},
      add_screen: {screen: AddScreen}
    });

    const QuizStack = createStackNavigator({
      quiz_guide_screen: { screen: QuizGuideScreen },
      quiz_screen: { screen: QuizScreen }
    });

    const AppNavigator = createBottomTabNavigator({
      Home: {
         screen: HomeStack,
         navigationOptions: {
           tabBarLabel: 'Home',
           tabBarIcon: ({tintColor, focused}) => (
            <Icon name='home' size={27} color={tintColor}/>
           ),
         },
      },
      Learning: { 
        screen: LearningScreen,
        navigationOptions: {
          tabBarLabel: 'Knihovna',
          tabBarIcon: ({tintColor, focused}) => (
           <Icon name='local-library' size={27} color={tintColor}/>
          ),
        }, 
      },
      Quiz: {
        screen: QuizStack,
        navigationOptions: {
          tabBarLabel: 'Kvíz',
          tabBarIcon: ({tintColor, focused}) => (
           <Icon name='question-answer' size={27} color={tintColor}/>
          ),
        },
      },
    })
    return (
      <Provider store={store}>
          <AppNavigator/>
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
