import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Button, FormLabel, FormInput } from 'react-native-elements';
import * as config from '../config';


export default class ModalTester extends Component {
  state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal
            style={styles.modalStyle}
            isVisible={this.state.isModalVisible} 
            onBackdropPress={() => this.setState({ isModalVisible: false})}
        >
          <View style={styles.modalContent}>
            <View style={styles.innerModalContentStyle}>
                <Text>Copak je to za strom?</Text>
                <FormInput
                    inputStyle={styles.formInputStyle}
                    placeholderTextColor={config.INPUT_PLACEHOLDER_COLOR}
                    underlineColorAndroid='transparent'
                    placeholder='Zadejte strom:'/>
                <Button title="Potvrdit"/>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
    modalStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalContent: {
        height: 250,
        width: 250,
        borderRadius: 10,
        backgroundColor: 'white'
    },

    innerModalContentStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    formInputStyle: {
        height: 40,
        backgroundColor: config.INPUT_BACKGROUND_COLOR,
        paddingLeft: 15,
        color: config.INPUT_COLOR,
        marginBottom: 20,
        borderRadius: 5
      },
}