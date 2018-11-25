import React, { Component } from 'react'
import { Platform, View, ActivityIndicator, NetInfo } from 'react-native'
import { MapView } from 'expo';
import { FloatingAction } from 'react-native-floating-action';
import { connect } from 'react-redux';
import { getBoundingBox, calculateDistance } from '../utils';
import AutocompleteInput from '../components/autocomplete-input';
import Offline from '../components/Offline';
import * as statusBar from '../styles/status-bar.style';

import * as actions from '../actions';
import * as fab from '../helpers/fab';
import Map from '../components/Map';
import { fetchClosestTreeByDendrology } from '../api/fetch-closest-tree-by-dendrology';

// MOCK DATA
const DATA = [
  {id: 1, latitude: 50.1200886, longitude: 14.459783, title: 'Lípa srdčitá', description: 'description', color: 'red'},
  {id: 2, latitude: 50.1300886, longitude: 14.459783, title: 'Buk', description: 'description', color: 'blue'},
  {id: 3, latitude: 50.1400886, longitude: 14.459783, title: 'Vrba', description: 'description', color: 'green'},
  {id: 4, latitude: 50.1500886, longitude: 14.459783, title: 'Kaštan', description: 'description', color: 'yellow'},
  {id: 5, latitude: 50.1600886, longitude: 14.459783, title: 'Ořech', description: 'description', color: 'black'}
];

AUTOCOMPLETE_ITEMS = [
  "Buk", "Javor"
]

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
    title: 'Mapa',
    statusBarStyle: 'light-content'
  }

  state = {
    query: ""
  }


  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionStatusChange);
    if(Platform.OS === 'android') {
      // this._setInitialRegion(() => this._fetchTrees());
      this.props.getUserLocation(() => { 
        this._fetchTrees()
      });
      this._watchPositionAsync();
      this._fetchDendrologies();
    }
  }

  componentWillUnmount() {
    console.log("MainScreen unmount");
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionStatusChange);
  }

  _watchPositionAsync = () => {
    this.props.watchPosition(20, (coordinate) => {
         console.log("[MainScreen._watchPosition] Position changed succesfully");
         this._fetchTrees();
         this.mapRef && this.mapRef.animateToRegion(this.props.region);
    })
  }

  _isReadyToRender = () => {
    return this.props.region ? true : false;
  }

  // _setInitialRegion = (callback) => {
  //   console.log("set initial region");
  //   this.props.getUserLocation((coordinate) => {
  //     //let { currentLocation } = this.props.currentLocation;
  //     let region = {
  //       latitude: coordinate.latitude,
  //       longitude: coordinate.longitude,
  //       latitudeDelta: 0.0182,
  //       longitudeDelta: 0.0182
  //     }

  //     this.props.regionChange(region);
  //     callback();
  //   })
  // }

  _fetchTrees = () => {
    let [lonMin, latMin, lonMax, latMax ] = getBoundingBox(this.props.region);
    this.props.fetchTrees(latMin, latMax, lonMin, lonMax);
  }

  _fetchDendrologies = () => {
    this.props.fetchDendrologies();
  }

  onRegionChange = region => {
    //console.log(region);
      // console.log(this.state.region);
      // console.log(`Updated region: ${region.latitude}`);
      // this.setState({
      //   region: {
      //     latitude: region.latitude,
      //     longitude: region.longitude,
      //     latitudeDelta: region.latitudeDelta,
      //     longitudeDelta: region.longitudeDelta
      //   }
      // })
      // this.setState({region}, () => console.log(this.state.region));
      // console.log(region);
      // this.props.regionChange({region});
  }

  // _checkNetworkStatus = () => {
  //   NetI
  // }


  /**
   * The callback method. The method is called after the user presses
   * the SearchInput, then the app navigates to the FilterScreen.
   */
  _handleSerchInputPress = () => {
    this.props.navigation.navigate('filter');
  }

  _handleConnectionStatusChange = (isConnected) => {
    this.props.changeConnectionStatus(isConnected);
  }


  //TODO:
  _handleCalloutPress = (event) => {
    // Marker coordinates
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const tree = this.props.trees.find(t => t.latitude === latitude && t.longitude === longitude);

    this.props.fetchTreeById(tree.id, tree.providerName, () => {
      this.props.navigation.navigate('detail');
    })
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
    const region =  {
      latitude: 45.78825,
      longitude: 18.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }

    this.mapRef.animateToRegion(region);
  }
 
  _handleFabItemNearestPress = () => {
    console.log('Nearest button press');
  }

  _findTreeByDendrology = (dendrologyId) => {
    fetchClosestTreeByDendrology(dendrologyId).then(
      ({latitude, longitude}) => this.mapRef.animateToCoordinate({latitude, longitude}, 0),
      (error) => console.log(error)
    )
  }

  // _onItemPress = (item) => {
  //   this.setState({query: item});
  // }

  _onIconButtonPress = (item) => {
    this._findTreeByDendrology(item.id);
  }

  _renderOverlay = () => 
      <AutocompleteInput
        autocompleteItems={this.props.dendrologies}
        onItemPress={(item) => this._onItemPress(item)}
        filterProperty="commonName"
        displayProperty="commonName"
        iconButton
        placeholder="Jaký strom hledáte?"
        onIconButtonPress={this._onIconButtonPress}
  />

  _renderMarkers = markers => {
   return markers.map( marker => 
        <MapView.Marker
          identifier={marker.id.toString()}
          key={marker.id}
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
          title={marker.dendrology.commonName}
          description={marker.dendrology.scientificName}
        >
        </MapView.Marker>
      )
  }

  render() {
    if(!this._isReadyToRender()) {
      return (
        <View style={[styles.containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <View style={styles.containerStyle}>
        <View style={statusBar.style.statusBar}></View>
        <Offline isVisible={!this.props.networkStatus}/>
        <Map
          onRef={(ref) => this.mapRef = ref}
          mapStyle={styles.mapStyle}
          overlayMapStyle={styles.overlayMapStyle}
          clustering
          region={this.props.region}
          onCalloutPress={(event) => this._handleCalloutPress(event)}
          renderMarkers={ this._renderMarkers(this.props.trees)}
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
    flex: 2
  },

  mapStyle: {
    flex: 1
  },


  overlayMapStyle: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    marginRight: 20,
    marginLeft: 20
  }
}

function mapStateToProps(state) {
  console.log(`${Date.now()} trees update`);
  console.log(state.trees);
  return { 
    currentLocation: state.location.currentLocation,
    trees: state.trees,
    dendrologies: state.dendrologies,
    region: state.location.currentRegion,
    networkStatus: state.networkStatus
  }
}

export default connect(mapStateToProps, actions) (MainScreen);