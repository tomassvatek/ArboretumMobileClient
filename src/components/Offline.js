import React, { Component } from 'react'
import { Text, View } from 'react-native'
import * as offline from '../styles/offline.style';

export default class Offline extends Component {
  render() {
    if(this.props.isVisible) {
      return (
        <View style={offline.style.container}>
          <View style={offline.style.innerContainer}>
              <Text style={offline.style.errorMessage}>Nemáte připojení k internetu.</Text>
          </View>
        </View>
      )
    }
    return (
      <View></View>
    )
  }
}
