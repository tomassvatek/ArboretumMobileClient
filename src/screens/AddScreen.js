import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import {Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

import * as config from '../config';


class AddScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.wrapperStyle}>
          <FormInput
            inputStyle={styles.formInputStyle}
            placeholderTextColor={config.INPUT_PLACEHOLDER_COLOR}
            placeholder="Název stromu"/>
          <FormInput
            inputStyle={styles.formInputStyle}
            placeholderTextColor={config.INPUT_PLACEHOLDER_COLOR}
            placeholder="Latitude"/>
          <FormInput 
            inputStyle={styles.formInputStyle}
            placeholderTextColor={config.INPUT_PLACEHOLDER_COLOR}
            placeholder="Longitude"/>
          <Button 
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{width: '100%'}}
            icon={{name: 'add'}}
            title="Přidat strom"/>
        </View>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: config.PRIMARY_COLOR,
  },
  wrapperStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 17,
    marginRight: 17
  },
  formInputStyle: {
    height: 40,
    backgroundColor: config.INPUT_BACKGROUND_COLOR,
    paddingLeft: 15,
    color: config.INPUT_COLOR,
    marginBottom: 20,
    borderRadius: 5
  },
  buttonStyle: {
    backgroundColor: config.SECONDARY_COLOR,
    borderRadius: 5
  }
}

export default AddScreen;