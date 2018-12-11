import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as notification from '../styles/notification.style';

export default class Notification extends Component {
  render() {
    if(this.props.isVisible) {
      return (
        <View style={[notification.style.notificationBaseContainer, 
          this.props.notificationStyle ? this.props.notificationStyle : {}]}
        >
          <TouchableOpacity 
            onPress={this.props.onNotificationPress}
            >
              <Text style={[{color: this.props.textColor}, {textAlign: 'center'}]}>{this.props.notificationMessage}</Text>
            </TouchableOpacity>
        </View>
      )
    }
    return (
      <View></View>
    )
  }
}
