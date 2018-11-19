import React, { Component } from 'react'
import { Platform, View, ActivityIndicator } from 'react-native'
import { MapView } from 'expo';
import { FloatingAction } from 'react-native-floating-action';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as fab from '../helpers/fab';
import SearchInput from '../components/SearchInput';
import Map from '../components/Map';

// MOCK DATA
const DATA = [
  {id: 1, latitude: 50.1200886, longitude: 14.459783, title: 'Lípa srdčitá', description: 'description', color: 'red'},
  {id: 2, latitude: 50.1300886, longitude: 14.459783, title: 'Buk', description: 'description', color: 'blue'},
  {id: 3, latitude: 50.1400886, longitude: 14.459783, title: 'Vrba', description: 'description', color: 'green'},
  {id: 4, latitude: 50.1500886, longitude: 14.459783, title: 'Kaštan', description: 'description', color: 'yellow'},
  {id: 5, latitude: 50.1600886, longitude: 14.459783, title: 'Ořech', description: 'description', color: 'black'}
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
    // mapLoaded: false
  };

  componentDidMount() {
    if(Platform.OS === 'android') {
      this.props.getUserLocation(() => {
        this._setInitialRegion();
      });
    }

    this.props.fetchTrees();
  }

  _setInitialRegion = () => {
    let { location } = this.props.location;
    this.setState({ 
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
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
    // console.log('Nearest button press');
    console.log(this.props.trees);
  }

  _handleFabItemNearestPress = () => {
    console.log('Nearest button press');
  }

  _renderOverlay = () => <SearchInput/>

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
    if(!this.state.region || !this.props.trees) {
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
          clustering
          region={this.state.region}
          onCalloutPress={(event) => this._handleCalloutPress(event)}
          onRegionChangeComplete={this._onRegionChangeComplete}
          renderMarkers={this._renderMarkers(this.props.trees)}
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

function mapStateToProps({location, trees}) {
  return { 
    location: location,
    trees: trees
  }
}

export default connect(mapStateToProps, actions) (MainScreen);