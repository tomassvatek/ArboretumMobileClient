import React from 'react';
import { StyleSheet} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import { Icon } from 'react-native-elements';

import store from './src/store';
import AddScreen from './src/screens/add-screen';
import DetailScreen from './src/screens/detail-screen';
import MainScreen from './src/screens/main-screen';
import QuizScreen from './src/screens/quiz-screen';
import { MAIN_SCREEN, DETAIL_SCREEN, ADD_SCREEN, QUIZ_SCREEN } from './src/config/screen-routes';
import QuizGuideScreen from './src/screens/quiz-guide-screen';
import LearningScreen from './src/screens/learning-screen';


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
