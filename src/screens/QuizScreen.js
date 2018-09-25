import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {Icon} from 'react-native-elements';

class QuizScreen extends Component {
  static navigationOptions = {
    title: 'Kvíz',
    tabBarIcon: ({tintColor}) => {
      return <Icon name='question-answer' size={27} color={tintColor}/>;
    }
  };

  render() {
    return (
      <View style={{flex:1}}>
        <Text>QuizScreen</Text>
        <Text>QuizScreen</Text>
        <Text>QuizScreen</Text>
        <Text>QuizScreen</Text>
        <Text>QuizScreen</Text>
      </View>
    )
  }
}

export default QuizScreen;