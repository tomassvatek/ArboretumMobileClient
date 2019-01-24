import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity, ViewPropTypes  } from 'react-native'

import * as notification from '../styles/notification.style'

const Notification = ({isVisible, notificationMessage, notificationStyle, textColor, onNotificationPress}) => {
    if(isVisible) {
      return (
        <View style={[notification.style.notificationBaseContainer, 
          notificationStyle]}
        >
          <TouchableOpacity 
            onPress={onNotificationPress}
            >
              <Text style={[{color: textColor}, {textAlign: 'center'}]}>{notificationMessage}</Text>
            </TouchableOpacity>
        </View>
      )
    }
    return (
      <View></View>
    )
}

Notification.propTypes = {
  isVisible: PropTypes.bool,
  notificationMessage: PropTypes.string,
  notificationStyle: ViewPropTypes.style,
  textColor: PropTypes.string,
  onNotificationPress: PropTypes.func
}

Notification.defaultProps = {
  isVisible: false,
  notificationMessage: '',
  notificationStyle: {},
  textColor: '#000',
  onNotificationPress: () => {}
}

export default Notification;

