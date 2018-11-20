import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';

import Autocomplete  from 'react-native-autocomplete-input';
import { BORDER_COLOR, INPUT_PLACEHOLDER_COLOR } from '../config';

//const DATA = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

class AutocompleteInput extends Component {
  
  state = {
      query: '',
      filteredData: []
  }

  _filterData = (value) => {
      if(value) {
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
        </View>
    )
  }
}

const styles = {
    autocompleteContainer: {
      flex: 1,
      left: 0,
      position: 'absolute',
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
    }
};

AutocompleteInput.propTypes = {
    autocompleteItems: PropTypes.array.isRequired,
    itemsCount: PropTypes.number,
    placeholder: PropTypes.string
}

AutocompleteInput.defaultProps = {
    itemsCount: 5,
    placeholder: '',
}

export default AutocompleteInput;