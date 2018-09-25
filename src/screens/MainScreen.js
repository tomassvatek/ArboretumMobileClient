import React, { Component } from 'react'
import { Platform, Text, View, ActivityIndicator } from 'react-native'
import { MapView, Location, Permissions, animateToNavigation, animateToRegion } from 'expo';
import { Icon } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
import axios from 'axios';

import * as fab from '../helpers/fab';
import MapCallout from '../components/MapCallout';
import SearchInput from '../components/SearchInput';

// MOCK DATA
const MARKERS = [
  {id: 1, latlng: {latitude: 37.78825, longitude: -122.4324 }, title: 'Title', description: 'description'},
  {id: 2, latlng: {latitude: 37.78825, longitude: -122.5324 }, title: 'Title', description: 'description'},
  {id: 3, latlng: {latitude: 37.78825, longitude: -122.6324 }, title: 'Title', description: 'description'},
  {id: 4, latlng: {latitude: 37.78825, longitude: -122.7324 }, title: 'Title', description: 'description'}
];

class MainScreen extends Component {
  /**
   * Static property set up the react-navigation component.
   * This screen use TabNavigator.
   */
  static navigationOptions = {
    title: 'Mapa',
    tabBarIcon: ({tintColor}) => {
      return <Icon name='my-location' size={27} color={tintColor}/>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false,
      errorMessage: null,
      location: null,
      region: null,
      markers: null
      // region: {
      //   latitude: 37.78825,
      //   longitude: -122.4324,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421
      // }
    };
  }


  componentWillMount() {
    if(Platform.OS === 'android') {
      this._getLocationAsync();
    }
  }

  /**
   * The Lifecycle method.
   */
  componentDidMount() {
    this.setState({mapLoaded: true});
    this.fetchData();
  }

  fetchData = async () => {
    let {data} = await axios.get('http://removeazure.azurewebsites.net/api/values');
    console.log(data);
  }

  /**
   * The callback method. The method is called after the user changes 
   * the region, then the region state is updated.
   */
  onRegionChangeComplete = region => {
    this.setState({region});
  }

  onMapReady = () => {
    // console.log(this.mapView);
    // if(this.state.location) {
    //   const { coords } = this.state.location;
    //   let region = {
    //     latitude: coords.latitude,
    //     longitude: coords.longitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421
    //   }
    //   console.log(region);
    //   this.setState({region}, () => {console.log(this.state.region)} );
    // }
  }

  _setInitialRegion = () => {
    let { latitude, longitude } = this.state.location;
    let region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
    this.setState({ region });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let {coords} = await Location.getCurrentPositionAsync({});
    this.setState({ location: coords }, () => this._setInitialRegion())
  }

  /**
   * The callback method. The method is called after the user presses
   * the SearchInput, then the app navigates to the FilterScreen.
   */
  _handleSerchInputPress = () => {
    this.props.navigation.navigate('detail');
  }

  /**
   * The Callback method. The method is called after ther user presses
   * the floating action item. 
   */
  _handleFabItemPress = name => {
    switch(name) {
      case fab.FAB_ACTION_ADD:
        console.log('add');
        break;
      case fab.FAB_ACTION_MYPOSITION:
        console.log('myposition');
        break;
      case fab.FAB_ACTION_NEAREST:
        console.log('nearest');
        break;
      default:
        console.error('None fab item selected');
        break;
    }
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
    if(!this.state.mapLoaded || !this.state.location) {
      return (
        <View style={[styles.containerStyle, {justifyContent: 'center', alignItems: 'center'}]}>
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
          onMapReady={this.onMapReady}
          onRegionChangeComplete={this.onRegionChangeComplete}>
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

export default MainScreen;