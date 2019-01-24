import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const Scoreboard = ({correct, total}) => 
    <View style={styles.containerStyle}>
      <Text style={styles.correctStyle}>
          Správně: {correct}
      </Text>
      <Text style={styles.totalStyle}>
          Zbývá: {total}
      </Text>
    </View>

// Scoreboard.propTypes = {
//     correct: PropTypes.number.isRequired,
//     total: PropTypes.number.isRequired
// }

export default Scoreboard;


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

