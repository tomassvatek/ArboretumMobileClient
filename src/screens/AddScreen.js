import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import {Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

import * as config from '../config';


class AddScreen extends Component {
  handleAddButtonPress = () => {
    console.log('press');
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.wrapperStyle}>
          <FormInput
            inputStyle={styles.formInputStyle}
            placeholderTextColor={config.INPUT_PLACEHOLDER_COLOR}
            underlineColorAndroid='transparent'
            placeholder="Název stromu"/>
          <FormInput
            inputStyle={styles.formInputStyle}
            placeholderTextColor={config.INPUT_PLACEHOLDER_COLOR}
            underlineColorAndroid='transparent'
            placeholder="Latitude"/>
          <FormInput 
            inputStyle={styles.formInputStyle}
            placeholderTextColor={config.INPUT_PLACEHOLDER_COLOR}
            underlineColorAndroid='transparent'
            placeholder="Longitude"/>
          <Button 
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{width: '100%'}}
            icon={{name: 'add', color: config.SECONDARY_COLOR}}
            color={config.SECONDARY_COLOR}
            title="Přidat strom"
            onPress={this.handleAddButtonPress} />
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
    // backgroundColor: config.SECONDARY_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: config.SECONDARY_COLOR,
    backgroundColor: 'transparent'
  }
}

export default AddScreen;