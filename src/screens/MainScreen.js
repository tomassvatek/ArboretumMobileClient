import React, { Component } from 'react'
import { Platform, Text, View, ActivityIndicator } from 'react-native'
import { MapView, Location, Permissions } from 'expo';
import { Icon } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
import { connect } from 'react-redux';
import * as actions from '../actions';

import * as fab from '../helpers/fab';
import MapCallout from '../components/MapCallout';
import SearchInput from '../components/SearchInput';

// MOCK DATA
const MARKERS = [
  {id: 1, latlng: {latitude: 50.1200886, longitude: 14.459783 }, title: 'Title', description: 'description'},
  {id: 2, latlng: {latitude: 50.1300886, longitude: 14.459783 }, title: 'Title', description: 'description'},
  {id: 3, latlng: {latitude: 50.1400886, longitude: 14.459783 }, title: 'Title', description: 'description'},
  {id: 4, latlng: {latitude: 50.1500886, longitude: 14.459783 }, title: 'Title', description: 'description'}
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
    //errorMessage: null,
    //location: null,
    region: null,
    markers: null
    // region: {
    //   latitude: 37.78825,
    //   longitude: -122.4324,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421
    // }
  };


  // componentWillMount() {
  //   if(Platform.OS === 'android') {
  //     this.props.getUserLocation();
  //     this._setInitialRegion();
  //   }
  // }

  /**
   * The Lifecycle method.
   */
  componentDidMount() {
    if(Platform.OS === 'android') {
      this.props.getUserLocation();
      this._setInitialRegion();
      this.setState({mapLoaded: true});
    }
  }


  /**
   * The callback method. The method is called after the user changes 
   * the region, then the region state is updated.
   */
  _onRegionChangeComplete = region => {
    this.setState({region});
  }

  _setInitialRegion = () => {
    let { latitude, longitude } = this.props.location;
    let region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }

    this.setState({ region });
    console.log('set initial region');
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
    console.log(this.props.location);
  }

  _handleFabItemMyPositionPress = () => {
    console.log('My positon button press');
  }

  _handleFabItemNearestPress = () => {
    console.log('Nearest button press');
  }

  /**
   * Render markers to the map.
   * [markers] - list of markers. 
   */
  _renderMarkers = markers => {
    return markers.map( marker => 
        <MapView.Marker
          key={marker.id}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          showsUserLocation
          folowUsersLocation
          pinColor='green'
          onCalloutPress={() => /*this.props.navigation.navigate('detail')*/ console.log('callout pressed') }>
        </MapView.Marker>
      )
  }

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
        <MapView
          ref={(map) => (this.map = map)}
          style={{flex:1}}
          initialRegion={this.state.region}
          showsUserLocation
          folowUsersLocation
          onRegionChangeComplete={this._onRegionChangeComplete}
          onCalloutPress={this._handleCalloutPress} >
          {this._renderMarkers(MARKERS)}
        </MapView>
        <View style={styles.overlayMapStyle}>
          <SearchInput
            placeholder='Jaký strom hledáte?' 
            onPress={this._handleSerchInputPress} />
        </View>
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