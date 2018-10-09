import React, { Component } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import * as config from '../config';

class SearchInput extends Component {
  render() {
    return (
      <TextInput
        style={styles.textInputStyle}
        placeholder={this.props.placeholder}
        placeholderTextColor= {config.INPUT_PLACEHOLDER_COLOR}
        underlineColorAndroid='transparent'>
      </TextInput>
    )
  }
}

SearchInput.defaultProps = {
    placeholder: 'Type something...'
}

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize: 18,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'stretch'
  }
});


export default SearchInput;