import React, { Component } from 'react'
import { Platform, View, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as fab from '../helpers/fab';
import SearchInput from '../components/SearchInput';
import Map from '../components/Map';

// MOCK DATA
const DATA = [
  {id: 1, latlng: {latitude: 50.1200886, longitude: 14.459783 }, title: 'Lípa srdčitá', description: 'description', color: 'red'},
  {id: 2, latlng: {latitude: 50.1300886, longitude: 14.459783 }, title: 'Buk', description: 'description', color: 'blue'},
  {id: 3, latlng: {latitude: 50.1400886, longitude: 14.459783 }, title: 'Vrba', description: 'description', color: 'green'},
  {id: 4, latlng: {latitude: 50.1500886, longitude: 14.459783 }, title: 'Kaštan', description: 'description', color: 'yellow'},
  {id: 4, latlng: {latitude: 50.1600886, longitude: 14.459783 }, title: 'Ořech', description: 'description', color: 'black'}
];

class MainScreen extends Component {
  /**
   * Static property set up the react-navigation component.
   * This screen use TabNavigator.
   */
  // static navigationOptions = {
  //   title: 'Mapa',
  //   tabBarIcon: ({tintColor}) => {
  //     return <Icon name='my-location' size={27} color={tintColor}/>
  //   }
  // };

  static navigationOptions = {
    header: null,
    title: 'Mapa'
  }

  state = {
    mapLoaded: false,
    region: {
      latitude: 50.1200885,
      latitudeDelta: 0.0922,
      longitude: 14.4597821,
      longitudeDelta: 0.0421
    },
    markers: null
  };

  /**
   * The Lifecycle method.
   */
  componentWillMount() {
    if(Platform.OS === 'android') {
      this.props.getUserLocation().then(this._setInitialRegion);
      console.log(this.state.region);
    }
  }

  _setInitialRegion = () => {
    let { location } = this.props.location;
    let region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
    this.setState({ region });
  }


  /**
   * The callback method. The method is called after the user changes 
   * the region, then the region state is updated.
   */
  _onRegionChangeComplete = region => {
    this.setState({region});
    console.log(this.state.region);
  }


  /**
   * The callback method. The method is called after the user presses
   * the SearchInput, then the app navigates to the FilterScreen.
   */
  _handleSerchInputPress = () => {
    this.props.navigation.navigate('filter');
  }


  _handleCalloutPress = () => {
    this.props.navigation.navigate('detail');
  }

  /**
   * The Callback method. The method is called after ther user presses
   * the floating action item. 
   */
  _handleFabItemPress = name => {
    switch(name) {
      case fab.FAB_ACTION_ADD:
        this._handleFabItemAddPress();
        break;
      case fab.FAB_ACTION_MYPOSITION:
        this._handleFabItemMyPositionPress();
        break;
      case fab.FAB_ACTION_NEAREST:
        this._handleFabItemNearestPress();
        break;
      default:
        console.error('None fab item selected');
        break;
    }
  }

  _handleFabItemAddPress = () => {
    this.props.navigation.navigate('add');
  }

  _handleFabItemMyPositionPress = () => {
    console.log('Nearest button press');
  }

  _handleFabItemNearestPress = () => {
    console.log('Nearest button press');
  }

  _renderOverlay = () => <SearchInput/>

  render() {
    if(!this.props.location) {
      return (
        <View style={[styles.containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <View style={styles.containerStyle}>
        <Map
          mapStyle={styles.mapStyle}
          overlayMapStyle={styles.overlayMapStyle}
          region={this.state.region}
          onRegionChangeComplete={this._onRegionChangeComplete}
        >
          {this._renderOverlay}
        </Map>
        <FloatingAction 
          actions={fab.FAB_ACTIONS}
          onPressItem={name => this._handleFabItemPress(name)}/>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },

  mapStyle: {
    flex: 1
  },

  overlayMapStyle: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    marginRight: 20,
    marginLeft: 20
  }
}

function mapStateToProps(state) {
  return { 
    location: state.location
  };
}

export default connect(mapStateToProps, actions) (MainScreen);