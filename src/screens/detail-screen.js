import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Button } from 'react-native-elements';
import TreeDetail from '../components/tree-detail';
import { MAIN_SCREEN } from '../config/screen-routes';
import strings from '../res/strings';
import { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR, PRIMARY_COLOR_TEXT } from '../config';
import { NAVIGATE_USER } from '../actions/const/redux-action-types';


class DetailScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: strings.screenTitles.detailScreen,
      headerStyle: { backgroundColor: PRIMARY_COLOR },
      headerTintColor: "#fff",
      headerRight: (
        <Button
          onPress={navigation.getParam('navigateUser')}
          title='Navigovat'
          transparent
        />
      ),
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({navigateUser: this._navigateUser});
    console.log("DetailScreen did mount");
  }

  _navigateUser = () => {
    this.props.navigation.navigate(MAIN_SCREEN, {
      actionName: NAVIGATE_USER
    });
  }

  render() {
    if(!this.props.tree) {
      return (
        <View style={[styles.containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <ScrollView style={styles.containerStyle}>
        <TreeDetail
          tree={this.props.tree}
        />
      </ScrollView>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headline: {
    fontSize: 30,
    fontFamily: 'Roboto'
  },

  subtitle: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR
  },

  mainContent: {
    flex: 4,
  },

  basicInfoStyle: {
  },

  row: {
    //flexDirection: 'row',
    //justifyContent: 'space-between'
  },

  basicInfoItemStyle: {
    fontSize: 16,
    paddingBottom: 5,
    paddingTop: 5,
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
    color: PRIMARY_COLOR_TEXT
  },

  descriptionStyle: {
    marginTop: 15,
    marginBottom: 15,
  },

  actionButtons: {
  },

  textStyle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
    color: PRIMARY_COLOR_TEXT
  }
}

function mapStateToProps({treeDetail}) {
  return {
    tree: treeDetail
  }
}

export default connect(mapStateToProps, actions) (DetailScreen)