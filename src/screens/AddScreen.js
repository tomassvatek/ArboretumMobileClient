import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';

import * as config from '../config';
import {reverseGeocode} from '../utils';

class AddScreen extends Component {

  state = {
    address: ''
  }

  componentDidMount() {
    this._setAddress();
  }

  _setAddress = () => {
    if(this.props.location) {
      let { location } = this.props.location;
      let { latitude, longitude } = location;
      reverseGeocode(latitude, longitude).then((address) => {
        this.setState({address});
      })
    } 
  }

  _handleAddButtonPress = () => {
    console.log('Press the add tree button');
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.wrapperStyle}>
          <FormLabel 
            labelStyle={styles.formLabelStyle}>Název stromu</FormLabel>
          <FormInput
            inputStyle={styles.formInputStyle}
            placeholderTextColor={config.INPUT_PLACEHOLDER_COLOR}
            underlineColorAndroid='transparent'
            placeholder='Název stromu'/>
          <FormLabel labelStyle={styles.formLabelStyle}>Poloha stromu</FormLabel>
          <FormInput
            inputStyle={styles.formInputStyle}
            placeholderTextColor={config.INPUT_PLACEHOLDER_COLOR}
            underlineColorAndroid='transparent'
            editable={false}
            value={this.state.address}
            placeholder='Poloha stromu'/>
          <Button 
            buttonStyle={styles.buttonStyle}
            //containerViewStyle={{width: '100%'}}
            icon={{name: 'add', color: config.SECONDARY_COLOR}}
            color={config.SECONDARY_COLOR}
            title='Přidat strom'
            onPress={this._handleAddButtonPress} />
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
    //alignItems: 'center',
    //marginLeft: 17,
    //marginRight: 17
  },
  formInputStyle: {
    height: 40,
    backgroundColor: config.INPUT_BACKGROUND_COLOR,
    paddingLeft: 15,
    color: config.INPUT_COLOR,
    marginBottom: 20,
    borderRadius: 5
  },
  formLabelStyle: {
    marginBottom: 5,
    paddingLeft: 1,
    color: config.SECONDARY_COLOR,
  },
  buttonStyle: {
    // backgroundColor: config.SECONDARY_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: config.SECONDARY_COLOR,
    backgroundColor: 'transparent',
    marginTop: 15
  }
}

function mapStateToProps(state) {
  return {
    location: state.location
  };
}

export default connect(mapStateToProps) (AddScreen)