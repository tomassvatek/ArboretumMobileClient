import React, { Component } from 'react'
import { Text, View } from 'react-native'

class MapCallout extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

const styles = {
    containerStyle: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
    }
}


export default MapCallout;