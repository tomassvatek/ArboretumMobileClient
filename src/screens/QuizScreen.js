import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {Icon} from 'react-native-elements';

import ScoreBoard from '../components/Scoreboard';

class QuizScreen extends Component {
  static navigationOptions = {
    title: 'Kvíz',
    tabBarIcon: ({tintColor}) => {
      return <Icon name='question-answer' size={27} color={tintColor}/>;
    }
  }

  state = {
    correct: 0,
    total: 5
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={{height:70}}>
          <ScoreBoard 
            correct={this.state.correct}
            total={this.state.total} />
        </View>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    // REFACTOR STATUS BAR
    marginTop: 25
  }
}

export default QuizScreen;