import React, { Component } from "react";
import { Text, TouchableOpacity, View, TextInput, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { Button, FormLabel, FormInput } from 'react-native-elements';
import * as config from '../config';
import AutocompleteInput from "../components/autocomplete-input";


const DATA = [
  {
    commonName: "buk"
  },
  {
    commonName: "buk"
  },
  {
    commonName: "buk"
  },
  {
    commonName: "javor"
  }
]

export default class ModalTester extends Component {
  state = {
    isModalVisible: true
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
            deviceHeight={Dimensions.get('screen').height}
            deviceWidth={Dimensions.get('screen').width}
            onBackdropPress={() => this.setState({ isModalVisible: false})}
        >
          <View style={styles.modalContent}>
            <View style={styles.innerModalContentStyle}>
              
                  <View style={styles.autocomplete}>
                    <AutocompleteInput
                      //autocompleteContainerStyle={styles.autocomplete}
                      autocompleteItems={DATA}
                      filterProperty="commonName"
                      itemsCount={2}
                      placeholder="Zadejte odpověď"
                    />
                  </View>
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
        alignItems: 'center',
        borderRadius: 10
    },

    modalContent: {
        height: 350,
        width: '95%',
        backgroundColor: config.PRIMARY_COLOR,
        borderRadius: 10
    },

    innerModalContentStyle: {
        flex: 1,
        backgroundColor: config.PRIMARY_COLOR,
        borderRadius: 10
        //marginLeft: 20,
        //marginRight: 20
    },
      autocomplete: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        marginRight: 10,
        marginLeft: 10,
        //marginBottom: 10
      }
}