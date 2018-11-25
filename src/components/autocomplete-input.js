import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Keyboard } from 'react-native'
import PropTypes from 'prop-types';

import {Icon} from 'react-native-elements';
import Autocomplete  from 'react-native-autocomplete-input';
import { INPUT_PLACEHOLDER_COLOR, PRIMARY_COLOR } from '../config';
import * as styles from '../styles/autocomplete-input.style';

class AutocompleteInput extends Component {
  
  state = {
      filteredData: [],
      currentItem: {}
  }

  _filterData = (value) => {
      if(value) {
        const filter = this.props.autocompleteItems
                       .filter(i => i[this.props.filterProperty]
                       .toLowerCase()
                       .indexOf(value.toLowerCase()) === 0);
                       
        const filteredData = filter.length > this.props.itemsCount ? filter.slice(0, this.props.itemsCount) : filter;
        this.setState({filteredData});
      } else {
        this.setState({filteredData: []});
      }
  }

  _onChangeText = (value) => {
      this._filterData(value);
  }

  //TODO: check if funkce byla vlozena
  _onItemPress = (item) => {
      this.setState({
          currentItem: item,
          filteredData: []
      });
  }

  _onIconButtonPress = (item) => {
    typeof this.props.onIconButtonPress === 'function' && this.props.onIconButtonPress(item);
    this._resetAutocomplete();
  }

  _resetAutocomplete = () => {
      this.setState({
          currentItem: {},
          filteredData: []
      });

      Keyboard.dismiss();
  }

  _renderIconButton = () => {
      return (
        <TouchableOpacity
            onPress={() => this._onIconButtonPress(this.state.currentItem)}
            iconVisible
            style={styles.autocompleteStyle.iconButtonContainerStyle}>
            <Icon 
                name='search'
                containerStyle={styles.autocompleteStyle.iconContainerStyle}
            />
        </TouchableOpacity>
      )
  }

  render() {
    return (
      <View style={this.props.autocompleteContainerStyle}>
        <Autocomplete
            data={this.state.filteredData}
            underlineColorAndroid='transparent'
            // containerStyle={styles.autocompleteStyle.containerStyle}
            containerStyle={styles.autocompleteStyle.containerStyle}
            inputContainerStyle={[styles.autocompleteStyle.inputContainerStyle, this.state.filteredData.length === 0 ? {} : styles.autocompleteStyle.listOpenStyle ]}
            listContainerStyle={styles.autocompleteStyle.listContainerStyle}
            listStyle={styles.autocompleteStyle.listStyle}
            placeholder={this.props.placeholder}
            placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
            data={this.state.filteredData}
            defaultValue={this.state.currentItem[this.props.displayProperty]}
            onChangeText={value => this._onChangeText(value)}
            renderItem={item => (
                <TouchableOpacity 
                    style={styles.autocompleteStyle.listItemStyle} 
                    onPress={() => this._onItemPress(item)}>
                  <Text>{item[this.props.filterProperty]}</Text>
                </TouchableOpacity>
            )}
        />
        {this.props.iconButton ? this._renderIconButton() : null}
        </View>
    )
  }
}


AutocompleteInput.propTypes = {
    autocompleteItems: PropTypes.array.isRequired,
    filterProperty: PropTypes.string.isRequired,
    displayProperty: PropTypes.string.isRequired,
    // query: PropTypes.object,
    itemsCount: PropTypes.number,
    placeholder: PropTypes.string,
    iconButton: PropTypes.bool,
}

AutocompleteInput.defaultProps = {
    itemsCount: 5,
    placeholder: '',
    filterProperty: '',
    iconButton: false
}

export default AutocompleteInput;