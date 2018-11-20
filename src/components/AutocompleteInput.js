import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';

import {Icon} from 'react-native-elements';
import Autocomplete  from 'react-native-autocomplete-input';
import { BORDER_COLOR, INPUT_PLACEHOLDER_COLOR } from '../config';

class AutocompleteInput extends Component {
  
  state = {
      query: '',
      filteredData: []
  }

  _filterData = (value) => {
      console.log(this.props.autocompleteItems);
      if(value) {
        console.log(value);
        const filter = this.props.autocompleteItems.filter(i => i.toLowerCase().indexOf(value.toLowerCase()) === 0);
        const filteredData = filter.length > this.props.itemsCount ? filter.slice(0, this.props.itemsCount) : filter;
        this.setState({filteredData});
      } else {
        this.setState({filteredData: []});
      }
  }

  _onChangeText = (value) => {
      this._filterData(value);
  }

  _onItemPress = (item) => {
      this.setState({
          query: item, 
          filteredData: []
      });
  }

  _onButtonPress = () => {
      console.log("clik");
  }

  render() {
    return (
      <View style={styles.autocompleteContainer}>
        <Autocomplete
            data={this.state.filteredData}
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputContainerStyle={[styles.inputContainerStyle, this.state.filteredData.length === 0 ? {} : styles.listOpenStyle ]}
            listContainerStyle={styles.listContainerStyle}
            listStyle={styles.listStyle}
            placeholder={this.props.placeholder}
            placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
            data={this.state.filteredData}
            defaultValue={this.state.query}
            onChangeText={value => this._onChangeText(value)}
            renderItem={item => (
                <TouchableOpacity 
                    style={styles.listItemStyle} 
                    onPress={() => this._onItemPress(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
            )}
        />
        <TouchableOpacity style={styles.buttonContainerStyle}>
            <Icon 
                name='search' 
                onPress={this._onButtonPress}
                containerStyle={styles.iconContainerStyle}
            />
        </TouchableOpacity>
        </View>
    )
  }
}

const styles = {
    autocompleteContainer: {
      flex: 1,
      left: 0,
      position: 'relative',
      right: 0,
      top: 0,
      zIndex: 1
    },
    containerStyle: {
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    inputContainerStyle: {
        borderWidth: 0,
        borderRadius: 10,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 10
    },
    listOpenStyle: {
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1
    },
    listContainerStyle: {
        borderWidth: 0
    },
    listStyle: {
        borderWidth: 0
    },
    listItemStyle: {
        paddingTop: 8,
        paddingBottom: 8
    },
    buttonContainerStyle: {
        position: 'absolute',
        top: 5,
        right: 0
    },
    iconContainerStyle: {
        padding: 15,
        //backgroundColor: 'red'
    }
};

AutocompleteInput.propTypes = {
    autocompleteItems: PropTypes.array.isRequired,
    itemsCount: PropTypes.number,
    placeholder: PropTypes.string
}

AutocompleteInput.defaultProps = {
    itemsCount: 5,
    placeholder: ''
}

export default AutocompleteInput;