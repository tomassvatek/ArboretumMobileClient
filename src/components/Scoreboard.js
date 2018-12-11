import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

class Scoreboard extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.correctStyle}>
            Správně: {this.props.correct}
        </Text>
        <Text style={styles.totalStyle}>
            Zbývá: {this.props.total}
        </Text>
      </View>
    )
  }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    correctStyle: {
        fontSize: 17,
        color: '#4EA64E'
    },
    totalStyle: {
        fontSize: 17
    }
}

Scoreboard.propTypes = {
    correct: PropTypes.number.isRequired,
    total: PropTypes.isRequired
}


export default Scoreboard;